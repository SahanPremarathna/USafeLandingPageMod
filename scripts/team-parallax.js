export function initTeamParallax(root) {
    if (!root) {
        return;
    }

    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-parallax-depth]"));
    var gallery = root.querySelector(".team-gallery-shell");
    var rafId = null;
    var state = { x: 0, y: 0 };

    function applyTransforms() {
        rafId = null;
        cards.forEach(function (card) {
            var depth = Number(card.getAttribute("data-parallax-depth") || 1);
            var translateX = state.x * (depth * 5.5);
            var translateY = state.y * (depth * 4.2);
            var rotateX = state.y * (-4.2 + depth * 0.25);
            var rotateY = state.x * (6.8 - depth * 0.35);
            card.style.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        if (gallery) {
            gallery.style.transform = 'translate3d(' + state.x * 16 + 'px, ' + state.y * 12 + 'px, 0)';
        }
    }

    function queueApply() {
        if (!rafId) {
            rafId = window.requestAnimationFrame(applyTransforms);
        }
    }

    root.addEventListener("pointermove", function (event) {
        var rect = root.getBoundingClientRect();
        var offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        var offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        state.x = offsetX;
        state.y = offsetY;
        queueApply();
    });

    root.addEventListener("pointerleave", function () {
        state.x = 0;
        state.y = 0;
        queueApply();
    });
}
