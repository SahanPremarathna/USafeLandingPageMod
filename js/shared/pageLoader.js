(function () {
    "use strict";

    var SESSION_KEY = "usafe_startup_seen";
    var FIRST_VISIT_HOLD_MS = 4000;
    var RETURN_VISIT_HOLD_MS = 1000;
    var EXIT_DURATION_MS = 820;
    var activeRun = null;

    function wait(ms) {
        return new Promise(function (resolve) {
            window.setTimeout(resolve, ms);
        });
    }

    function getHoldDuration() {
        try {
            return window.sessionStorage && window.sessionStorage.getItem(SESSION_KEY)
                ? RETURN_VISIT_HOLD_MS
                : FIRST_VISIT_HOLD_MS;
        } catch (error) {
            return FIRST_VISIT_HOLD_MS;
        }
    }

    function markSeen() {
        try {
            if (window.sessionStorage) {
                window.sessionStorage.setItem(SESSION_KEY, "1");
            }
        } catch (error) {
        }
    }

    function whenLoaded() {
        if (document.readyState === "complete") {
            return Promise.resolve();
        }

        return new Promise(function (resolve) {
            window.addEventListener("load", function () {
                resolve();
            }, { once: true });
        });
    }

    function createOverlay(logoSrc) {
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

    return overlay;
}

    async function runSplash(minDuration, waitForLoad) {
        if (!document.body || activeRun) {
            return activeRun;
        }

        var logoSrc = document.body.getAttribute("data-startup-logo") || "images/usafelogo.webp";
        var overlay = createOverlay(logoSrc);

        document.body.classList.add("startup-active");
        document.documentElement.classList.add("page-startup-pending");

        activeRun = Promise.all([
            wait(minDuration),
            waitForLoad ? whenLoaded() : Promise.resolve()
        ]).then(function () {
            overlay.dataset.startupState = "exiting";
            return wait(EXIT_DURATION_MS);
        }).then(function () {
            document.body.classList.remove("startup-active");
            document.documentElement.classList.remove("page-startup-pending");
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            activeRun = null;
        });

        return activeRun;
    }

    function init() {
        if (!document.body || document.body.getAttribute("data-page") === "home") {
            return;
        }

        var firstDuration = getHoldDuration();
        markSeen();
        runSplash(firstDuration, true);

        window.addEventListener("pageshow", function (event) {
            if (event.persisted) {
                runSplash(RETURN_VISIT_HOLD_MS, false);
            }
        });
    }

    init();
})();
