export function initHowItWorksScrollScenes(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sections = Array.prototype.slice.call(root.querySelectorAll(".story-section"));
    var ticking = false;

    // Drive one active scene at a time so the page settles section-by-section instead of feeling flat.
    function applyState() {
        ticking = false;

        if (!sections.length) {
            return;
        }

        var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        var viewportCenter = viewportHeight * 0.5;
        var focusRange = viewportHeight * 0.9;
        var activeIndex = -1;
        var strongestFocus = 0;

        sections.forEach(function (section, index) {
            var rect = section.getBoundingClientRect();
            var sectionCenter = rect.top + (rect.height * 0.5);
            var distance = Math.abs(sectionCenter - viewportCenter);
            var focus = Math.max(0, 1 - (distance / focusRange));

            section.style.setProperty("--scene-focus", focus.toFixed(3));

            if (focus > strongestFocus) {
                strongestFocus = focus;
                activeIndex = index;
            }
        });

        sections.forEach(function (section, index) {
            section.classList.toggle("is-active", !reducedMotion && index === activeIndex && strongestFocus > 0.18);
            section.classList.toggle("is-settled", !reducedMotion && activeIndex > index);
            section.classList.toggle("is-upcoming", !reducedMotion && activeIndex !== -1 && index > activeIndex);
        });
    }

    function queue() {
        if (ticking) {
            return;
        }
        ticking = true;
        window.requestAnimationFrame(applyState);
    }

    if (reducedMotion) {
        sections.forEach(function (section) {
            section.classList.add("is-active");
            section.style.setProperty("--scene-focus", "1");
        });
        return;
    }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();
}
