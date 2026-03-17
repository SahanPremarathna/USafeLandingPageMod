function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function easeOutSine(value) {
    return Math.sin((value * Math.PI) / 2);
}

export function DotGridAnimator(container, options) {
    var reducedMotion = !!(options && options.reducedMotion);
    var dots = [];
    var rafId = 0;
    var width = 0;
    var height = 0;
    var mode = "alert-scan";
    var resizeObserver = null;

    if (!container) {
        return {
            setMode: function () {},
            destroy: function () {}
        };
    }

    function buildGrid() {
        var fragment = document.createDocumentFragment();
        var columns = 14;
        var rows = 8;
        var rowIndex;
        var columnIndex;

        container.innerHTML = "";
        dots = [];

        for (rowIndex = 0; rowIndex < rows; rowIndex += 1) {
            for (columnIndex = 0; columnIndex < columns; columnIndex += 1) {
                var dot = document.createElement("span");
                var x = columns === 1 ? 0.5 : columnIndex / (columns - 1);
                var y = rows === 1 ? 0.5 : rowIndex / (rows - 1);

                dot.className = "hero-grid-dot";
                dot.style.left = String(8 + (x * 84)) + "%";
                dot.style.top = String(10 + (y * 80)) + "%";
                fragment.appendChild(dot);
                dots.push({
                    element: dot,
                    x: x,
                    y: y,
                    seed: ((rowIndex * columns) + columnIndex) * 0.37
                });
            }
        }

        container.appendChild(fragment);
    }

    function updateBounds() {
        var rect = container.getBoundingClientRect();
        width = rect.width || 1;
        height = rect.height || 1;
    }

    function ensureBounds() {
        if (!width || !height) {
            updateBounds();
        }
    }

    function getAlertState(dot, time) {
        var sweep = (time * 0.18) % 1;
        var band = Math.exp(-Math.pow((dot.y - sweep) * 8.5, 2));
        var ripple = Math.max(0, Math.sin((dot.x * 10.5) - (time * 2.8) + (dot.seed * 0.6)));
        return {
            offsetX: ripple * 2.4,
            offsetY: band * -6,
            scale: 0.9 + (band * 0.95) + (ripple * 0.18),
            opacity: 0.12 + (band * 0.48) + (ripple * 0.08)
        };
    }

    function getRadarState(dot, time) {
        var centerX = 0.58;
        var centerY = 0.44;
        var distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        var ring = (time * 0.11) % 0.95;
        var ringBand = Math.exp(-Math.pow((distance - ring) * 14, 2));
        var drift = Math.sin((distance * 18) - (time * 2.1) + dot.seed) * 1.2;
        return {
            offsetX: drift,
            offsetY: Math.cos(dot.seed + (time * 1.2)) * 1.8,
            scale: 0.86 + (ringBand * 1.1),
            opacity: 0.12 + (ringBand * 0.52)
        };
    }

    function getGuidedFlowState(dot, time) {
        var primaryPath = 0.72 - (dot.x * 0.36) + (Math.sin((dot.x * 5.5) + (time * 1.25)) * 0.05);
        var secondaryPath = 0.28 + (dot.x * 0.22) + (Math.cos((dot.x * 6.2) + (time * 0.95)) * 0.04);
        var primaryBand = Math.exp(-Math.pow((dot.y - primaryPath) * 11, 2));
        var secondaryBand = Math.exp(-Math.pow((dot.y - secondaryPath) * 11.5, 2));
        var flow = Math.max(primaryBand, secondaryBand);
        return {
            offsetX: flow * 7.5,
            offsetY: Math.sin(dot.seed + (time * 1.4)) * 2,
            scale: 0.9 + (flow * 0.92),
            opacity: 0.11 + (flow * 0.56)
        };
    }

    function getResponseState(dot, time) {
        var centerX = 0.32;
        var centerY = 0.68;
        var distance = Math.hypot(dot.x - centerX, dot.y - centerY);
        var pulse = (time * 0.14) % 1.15;
        var band = Math.exp(-Math.pow((distance - pulse) * 12, 2));
        var support = Math.exp(-Math.pow(distance * 3.6, 2));
        return {
            offsetX: Math.cos((dot.seed * 1.7) + (time * 1.25)) * support * 2.5,
            offsetY: Math.sin((dot.seed * 1.4) + (time * 1.25)) * support * 2.5,
            scale: 0.88 + (band * 1.04) + (support * 0.34),
            opacity: 0.12 + (band * 0.5) + (support * 0.18)
        };
    }

    function getDotState(dot, time) {
        if (mode === "predictive-radar") {
            return getRadarState(dot, time);
        }

        if (mode === "guided-flow") {
            return getGuidedFlowState(dot, time);
        }

        if (mode === "response-pulse") {
            return getResponseState(dot, time);
        }

        return getAlertState(dot, time);
    }

    function applyStaticState() {
        dots.forEach(function (dot) {
            dot.element.style.transform = "translate3d(0px, 0px, 0px) scale(0.92)";
            dot.element.style.opacity = "0.24";
        });
    }

    function render(now) {
        var time = now * 0.001;

        dots.forEach(function (dot) {
            var state = getDotState(dot, time);
            var softenedOpacity = reducedMotion ? 0.22 : state.opacity;
            var softenedScale = reducedMotion ? 0.92 : state.scale;
            var offsetX = reducedMotion ? 0 : state.offsetX;
            var offsetY = reducedMotion ? 0 : state.offsetY;

            dot.element.style.transform = "translate3d(" + String(offsetX.toFixed(2)) + "px, " + String(offsetY.toFixed(2)) + "px, 0px) scale(" + String(softenedScale.toFixed(3)) + ")";
            dot.element.style.opacity = String(clamp(softenedOpacity, 0.08, 0.86).toFixed(3));
        });

        rafId = window.requestAnimationFrame(render);
    }

    function watchResize() {
        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", updateBounds);
            return;
        }

        resizeObserver = new ResizeObserver(function () {
            updateBounds();
        });
        resizeObserver.observe(container);
    }

    buildGrid();
    ensureBounds();
    watchResize();

    if (reducedMotion) {
        applyStaticState();
    } else {
        rafId = window.requestAnimationFrame(render);
    }

    return {
        setMode: function (nextMode) {
            mode = nextMode || mode;
            container.dataset.gridMode = mode;

            if (reducedMotion) {
                applyStaticState();
            }
        },
        destroy: function () {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("resize", updateBounds);
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        }
    };
}
