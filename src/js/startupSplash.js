var SESSION_KEY = "usafe_startup_seen";
var FIRST_VISIT_HOLD_MS = 4000;
var RETURN_VISIT_HOLD_MS = 1000;
var EXIT_DURATION_MS = 820;

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

function getStartupHoldDuration() {
    try {
        return window.sessionStorage && window.sessionStorage.getItem(SESSION_KEY)
            ? RETURN_VISIT_HOLD_MS
            : FIRST_VISIT_HOLD_MS;
    } catch (error) {
        return FIRST_VISIT_HOLD_MS;
    }
}

function markStartupSeen() {
    try {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(SESSION_KEY, "1");
        }
    } catch (error) {
    }
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
    ].join("");
}

export function createLoadingIndicator(options) {
    var wrapper = document.createElement("div");
    wrapper.className = "loading-indicator-shell";
    wrapper.innerHTML = renderLoadingIndicatorMarkup(options && options.logoSrc ? options.logoSrc : "");
    return wrapper.firstElementChild;
}

function createStartupOverlay(logoSrc) {
    var existing = document.querySelector(".startup-overlay");
    var overlay = existing || document.createElement("div");

    overlay.className = "startup-overlay";
    overlay.dataset.startupState = "showing";
    overlay.removeAttribute("data-startup-shell");
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

    if (!existing) {
        document.body.appendChild(overlay);
    }

    return {
        root: overlay,
        setState: function (state) {
            overlay.dataset.startupState = state;
        }
    };
}

async function playIntroSequence(overlay, holdMs) {
    overlay.setState("showing");
    await wait(holdMs);
    overlay.setState("exiting");
}

async function finalizeOverlay(overlay) {
    await wait(EXIT_DURATION_MS);
    document.body.classList.remove("startup-active");
    document.documentElement.classList.remove("page-startup-pending");
    overlay.root.remove();
}

export async function showPageTransitionSplash(options) {
    if (!document.body) {
        return;
    }

    var overlay = createStartupOverlay(options && options.logoSrc ? options.logoSrc : "");
    var holdMs = options && options.minDuration ? options.minDuration : RETURN_VISIT_HOLD_MS;

    document.body.classList.add("startup-active");
    document.documentElement.classList.add("page-startup-pending");

    if (options && options.appEl) {
        options.appEl.dataset.appVisibility = "hidden";
    }

    await playIntroSequence(overlay, holdMs);

    if (options && options.appEl) {
        options.appEl.dataset.appVisibility = "visible";
    }

    await finalizeOverlay(overlay);
}

export async function runStartupSequence(options) {
    var overlay = createStartupOverlay(options.logoSrc || "");
    var holdMs = getStartupHoldDuration();
    var criticalSources = uniqueSources(options.criticalImageSources || []).map(function (src) {
        return { type: "image", src: src };
    }).concat(uniqueSources(options.criticalVideoSources || []).map(function (src) {
        return { type: "video", src: src };
    }));

    markStartupSeen();
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

    await playIntroSequence(overlay, holdMs);
    await finalizeOverlay(overlay);
}
