export function initSectionBackgroundVideos(sectionMedia) {
    var primary = document.querySelector("[data-section-video-primary]");
    var secondary = document.querySelector("[data-section-video-secondary]");
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section-media-key]"));
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
        threshold: [0.3, 0.45, 0.6, 0.75],
        rootMargin: "-18% 0px -18% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
