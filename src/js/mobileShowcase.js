function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function initMobileShowcase() {
    var hero = document.querySelector(".hero-section");
    var frame = document.querySelector("[data-mobile-showcase]");
    var screen = document.querySelector("[data-mobile-screen]");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hoverTargetX = 0;
    var hoverTargetY = 0;
    var hoverCurrentX = 0;
    var hoverCurrentY = 0;
    var dragTargetYaw = 0;
    var dragTargetPitch = 0;
    var dragCurrentYaw = 0;
    var dragCurrentPitch = 0;
    var drift = 0;
    var rafId = 0;
    var currentScale = 1.014;
    var isHovering = false;
    var isDragging = false;
    var activePointerId = null;
    var lastPointerX = 0;
    var lastPointerY = 0;

    function preventNativeDrag(event) {
        event.preventDefault();
    }

    if (!hero || !frame || !screen) {
        return {
            setActivePhrase: function () {},
            destroy: function () {}
        };
    }

    function getBaseOffsetY() {
        var rawValue = window.getComputedStyle(frame).getPropertyValue("--phone-base-y").trim();
        var parsed = parseFloat(rawValue);

        return Number.isFinite(parsed) ? parsed : 0;
    }

    function updatePointerTarget(event) {
        var rect = frame.getBoundingClientRect();
        var relativeX = ((event.clientX - rect.left) / rect.width) - 0.5;
        var relativeY = ((event.clientY - rect.top) / rect.height) - 0.5;

        hoverTargetX = clamp(relativeX * 1.6, -1, 1);
        hoverTargetY = clamp(relativeY * 1.6, -1, 1);
    }

    function applyTransform() {
        var baseOffsetY = getBaseOffsetY();
        var ambientYaw = Math.sin(drift * 0.74) * 1.55;
        var ambientPitch = Math.sin(drift * 1.04) * 2.3;
        var driftOffsetY = Math.sin(drift * 0.86) * -12.5;
        var rotateY = (hoverCurrentX * 6.5) + dragCurrentYaw + ambientYaw;
        var rotateX = (hoverCurrentY * -5.2) + dragCurrentPitch + ambientPitch;
        var translateY = baseOffsetY + driftOffsetY;
        var targetScale = reducedMotion ? 1 : (isDragging ? 1.07 : isHovering ? 1.086 : 1.014);
        var glowStrength = reducedMotion ? 0.68 : (isDragging ? 1.22 : isHovering ? 1.08 : 0.96);
        var shadowScale = reducedMotion ? 1 : (isDragging ? 1.2 : isHovering ? 1.12 : 1.06);
        var lightX = 50 + (rotateY * 1.7);
        var lightY = 18 - (rotateX * 1.4);

        currentScale += (targetScale - currentScale) * (isDragging ? 0.14 : 0.09);
        frame.style.transform = "translate3d(0px, " + String(translateY.toFixed(2)) + "px, 0px) rotateX(" + String(rotateX.toFixed(2)) + "deg) rotateY(" + String(rotateY.toFixed(2)) + "deg) scale(" + String(currentScale.toFixed(3)) + ")";
        frame.style.setProperty("--phone-reflection-shift", String((50 + (rotateY * 1.7)).toFixed(2)) + "%");
        frame.style.setProperty("--phone-light-x", String(lightX.toFixed(2)) + "%");
        frame.style.setProperty("--phone-light-y", String(lightY.toFixed(2)) + "%");
        frame.style.setProperty("--phone-glow-strength", String(glowStrength.toFixed(3)));
        frame.style.setProperty("--phone-shadow-scale", String(shadowScale.toFixed(3)));
        frame.style.setProperty("--phone-shadow-shift", String((rotateY * -0.9).toFixed(2)) + "px");
        frame.dataset.interaction = isDragging ? "dragging" : isHovering ? "hover" : "idle";
    }

    function animate() {
        if (reducedMotion) {
            applyTransform();
            return;
        }

        hoverCurrentX += (hoverTargetX - hoverCurrentX) * 0.11;
        hoverCurrentY += (hoverTargetY - hoverCurrentY) * 0.11;

        if (!isDragging) {
            dragTargetYaw *= 0.92;
            dragTargetPitch *= 0.92;
        }

        dragCurrentYaw += (dragTargetYaw - dragCurrentYaw) * (isDragging ? 0.26 : 0.08);
        dragCurrentPitch += (dragTargetPitch - dragCurrentPitch) * (isDragging ? 0.26 : 0.08);
        drift += 0.022;
        applyTransform();
        rafId = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event) {
        if (isDragging && event.pointerId === activePointerId) {
            var deltaX = event.clientX - lastPointerX;
            var deltaY = event.clientY - lastPointerY;

            dragTargetYaw = clamp(dragTargetYaw + (deltaX * 0.34), -18, 18);
            dragTargetPitch = clamp(dragTargetPitch - (deltaY * 0.28), -16, 16);
            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
            updatePointerTarget(event);
            return;
        }

        updatePointerTarget(event);
    }

    function handlePointerEnter(event) {
        isHovering = true;
        updatePointerTarget(event);
    }

    function handlePointerLeave() {
        if (isDragging) {
            return;
        }

        isHovering = false;
        hoverTargetX = 0;
        hoverTargetY = 0;
    }

    function endDrag(pointerId) {
        if (!isDragging || pointerId !== activePointerId) {
            return;
        }

        isDragging = false;
        activePointerId = null;
        frame.releasePointerCapture(pointerId);
    }

    function handlePointerDown(event) {
        if (reducedMotion) {
            return;
        }

        event.preventDefault();
        isHovering = true;
        isDragging = true;
        activePointerId = event.pointerId;
        lastPointerX = event.clientX;
        lastPointerY = event.clientY;
        updatePointerTarget(event);
        frame.setPointerCapture(event.pointerId);
    }

    function handlePointerUp(event) {
        endDrag(event.pointerId);
    }

    function handleResize() {
        applyTransform();
    }

    screen.addEventListener("dragstart", preventNativeDrag);
    frame.addEventListener("dragstart", preventNativeDrag);
    frame.addEventListener("pointerenter", handlePointerEnter);
    frame.addEventListener("pointermove", handlePointerMove);
    frame.addEventListener("pointerleave", handlePointerLeave);
    frame.addEventListener("pointerdown", handlePointerDown);
    frame.addEventListener("pointerup", handlePointerUp);
    frame.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    if (reducedMotion) {
        applyTransform();
    } else {
        rafId = window.requestAnimationFrame(animate);
    }

    return {
        setActivePhrase: function (phrase, detail) {
            if (!phrase || !phrase.screenSrc) {
                return;
            }

            frame.dataset.screen = phrase.id;
            hero.dataset.heroScreen = phrase.id;
            screen.src = phrase.screenSrc;
            screen.alt = phrase.id + " app preview";
            screen.dataset.phase = detail && detail.phase ? detail.phase : "idle";
        },
        destroy: function () {
            window.cancelAnimationFrame(rafId);
            screen.removeEventListener("dragstart", preventNativeDrag);
            frame.removeEventListener("dragstart", preventNativeDrag);
            frame.removeEventListener("pointerenter", handlePointerEnter);
            frame.removeEventListener("pointermove", handlePointerMove);
            frame.removeEventListener("pointerleave", handlePointerLeave);
            frame.removeEventListener("pointerdown", handlePointerDown);
            frame.removeEventListener("pointerup", handlePointerUp);
            frame.removeEventListener("pointercancel", handlePointerUp);
            window.removeEventListener("resize", handleResize);
        }
    };
}

