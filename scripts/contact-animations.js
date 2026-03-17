export function initContactAnimations(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-contact-reveal]"));

    if (reducedMotion) {
        nodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries, instance) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            var delay = Number(entry.target.getAttribute("data-contact-delay") || 0);
            window.setTimeout(function () {
                entry.target.classList.add("is-visible");
            }, delay);
            instance.unobserve(entry.target);
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px"
    });

    nodes.forEach(function (node) {
        observer.observe(node);
    });
}
