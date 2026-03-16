(function () {
    "use strict";

    var observer = null;

    function showAll(elements) {
        for (var i = 0; i < elements.length; i += 1) {
            elements[i].classList.add("show");
        }
    }

    function initReveal() {
        var revealElements = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
        if (!revealElements.length) {
            return;
        }

        for (var i = 0; i < revealElements.length; i += 1) {
            var delay = revealElements[i].getAttribute("data-reveal-delay");
            if (delay) {
                revealElements[i].style.setProperty("--reveal-delay", delay);
            }
        }

        var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            showAll(revealElements);
            return;
        }

        if (!("IntersectionObserver" in window)) {
            showAll(revealElements);
            return;
        }

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver(
            function (entries) {
                for (var j = 0; j < entries.length; j += 1) {
                    if (entries[j].isIntersecting) {
                        entries[j].target.classList.add("show");
                    }
                }
            },
            {
                root: null,
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.14
            }
        );

        for (var k = 0; k < revealElements.length; k += 1) {
            observer.observe(revealElements[k]);
        }
    }

    window.USafeReveal = {
        refresh: initReveal
    };

    initReveal();
})();
