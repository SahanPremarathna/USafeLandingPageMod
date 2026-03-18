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
        video.autoplay = true;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');
        video.src = src;
        video.load();
        video.addEventListener('loadeddata', function handleLoaded() {
            video.removeEventListener('loadeddata', handleLoaded);
            video.play().catch(function () {
                return undefined;
            });
        }, { once: true });
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

    function pickClosestSection() {
        var viewportCenter = window.innerHeight * 0.5;
        var bestSection = null;
        var bestDistance = Infinity;

        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var sectionCenter = rect.top + (rect.height * 0.5);
            var visibleTop = Math.max(rect.top, 0);
            var visibleBottom = Math.min(rect.bottom, window.innerHeight);
            var visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight <= 0) {
                return;
            }

            var distance = Math.abs(sectionCenter - viewportCenter);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestSection = section;
            }
        });

        if (bestSection) {
            setActiveSection(bestSection);
        }
    }

    var observer = new IntersectionObserver(function () {
        pickClosestSection();
    }, {
        threshold: [0, 0.2, 0.4, 0.6, 0.8],
        rootMargin: "-8% 0px -8% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });

    window.addEventListener("scroll", pickClosestSection, { passive: true });
    window.addEventListener("resize", pickClosestSection);
    pickClosestSection();
}
