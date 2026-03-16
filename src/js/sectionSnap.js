export function initSectionSnap(lenis) {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sections = Array.prototype.slice.call(document.querySelectorAll(".content-section, .site-footer"))
        .filter(function (section) {
            return section.id !== "problem";
        });
    var isSnapping = false;
    var snapTimer = null;
    var activeSection = null;
    var hardScrollThreshold = 100;

    if (reducedMotion || !lenis || sections.length === 0) {
        return;
    }

    function clearFocusedSection() {
        if (activeSection) {
            activeSection.classList.remove("is-section-focus");
            activeSection = null;
        }
    }

    function releaseSnapLock() {
        isSnapping = false;

        if (snapTimer) {
            window.clearTimeout(snapTimer);
            snapTimer = null;
        }
    }

    function cancelSnap() {
        lenis.stop();
        lenis.start();
        clearFocusedSection();
        releaseSnapLock();
    }

    function getViewportCenter() {
        return window.innerHeight * 0.5;
    }

    function getSectionCenter(section) {
        var rect = section.getBoundingClientRect();
        return rect.top + (rect.height * 0.5);
    }

    function getCurrentSectionIndex() {
        var viewportCenter = getViewportCenter();
        var closestIndex = 0;
        var closestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(function (section, index) {
            var distance = Math.abs(getSectionCenter(section) - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    function setFocusedSection(section) {
        if (activeSection && activeSection !== section) {
            activeSection.classList.remove("is-section-focus");
        }

        activeSection = section;

        if (activeSection) {
            activeSection.classList.add("is-section-focus");
        }
    }

    function snapToSection(index) {
        var clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
        var target = sections[clampedIndex];

        if (!target) {
            return;
        }

        isSnapping = true;
        setFocusedSection(target);
        lenis.scrollTo(target, {
            duration: 0.92,
            lock: true,
            easing: function (t) {
                return 1 - Math.pow(1 - t, 3);
            },
            offset: (window.innerHeight - target.getBoundingClientRect().height) * -0.5
        });

        if (snapTimer) {
            window.clearTimeout(snapTimer);
        }

        snapTimer = window.setTimeout(releaseSnapLock, 760);
    }

    function handleWheel(event) {
        var deltaY = event.deltaY || 0;
        var problemSection = document.getElementById("problem");
        var problemRect = problemSection ? problemSection.getBoundingClientRect() : null;
        var currentIndex;

        if (Math.abs(deltaY) < 6) {
            return;
        }

        if (problemRect && problemRect.top < window.innerHeight * 0.45 && problemRect.bottom > window.innerHeight * 0.55) {
            return;
        }

        if (isSnapping) {
            if (Math.abs(deltaY) >= hardScrollThreshold) {
                cancelSnap();
                return;
            }

            event.preventDefault();
            return;
        }

        currentIndex = getCurrentSectionIndex();

        if (deltaY > 0 && currentIndex < sections.length - 1) {
            event.preventDefault();
            snapToSection(currentIndex + 1);
            return;
        }

        if (deltaY < 0 && currentIndex > 0) {
            event.preventDefault();
            snapToSection(currentIndex - 1);
        }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
}
