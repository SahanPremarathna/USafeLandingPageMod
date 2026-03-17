export function initContactInteractions(scope) {
    var root = scope || document;
    var form = root.querySelector(".contact-form");
    var depthWrap = root.querySelector("[data-contact-depth-wrap]");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (form) {
        var fields = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
        fields.forEach(function (field) {
            field.addEventListener("focus", function () {
                var wrapper = field.closest(".field");
                if (wrapper) {
                    wrapper.classList.add("is-focused");
                }
            });

            field.addEventListener("blur", function () {
                var wrapper = field.closest(".field");
                if (wrapper) {
                    wrapper.classList.remove("is-focused");
                }
                field.classList.toggle("is-filled", field.value.trim().length > 0);
            });
        });
    }

    if (!depthWrap || reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    var cards = Array.prototype.slice.call(depthWrap.querySelectorAll("[data-contact-depth]"));
    var signalPanel = depthWrap.querySelector(".contact-signal-panel");
    var rafId = null;
    var state = { x: 0, y: 0 };

    function apply() {
        rafId = null;
        cards.forEach(function (card) {
            var depth = Number(card.getAttribute("data-contact-depth") || 1);
            card.style.transform = 'translate3d(' + state.x * depth * 5 + 'px, ' + state.y * depth * 4 + 'px, 0) rotateX(' + state.y * -4 + 'deg) rotateY(' + state.x * 6 + 'deg)';
        });
        if (signalPanel) {
            signalPanel.style.transform = 'translate3d(' + state.x * 14 + 'px, ' + state.y * 10 + 'px, 0)';
        }
    }

    function queue() {
        if (!rafId) {
            rafId = window.requestAnimationFrame(apply);
        }
    }

    depthWrap.addEventListener("pointermove", function (event) {
        var rect = depthWrap.getBoundingClientRect();
        state.x = (event.clientX - rect.left) / rect.width - 0.5;
        state.y = (event.clientY - rect.top) / rect.height - 0.5;
        queue();
    });

    depthWrap.addEventListener("pointerleave", function () {
        state.x = 0;
        state.y = 0;
        queue();
    });
}
