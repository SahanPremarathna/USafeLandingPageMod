import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWhyUsafeSection() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var section = document.getElementById("problem");
    var stages = section ? gsap.utils.toArray("[data-problem-stage]", section) : [];

    if (!section || stages.length === 0) {
        return;
    }

    stages.forEach(function (stage, index) {
        var direction = index % 2 === 0 ? -64 : 64;
        var copy = stage.querySelector(".problem-stage-copy");
        var visual = stage.querySelector(".problem-stage-visual");
        var chips = gsap.utils.toArray(".problem-chip", stage);
        var nodes = gsap.utils.toArray(".problem-node, .problem-hotspot, .problem-scan, .problem-orbit", stage);
        var lines = gsap.utils.toArray(".problem-route, .problem-status-beam, .problem-guardian-link, .problem-alert-wave", stage);
        var hud = stage.querySelector(".problem-scene-hud");
        var startX = reducedMotion ? 0 : direction;
        var startY = reducedMotion ? 0 : 24;

        ScrollTrigger.create({
            trigger: stage,
            start: "top 68%",
            end: "bottom 32%",
            onEnter: function () {
                stage.classList.add("is-active");
            },
            onEnterBack: function () {
                stage.classList.add("is-active");
            },
            onLeave: function () {
                stage.classList.remove("is-active");
            },
            onLeaveBack: function () {
                stage.classList.remove("is-active");
            }
        });

        gsap.fromTo(stage, { autoAlpha: reducedMotion ? 1 : 0, x: startX, y: startY }, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: reducedMotion ? 0.01 : 0.95,
            ease: "power3.out",
            scrollTrigger: {
                trigger: stage,
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });

        if (copy) {
            gsap.fromTo(copy, { autoAlpha: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : direction * 0.5 }, {
                autoAlpha: 1,
                x: 0,
                duration: reducedMotion ? 0.01 : 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 76%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (visual) {
            gsap.fromTo(visual, { autoAlpha: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -direction * 0.45, y: reducedMotion ? 0 : 18 }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: reducedMotion ? 0.01 : 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 74%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (chips.length > 0) {
            gsap.fromTo(chips, { autoAlpha: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }, {
                autoAlpha: 1,
                y: 0,
                duration: reducedMotion ? 0.01 : 0.5,
                stagger: reducedMotion ? 0 : 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 72%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (!reducedMotion && nodes.length > 0) {
            gsap.fromTo(nodes, { autoAlpha: 0.18, scale: 0.84 }, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.9,
                stagger: 0.03,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 72%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (!reducedMotion && lines.length > 0) {
            gsap.fromTo(lines, { autoAlpha: 0.1, scaleX: 0.78 }, {
                autoAlpha: 1,
                scaleX: 1,
                duration: 1,
                stagger: 0.04,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if (hud) {
            gsap.fromTo(hud, { autoAlpha: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 }, {
                autoAlpha: 1,
                y: 0,
                duration: reducedMotion ? 0.01 : 0.65,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
}
