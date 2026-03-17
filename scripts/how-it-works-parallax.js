export function initHowItWorksParallax(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    var surfaces = Array.prototype.slice.call(root.querySelectorAll("[data-how-depth]"));
    surfaces.forEach(function (surface) {
        var rafId = null;
        var state = { x: 0, y: 0 };
        var strength = Number(surface.getAttribute("data-depth-strength") || 1);

        function apply() {
            rafId = null;
            surface.style.transform = "translate3d(" + (state.x * 18 * strength) + "px, " + (state.y * 14 * strength) + "px, 0) rotateX(" + (state.y * -5) + "deg) rotateY(" + (state.x * 7) + "deg)";
        }

        function queue() {
            if (!rafId) {
                rafId = window.requestAnimationFrame(apply);
            }
        }

        surface.addEventListener("pointermove", function (event) {
            var rect = surface.getBoundingClientRect();
            state.x = ((event.clientX - rect.left) / rect.width) - 0.5;
            state.y = ((event.clientY - rect.top) / rect.height) - 0.5;
            queue();
        });

        surface.addEventListener("pointerleave", function () {
            state.x = 0;
            state.y = 0;
            queue();
        });
    });
}
