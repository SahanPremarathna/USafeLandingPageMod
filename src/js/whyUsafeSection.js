import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWhyUsafeSection(lenis) {
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

            if (!pinWrap || !track || stages.length === 0) {
                return;
            }

            function setActiveStage(index) {
                stages.forEach(function (stage, stageIndex) {
                    var isActive = stageIndex === index;
                    stage.classList.toggle("is-active", isActive);
                });

                dots.forEach(function (dot, dotIndex) {
                    var isActive = dotIndex === index;
                    dot.classList.toggle("is-active", isActive);
                    dot.setAttribute("aria-pressed", isActive ? "true" : "false");
                });
            }

            function jumpToStage(index) {
                var trigger = scrollTween.scrollTrigger;
                var clampedIndex = gsap.utils.clamp(0, lastStageIndex, index);
                var targetScroll;

                if (!trigger) {
                    return;
                }

                targetScroll = trigger.start + ((trigger.end - trigger.start) * (clampedIndex / Math.max(1, lastStageIndex)));

                if (lenis) {
                    lenis.scrollTo(targetScroll, {
                        duration: 0.35
                    });
                    return;
                }

                window.scrollTo({
                    top: targetScroll,
                    behavior: "auto"
                });
            }

            setActiveStage(0);

            var scrollTween = gsap.to(track, {
                xPercent: -100 * (stages.length - 1) / stages.length,
                ease: "none",
                scrollTrigger: {
                    trigger: pinWrap,
                    start: "top top",
                    end: "+=" + String(pinWrap.offsetWidth * Math.max(0.26, (stages.length - 1) * 0.26)),
                    scrub: true,
                    onUpdate: function (self) {
                        var stageIndex = Math.round(self.progress * lastStageIndex);
                        setActiveStage(stageIndex);
                    },
                    onRefresh: function (self) {
                        var stageIndex = Math.round(self.progress * lastStageIndex);
                        setActiveStage(stageIndex);
                    },
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
