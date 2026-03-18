export function initHowItWorksAnimations(scope) {
    var root = scope || document;
    var revealNodes = Array.prototype.slice.call(root.querySelectorAll("[data-how-reveal]"));
    var headingNodes = Array.prototype.slice.call(root.querySelectorAll("[data-how-heading]"));
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
        var duration = 1280;

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

    function showNode(node) {
        var delay = Number(node.getAttribute("data-how-delay") || 0);
        window.setTimeout(function () {
            node.classList.add("is-visible");

            if (node.hasAttribute("data-score-target")) {
                animateScore(node);
            }

            var nestedScores = node.querySelectorAll("[data-score-target]");
            for (var i = 0; i < nestedScores.length; i += 1) {
                animateScore(nestedScores[i]);
            }
        }, delay);
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealNodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
        headingNodes.forEach(function (node) {
            node.classList.add("is-visible");
        });
        scoreNodes.forEach(animateScore);
        return;
    }

    // Reveal cards, panels, and supporting copy once as they enter the story flow.
    var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            showNode(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px"
    });

    // Headings reveal independently so their split lines can resolve in sequence.
    var headingObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            var delay = Number(entry.target.getAttribute("data-how-delay") || 0);
            window.setTimeout(function () {
                entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.32,
        rootMargin: "0px 0px -8% 0px"
    });

    revealNodes.forEach(function (node) {
        revealObserver.observe(node);
    });

    headingNodes.forEach(function (node) {
        headingObserver.observe(node);
    });
}
