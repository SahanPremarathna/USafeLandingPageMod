import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWhyUsafeSection() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var section = document.getElementById("problem");

    if (!section || reducedMotion) {
        return;
    }

    ScrollTrigger.matchMedia({
        "(min-width: 901px)": function () {
            var pinWrap = section.querySelector(".problem-pin-wrap");
            var track = section.querySelector("[data-problem-track]");
            var stages = gsap.utils.toArray("[data-problem-stage]", section);
            var dots = gsap.utils.toArray("[data-problem-dot]", section);
            var lastStageIndex = stages.length - 1;
            var activeStageIndex = 0;
            var isStageJumping = false;
            var stageJumpTimer = null;
            var hardScrollThreshold = 100;

            if (!pinWrap || !track || stages.length === 0) {
                return;
            }

            function setActiveStage(index) {
                activeStageIndex = index;
                stages.forEach(function (stage, stageIndex) {
                    stage.classList.toggle("is-active", stageIndex === index);
                });

                dots.forEach(function (dot, dotIndex) {
                    dot.classList.toggle("is-active", dotIndex === index);
                    dot.setAttribute("aria-pressed", dotIndex === index ? "true" : "false");
                });
            }

            function directionalStageSnap(value, trigger) {
                if (lastStageIndex <= 0) {
                    return 0;
                }

                var raw = value * lastStageIndex;
                var snappedIndex = trigger.direction >= 0 ? Math.ceil(raw) : Math.floor(raw);

                return gsap.utils.clamp(0, lastStageIndex, snappedIndex) / lastStageIndex;
            }

            function cancelStageJump() {
                releaseStageJumpLock();
            }

            function releaseStageJumpLock() {
                isStageJumping = false;

                if (stageJumpTimer) {
                    window.clearTimeout(stageJumpTimer);
                    stageJumpTimer = null;
                }
            }

            function jumpToStage(index) {
                var trigger = scrollTween.scrollTrigger;
                var clampedIndex = gsap.utils.clamp(0, lastStageIndex, index);

                if (!trigger) {
                    return;
                }

                isStageJumping = true;
                setActiveStage(clampedIndex);
                window.scrollTo({
                    top: trigger.start + ((trigger.end - trigger.start) * (clampedIndex / Math.max(1, lastStageIndex))),
                    behavior: "smooth"
                });

                if (stageJumpTimer) {
                    window.clearTimeout(stageJumpTimer);
                }

                stageJumpTimer = window.setTimeout(releaseStageJumpLock, 560);
            }

            setActiveStage(0);

            var scrollTween = gsap.to(track, {
                xPercent: -100 * (stages.length - 1) / stages.length,
                ease: "none",
                scrollTrigger: {
                    trigger: pinWrap,
                    start: "top top",
                    end: "+=" + String(pinWrap.offsetWidth * Math.max(0.26, (stages.length - 1) * 0.26)),
                    scrub: 0.04,
                    snap: {
                        snapTo: directionalStageSnap,
                        duration: { min: 0.32, max: 0.58 },
                        delay: 0,
                        inertia: false,
                        ease: "power3.out"
                    },
                    onUpdate: function (self) {
                        var stageIndex = Math.round(self.progress * lastStageIndex);
                        setActiveStage(stageIndex);
                    },
                    onRefresh: function (self) {
                        var stageIndex = Math.round(self.progress * lastStageIndex);
                        setActiveStage(stageIndex);
                    },
                    onScrubComplete: releaseStageJumpLock,
                    onSnapComplete: releaseStageJumpLock,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            dots.forEach(function (dot, dotIndex) {
                dot.addEventListener("click", function () {
                    jumpToStage(dotIndex);
                });
            });

            function handlePinnedWheel(event) {
                var trigger = scrollTween.scrollTrigger;
                var deltaY = event.deltaY || 0;

                if (!trigger || !trigger.isActive || Math.abs(deltaY) < 4) {
                    return;
                }

                if (isStageJumping) {
                    if (Math.abs(deltaY) >= hardScrollThreshold) {
                        cancelStageJump();
                        return;
                    }

                    event.preventDefault();
                    return;
                }

                if (deltaY > 0 && activeStageIndex < lastStageIndex) {
                    event.preventDefault();
                    jumpToStage(activeStageIndex + 1);
                    return;
                }

                if (deltaY < 0 && activeStageIndex > 0) {
                    event.preventDefault();
                    jumpToStage(activeStageIndex - 1);
                }
            }

            window.addEventListener("wheel", handlePinnedWheel, { passive: false });

            stages.forEach(function (stage, index) {
                var copy = stage.querySelector(".problem-stage-copy");
                var visual = stage.querySelector(".problem-stage-visual");
                var card = stage.querySelector(".problem-stage-card");
                var routeAlt = stage.querySelector(".problem-route-alt");
                var warning = stage.querySelector(".problem-warning");
                var shield = stage.querySelector(".problem-shield");
                var guardian = stage.querySelector(".problem-guardian-signal");
                var glows = stage.querySelectorAll(".problem-glow");

                gsap.fromTo(stage, { autoAlpha: 0.38, scale: 0.972 }, {
                    autoAlpha: 1,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stage,
                        containerAnimation: scrollTween,
                        start: "left 78%",
                        end: "center center",
                        scrub: true
                    }
                });

                gsap.fromTo(copy, { autoAlpha: 0.3, y: 40 }, {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stage,
                        containerAnimation: scrollTween,
                        start: "left 72%",
                        end: "left 42%",
                        scrub: true
                    }
                });

                gsap.fromTo(visual, { rotateY: index % 2 === 0 ? -8 : 8, y: 32 }, {
                    rotateY: 0,
                    y: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stage,
                        containerAnimation: scrollTween,
                        start: "left 78%",
                        end: "left 38%",
                        scrub: true
                    }
                });

                gsap.to(glows, {
                    opacity: index < 2 ? 0.16 : 0.34,
                    ease: "none",
                    scrollTrigger: {
                        trigger: stage,
                        containerAnimation: scrollTween,
                        start: "left center",
                        end: "right center",
                        scrub: true
                    }
                });

                if (card) {
                    gsap.fromTo(card, { autoAlpha: 0.3, y: 26 }, {
                        autoAlpha: 1,
                        y: 0,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: stage,
                            containerAnimation: scrollTween,
                            start: "left 74%",
                            end: "left 36%",
                            scrub: true
                        }
                    });
                }

                if (routeAlt) {
                    gsap.fromTo(routeAlt, { scaleX: 0.2, autoAlpha: 0 }, {
                        scaleX: index >= 2 ? 1 : 0.2,
                        autoAlpha: index >= 2 ? 1 : 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: stage,
                            containerAnimation: scrollTween,
                            start: "left 74%",
                            end: "left 30%",
                            scrub: true
                        }
                    });
                }

                if (warning) {
                    gsap.fromTo(warning, { autoAlpha: 0, scale: 0.82 }, {
                        autoAlpha: index === 1 ? 1 : 0,
                        scale: index === 1 ? 1 : 0.82,
                        ease: "none",
                        scrollTrigger: {
                            trigger: stage,
                            containerAnimation: scrollTween,
                            start: "left 72%",
                            end: "left 34%",
                            scrub: true
                        }
                    });
                }

                if (shield) {
                    gsap.fromTo(shield, { autoAlpha: 0, y: 18 }, {
                        autoAlpha: index >= 2 ? 1 : 0,
                        y: index >= 2 ? 0 : 18,
                        ease: "none",
                        scrollTrigger: {
                            trigger: stage,
                            containerAnimation: scrollTween,
                            start: "left 72%",
                            end: "left 34%",
                            scrub: true
                        }
                    });
                }

                if (guardian) {
                    gsap.fromTo(guardian, { autoAlpha: 0, scale: 0.9 }, {
                        autoAlpha: index === 3 ? 1 : 0,
                        scale: index === 3 ? 1 : 0.9,
                        ease: "none",
                        scrollTrigger: {
                            trigger: stage,
                            containerAnimation: scrollTween,
                            start: "left 68%",
                            end: "left 26%",
                            scrub: true
                        }
                    });
                }
            });
        },
        "(max-width: 900px)": function () {
            gsap.utils.toArray("[data-problem-stage]", section).forEach(function (stage, index) {
                gsap.fromTo(stage, { autoAlpha: 0, y: 28 }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.72,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stage,
                        start: "top 84%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    },
                    delay: index * 0.04
                });
            });
        }
    });
}


