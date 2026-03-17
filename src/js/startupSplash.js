function wait(ms) {
    return new Promise(function (resolve) {
        window.setTimeout(resolve, ms);
    });
}

function uniqueSources(sources) {
    return sources.filter(function (src, index, list) {
        return Boolean(src) && list.indexOf(src) === index;
    });
}

function preloadImage(src, timeoutMs) {
    return new Promise(function (resolve) {
        var image = new Image();
        var settled = false;
        var timeoutId = 0;

        function finish() {
            if (settled) {
                return;
            }

            settled = true;
            window.clearTimeout(timeoutId);
            resolve();
        }

        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
        timeoutId = window.setTimeout(finish, timeoutMs);
        image.src = src;
    });
}

function preloadVideo(src, timeoutMs) {
    return new Promise(function (resolve) {
        var video = document.createElement("video");
        var settled = false;
        var timeoutId = 0;

        function finish() {
            if (settled) {
                return;
            }

            settled = true;
            window.clearTimeout(timeoutId);
            video.removeAttribute("src");
            video.load();
            resolve();
        }

        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.addEventListener("loadeddata", finish, { once: true });
        video.addEventListener("canplay", finish, { once: true });
        video.addEventListener("error", finish, { once: true });
        timeoutId = window.setTimeout(finish, timeoutMs);
        video.src = src;
        video.load();
    });
}

function preloadSources(list, timeoutMs) {
    return Promise.all(list.map(function (entry) {
        return entry.type === "video"
            ? preloadVideo(entry.src, timeoutMs)
            : preloadImage(entry.src, timeoutMs);
    }));
}

function renderLoadingIndicatorMarkup(logoSrc) {
    return [
        '<div class="loading-indicator" role="status" aria-live="polite" aria-label="Loading">',
        '  <div class="loading-indicator-rings" aria-hidden="true">',
        '    <span class="loading-indicator-ring loading-indicator-ring-a"></span>',
        '    <span class="loading-indicator-ring loading-indicator-ring-b"></span>',
        '    <span class="loading-indicator-ring loading-indicator-ring-c"></span>',
        '  </div>',
        '  <div class="loading-indicator-logo-wrap">',
        '    <img class="loading-indicator-logo" src="', logoSrc, '" alt="">',
        '  </div>',
        '</div>'
    ].join('');
}

export function createLoadingIndicator(options) {
    var wrapper = document.createElement("div");
    wrapper.className = "loading-indicator-shell";
    wrapper.innerHTML = renderLoadingIndicatorMarkup(options && options.logoSrc ? options.logoSrc : "");
    return wrapper.firstElementChild;
}

function createStartupOverlay(logoSrc) {
    var overlay = document.createElement("div");
    overlay.className = "startup-overlay";
    overlay.dataset.startupState = "showing";
    overlay.innerHTML = [
        '<div class="startup-backdrop"></div>',
        '<div class="startup-shell">',
        '  <div class="startup-intro" aria-hidden="true">',
        '    <div class="startup-emitter">',
        '      <span class="startup-ripple startup-ripple-a"></span>',
        '      <span class="startup-ripple startup-ripple-b"></span>',
        '      <span class="startup-ripple startup-ripple-c"></span>',
        '      <span class="startup-ripple startup-ripple-d"></span>',
        '      <span class="startup-orbit startup-orbit-a"></span>',
        '      <span class="startup-orbit startup-orbit-b"></span>',
        '      <span class="startup-core-glow"></span>',
        '    </div>',
        '    <div class="startup-brand-mark">',
        '      <img src="', logoSrc, '" alt="USafe logo">',
        '    </div>',
        '  </div>',
        '</div>'
    ].join("");

    document.body.appendChild(overlay);

    return {
        root: overlay,
        setState: function (state) {
            overlay.dataset.startupState = state;
        }
    };
}

async function playIntroSequence(overlay, reducedMotion) {
    overlay.setState("showing");
    await wait(reducedMotion ? 900 : 4000);
    overlay.setState("exiting");
}

export async function runStartupSequence(options) {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var overlay = createStartupOverlay(options.logoSrc || "");
    var criticalSources = uniqueSources(options.criticalImageSources || []).map(function (src) {
        return { type: "image", src: src };
    }).concat(uniqueSources(options.criticalVideoSources || []).map(function (src) {
        return { type: "video", src: src };
    }));

    document.body.classList.add("startup-active");

    if (options.appEl) {
        options.appEl.dataset.appVisibility = "hidden";
    }

    await preloadSources(uniqueSources([options.logoSrc]).map(function (src) {
        return { type: "image", src: src };
    }), 10000);

    await Promise.all([
        preloadSources(criticalSources, 14000),
        options.preloadModules ? options.preloadModules() : Promise.resolve(null)
    ]);

    if (typeof options.onBeforeReveal === "function") {
        await options.onBeforeReveal();
    }

    if (options.appEl) {
        options.appEl.dataset.appVisibility = "visible";
    }

    await playIntroSequence(overlay, reducedMotion);
    await wait(reducedMotion ? 160 : 820);
    document.body.classList.remove("startup-active");
    overlay.root.remove();
}
