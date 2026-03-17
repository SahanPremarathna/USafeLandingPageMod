export function initSectionSnap(lenis) {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sections = Array.prototype.slice.call(document.querySelectorAll(".content-section, .site-footer"))
        .filter(function (section) {
            return section.id !== "problem";
        });
    var activeSection = null;
    var isTicking = false;

    if (reducedMotion || !lenis || sections.length === 0) {
        return;
    }

    function clearFocusedSection() {
        if (activeSection) {
            activeSection.classList.remove("is-section-focus");
            activeSection = null;
        }
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

    function updateFocusedSection() {
        setFocusedSection(sections[getCurrentSectionIndex()] || null);
        isTicking = false;
    }

    function queueFocusedSectionUpdate() {
        if (isTicking) {
            return;
        }

        isTicking = true;
        window.requestAnimationFrame(updateFocusedSection);
    }

    clearFocusedSection();
    updateFocusedSection();
    window.addEventListener("scroll", queueFocusedSectionUpdate, { passive: true });
    window.addEventListener("resize", queueFocusedSectionUpdate);
}
