export function initContactInteractions(scope) {
    var root = scope || document;
    var form = root.querySelector(".contact-form");
    var options = Array.prototype.slice.call(root.querySelectorAll("[data-contact-path-option]"));
    var panels = Array.prototype.slice.call(root.querySelectorAll("[data-contact-panel]"));
    var stage = root.querySelector("[data-contact-panel-stage]");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var activeId = "message";

    function setActiveOption(nextId) {
        options.forEach(function (option) {
            var active = option.getAttribute("data-path-id") === nextId;
            option.classList.toggle("is-active", active);
            option.setAttribute("aria-pressed", String(active));
        });
    }

    function setPanelImmediate(nextId) {
        panels.forEach(function (panel) {
            var active = panel.getAttribute("data-contact-panel") === nextId;
            panel.hidden = !active;
            panel.classList.toggle("is-active", active);
        });
        if (stage) {
            stage.setAttribute("data-active-panel", nextId);
        }
    }

    function swapPanel(nextId) {
        if (nextId === activeId) {
            return;
        }

        setActiveOption(nextId);

        if (!stage || reducedMotion) {
            activeId = nextId;
            setPanelImmediate(nextId);
            return;
        }

        stage.classList.add("is-switching");
        window.setTimeout(function () {
            panels.forEach(function (panel) {
                var active = panel.getAttribute("data-contact-panel") === nextId;
                panel.hidden = !active;
                panel.classList.toggle("is-active", active);
            });
            activeId = nextId;
            stage.setAttribute("data-active-panel", nextId);
            window.requestAnimationFrame(function () {
                stage.classList.remove("is-switching");
            });
        }, 180);
    }

    if (options.length && panels.length) {
        setActiveOption(activeId);
        setPanelImmediate(activeId);
        options.forEach(function (option) {
            option.addEventListener("click", function () {
                var nextId = option.getAttribute("data-path-id");
                swapPanel(nextId || "message");
            });
        });
    }

    if (form) {
        var fields = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
        fields.forEach(function (field, index) {
            field.addEventListener("focus", function () {
                var wrapper = field.closest(".field");
                if (wrapper) {
                    wrapper.classList.add("is-focused");
                }
                fields.forEach(function (candidate, candidateIndex) {
                    var candidateWrapper = candidate.closest(".field");
                    if (!candidateWrapper) {
                        return;
                    }
                    candidateWrapper.classList.toggle("is-next", candidateIndex === index + 1 && field.value.trim().length > 0);
                });
            });

            field.addEventListener("blur", function () {
                var wrapper = field.closest(".field");
                if (wrapper) {
                    wrapper.classList.remove("is-focused");
                    wrapper.classList.toggle("is-filled", field.value.trim().length > 0);
                }
            });

            field.addEventListener("input", function () {
                var wrapper = field.closest(".field");
                if (wrapper) {
                    wrapper.classList.toggle("is-filled", field.value.trim().length > 0);
                }
            });
        });
    }
}
