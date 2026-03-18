export function initLayeredSafetyStack(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    var stacks = Array.prototype.slice.call(root.querySelectorAll("[data-layered-safety-stack]"));

    stacks.forEach(function (stack) {
        var tiltSurface = stack.querySelector("[data-layered-safety-stack-tilt]");
        var cards = Array.prototype.slice.call(stack.querySelectorAll("[data-layered-safety-card]"));
        var order = cards.map(function (_, index) { return index; });
        var loopId = null;
        var tiltRafId = null;
        var kickoffId = null;
        var phaseOneId = null;
        var phaseTwoId = null;
        var tilt = { x: 0, y: 0 };
        var animating = false;

        if (!tiltSurface || cards.length !== 3) {
            return;
        }

        var basePositions = {
            front: { x: -50, y: -42, z: 125, scale: 1, rx: 0, ry: 0, rz: 0, opacity: 1, blur: 0 },
            middle: { x: -50, y: 18, z: 42, scale: 0.968, rx: 0, ry: 0, rz: 0, opacity: 0.92, blur: 0.25 },
            back: { x: -50, y: 76, z: -46, scale: 0.932, rx: 0, ry: 0, rz: 0, opacity: 0.74, blur: 1 }
        };

        function transformString(position) {
            return [
                "translate(", position.x, "%, ", position.y, "px) ",
                "translateZ(", position.z, "px) ",
                "rotateX(", position.rx, "deg) ",
                "rotateY(", position.ry, "deg) ",
                "rotateZ(", position.rz, "deg) ",
                "scale(", position.scale, ")"
            ].join("");
        }

        function setBodyVisual(body, slotName) {
            if (!body) {
                return;
            }

            if (slotName === "front") {
                body.style.borderColor = "rgba(171, 229, 255, 0.95)";
                body.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 72px rgba(0,0,0,0.36), 0 0 0 1px rgba(195, 238, 255, 0.14), 0 0 32px rgba(128, 216, 255, 0.16)";
            } else if (slotName === "middle") {
                body.style.borderColor = "rgba(145, 210, 255, 0.25)";
                body.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 44px rgba(0,0,0,0.28)";
            } else {
                body.style.borderColor = "rgba(145, 210, 255, 0.14)";
                body.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04), 0 14px 28px rgba(0,0,0,0.22)";
            }
        }

        function setCardVisual(card, slotName) {
            var position = basePositions[slotName];
            var body = card.querySelector(".layered-safety-card-body");

            card.style.transform = transformString(position);
            card.style.opacity = String(position.opacity);
            card.style.filter = "blur(" + String(position.blur) + "px)";
            setBodyVisual(body, slotName);
        }

        function setTransitionState(enabled) {
            cards.forEach(function (card) {
                var body = card.querySelector(".layered-safety-card-body");
                if (!enabled) {
                    card.style.transition = "none";
                    if (body) {
                        body.style.transition = "none";
                    }
                    return;
                }

                card.style.transition = [
                    "transform 1250ms cubic-bezier(.22,1,.36,1)",
                    "opacity 1250ms cubic-bezier(.22,1,.36,1)",
                    "filter 1250ms cubic-bezier(.22,1,.36,1)"
                ].join(", ");

                if (body) {
                    body.style.transition = [
                        "border-color 1250ms cubic-bezier(.22,1,.36,1)",
                        "box-shadow 1250ms cubic-bezier(.22,1,.36,1)"
                    ].join(", ");
                }
            });
        }

        function applyStaticPositions() {
            setTransitionState(false);
            setCardVisual(cards[order[0]], "front");
            setCardVisual(cards[order[1]], "middle");
            setCardVisual(cards[order[2]], "back");

            window.requestAnimationFrame(function () {
                setTransitionState(true);
            });
        }

        function clearTimers() {
            if (kickoffId) {
                window.clearTimeout(kickoffId);
                kickoffId = null;
            }
            if (phaseOneId) {
                window.clearTimeout(phaseOneId);
                phaseOneId = null;
            }
            if (phaseTwoId) {
                window.clearTimeout(phaseTwoId);
                phaseTwoId = null;
            }
            if (loopId) {
                window.clearInterval(loopId);
                loopId = null;
            }
        }

        function animateCycle() {
            var frontCard;
            var middleCard;
            var backCard;
            var frontBody;
            var middleBody;
            var backBody;

            if (animating || reducedMotion) {
                return;
            }

            animating = true;
            frontCard = cards[order[0]];
            middleCard = cards[order[1]];
            backCard = cards[order[2]];
            frontBody = frontCard.querySelector(".layered-safety-card-body");
            middleBody = middleCard.querySelector(".layered-safety-card-body");
            backBody = backCard.querySelector(".layered-safety-card-body");

            frontCard.style.transform = "translate(-50%, -120px) translateZ(158px) rotateX(-3deg) rotateY(3deg) rotateZ(1.2deg) scale(1.02)";
            frontCard.style.opacity = "1";
            frontCard.style.filter = "blur(0px)";
            setBodyVisual(frontBody, "front");
            if (frontBody) {
                frontBody.style.borderColor = "rgba(220, 247, 255, 1)";
                frontBody.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.1), 0 42px 90px rgba(0,0,0,0.4), 0 0 0 1px rgba(215, 244, 255, 0.18), 0 0 42px rgba(137, 221, 255, 0.2)";
            }

            middleCard.style.transform = "translate(-50%, -2px) translateZ(82px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.984)";
            middleCard.style.opacity = "0.96";
            middleCard.style.filter = "blur(0.1px)";

            backCard.style.transform = "translate(-50%, 42px) translateZ(8px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.95)";
            backCard.style.opacity = "0.86";
            backCard.style.filter = "blur(0.45px)";

            phaseOneId = window.setTimeout(function () {
                frontCard.style.transform = "translate(-50%, 98px) translateZ(-68px) rotateX(0deg) rotateY(-8deg) rotateZ(-2deg) scale(0.92)";
                frontCard.style.opacity = "0.7";
                frontCard.style.filter = "blur(1.1px)";
                setBodyVisual(frontBody, "back");

                middleCard.style.transform = "translate(-50%, -42px) translateZ(125px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)";
                middleCard.style.opacity = "1";
                middleCard.style.filter = "blur(0px)";
                setBodyVisual(middleBody, "front");

                backCard.style.transform = "translate(-50%, 18px) translateZ(42px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.968)";
                backCard.style.opacity = "0.92";
                backCard.style.filter = "blur(0.25px)";
                setBodyVisual(backBody, "middle");
            }, 420);

            phaseTwoId = window.setTimeout(function () {
                order.push(order.shift());
                applyStaticPositions();
                animating = false;
            }, 1450);
        }

        function startLoop() {
            if (reducedMotion || loopId) {
                return;
            }
            loopId = window.setInterval(animateCycle, 3200);
        }

        function updateTilt() {
            tiltRafId = null;
            tiltSurface.style.transform = "rotateX(" + tilt.x.toFixed(3) + "deg) rotateY(" + tilt.y.toFixed(3) + "deg)";
        }

        function queueTilt() {
            if (!tiltRafId) {
                tiltRafId = window.requestAnimationFrame(updateTilt);
            }
        }

        applyStaticPositions();

        if (!reducedMotion) {
            kickoffId = window.setTimeout(function () {
                animateCycle();
                startLoop();
            }, 900);
        }

        if (!coarsePointer && !reducedMotion) {
            stack.addEventListener("pointermove", function (event) {
                var rect = stack.getBoundingClientRect();
                var px = (event.clientX - rect.left) / rect.width;
                var py = (event.clientY - rect.top) / rect.height;
                tilt.x = (0.5 - py) * 10;
                tilt.y = (px - 0.5) * 14;
                queueTilt();
            });

            stack.addEventListener("pointerleave", function () {
                tilt.x = 0;
                tilt.y = 0;
                queueTilt();
            });
        }

        window.addEventListener("beforeunload", clearTimers, { once: true });
    });
}
