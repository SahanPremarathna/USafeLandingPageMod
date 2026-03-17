export function initHowItWorksScrollScenes(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sections = Array.prototype.slice.call(root.querySelectorAll(".story-section, .product-scene"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
        sections.forEach(function (section) {
            section.classList.add("is-active");
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
    }, {
        threshold: 0.38,
        rootMargin: "-10% 0px -14% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}
