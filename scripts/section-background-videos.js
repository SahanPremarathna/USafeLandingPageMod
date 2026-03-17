export function initSectionBackgroundVideos(sectionMedia, scope) {
    var root = scope || document;
    var primary = root.querySelector("[data-section-video-primary]");
    var secondary = root.querySelector("[data-section-video-secondary]");
    var sections = Array.prototype.slice.call(root.querySelectorAll("[data-section-media-key]"));
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var uniqueSources = Object.keys(sectionMedia || {}).map(function (key) {
        return sectionMedia[key];
    }).filter(Boolean).filter(function (src, index, array) {
        return array.indexOf(src) === index;
    });
    var activeVideo = primary;
    var inactiveVideo = secondary;
    var activeSource = "";

    if (!primary || !secondary || sections.length === 0 || !sectionMedia) {
        return;
    }

    uniqueSources.forEach(function (src) {
        var preloadVideo = document.createElement("video");
        preloadVideo.preload = "auto";
        preloadVideo.muted = true;
        preloadVideo.playsInline = true;
        preloadVideo.src = src;
        preloadVideo.load();
    });

    function applySource(video, src) {
        if (video.dataset.currentSrc === src) {
            return;
        }

        video.dataset.currentSrc = src;
        video.src = src;
        video.load();
        video.play().catch(function () {
            return undefined;
        });
    }

    function swapToSource(src) {
        var outgoingVideo;

        if (!src || src === activeSource) {
            return;
        }

        applySource(inactiveVideo, src);
        inactiveVideo.classList.add("is-active");
        activeVideo.classList.remove("is-active");
        outgoingVideo = activeVideo;
        activeVideo = inactiveVideo;
        inactiveVideo = outgoingVideo;
        activeSource = src;
    }

    function setActiveSection(section) {
        var key = section.getAttribute("data-section-media-key");
        var src = key ? sectionMedia[key] : "";
        swapToSource(src);
    }

    applySource(primary, sectionMedia.hero || uniqueSources[0]);
    activeSource = primary.dataset.currentSrc || "";
    primary.classList.add("is-active");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        var visible = entries.filter(function (entry) {
            return entry.isIntersecting;
        }).sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
        });

        if (visible[0]) {
            setActiveSection(visible[0].target);
        }
    }, {
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-16% 0px -16% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
