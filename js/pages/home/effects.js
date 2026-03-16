function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initHeroVideoState() {
    var heroSection = document.querySelector(".landing-hero");
    var heroVideo = document.querySelector(".landing-hero .hero-video");

    if (!heroSection || !heroVideo) {
        return;
    }

    var markReady = function () {
        heroSection.classList.add("video-ready");
    };

    if (heroVideo.readyState >= 2) {
        markReady();
        return;
    }

    heroVideo.addEventListener("loadeddata", markReady, { once: true });
    heroVideo.addEventListener("canplay", markReady, { once: true });
}

function initDepthScenes() {
    var scopes = Array.prototype.slice.call(document.querySelectorAll("[data-depth-scope]"));
    if (!scopes.length || prefersReducedMotion()) {
        return;
    }

    scopes.forEach(function (scope) {
        var depthNodes = Array.prototype.slice.call(scope.querySelectorAll("[data-depth]"));

        if (!depthNodes.length) {
            return;
        }

        depthNodes.forEach(function (node) {
            var computedTransform = window.getComputedStyle(node).transform;
            node.dataset.baseTransform = computedTransform && computedTransform !== "none"
                ? computedTransform
                : "";
        });

        scope.addEventListener("pointermove", function (event) {
            var rect = scope.getBoundingClientRect();
            var offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            var offsetY = (event.clientY - rect.top) / rect.height - 0.5;

            depthNodes.forEach(function (node) {
                var depth = Number(node.getAttribute("data-depth")) || 0;
                var moveX = offsetX * depth;
                var moveY = offsetY * depth;
                var baseTransform = node.dataset.baseTransform || "";
                node.style.transform = "translate3d(" + moveX.toFixed(2) + "px, " + moveY.toFixed(2) + "px, 0) " + baseTransform;
            });
        });

        scope.addEventListener("pointerleave", function () {
            depthNodes.forEach(function (node) {
                node.style.transform = node.dataset.baseTransform || "";
            });
        });
    });
}

function initTiltCards() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".js-tilt"));
    if (!cards.length || prefersReducedMotion()) {
        return;
    }

    cards.forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            var rect = card.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width;
            var y = (event.clientY - rect.top) / rect.height;
            var rotateY = (x - 0.5) * 10;
            var rotateX = (0.5 - y) * 10;

            card.style.setProperty("--tilt-x", rotateX.toFixed(2) + "deg");
            card.style.setProperty("--tilt-y", rotateY.toFixed(2) + "deg");
        });

        card.addEventListener("pointerleave", function () {
            card.style.removeProperty("--tilt-x");
            card.style.removeProperty("--tilt-y");
        });
    });
}

function initSectionDepth() {
    var sections = Array.prototype.slice.call(document.querySelectorAll(".section-depth-anchor"));
    if (!sections.length) {
        return;
    }

    var onScroll = function () {
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var progress = 1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1);
            section.style.setProperty("--section-progress", progress.toFixed(3));
        });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
}

export function initHomeEffects() {
    initHeroVideoState();
    initDepthScenes();
    initTiltCards();
    initSectionDepth();
}
