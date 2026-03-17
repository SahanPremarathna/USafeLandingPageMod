export function initTeamAnimations(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealNodes = Array.prototype.slice.call(root.querySelectorAll("[data-team-reveal]"));

    if (reducedMotion) {
        revealNodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
        return;
    }

    var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            var delay = Number(entry.target.getAttribute("data-team-delay") || 0);
            window.setTimeout(function () {
                entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
    });

    revealNodes.forEach(function (node) {
        revealObserver.observe(node);
    });
}
