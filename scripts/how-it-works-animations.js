export function initHowItWorksAnimations(scope) {
    var root = scope || document;
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-how-reveal]"));
    var scoreNodes = Array.prototype.slice.call(root.querySelectorAll("[data-score-target]"));
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animateScore(node) {
        var target = Number(node.getAttribute("data-score-target") || 0);
        if (!target) {
            return;
        }
        if (reducedMotion) {
            node.textContent = String(target);
            return;
        }

        var started = null;
        var duration = 1100;

        function step(timestamp) {
            if (!started) {
                started = timestamp;
            }
            var progress = Math.min((timestamp - started) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = String(Math.round(target * eased));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
        nodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
        scoreNodes.forEach(animateScore);
        return;
    }

    var observer = new IntersectionObserver(function (entries, instance) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            var delay = Number(entry.target.getAttribute("data-how-delay") || 0);
            window.setTimeout(function () {
                entry.target.classList.add("is-visible");
                if (entry.target.hasAttribute("data-score-target")) {
                    animateScore(entry.target);
                }
                var nestedScores = entry.target.querySelectorAll("[data-score-target]");
                for (var i = 0; i < nestedScores.length; i += 1) {
                    animateScore(nestedScores[i]);
                }
            }, delay);
            instance.unobserve(entry.target);
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px"
    });

    nodes.forEach(function (node) {
        observer.observe(node);
    });
}
