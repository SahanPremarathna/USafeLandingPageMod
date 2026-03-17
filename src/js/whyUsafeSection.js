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

        function setInitialState(multiplier) {
            if (reducedMotion) {
                return;
            }

            gsap.set(stage, { autoAlpha: 0, x: direction * multiplier, y: 24 });

            if (copy) {
                gsap.set(copy, { autoAlpha: 0, x: direction * 0.5 * multiplier });
            }

            if (visual) {
                gsap.set(visual, { autoAlpha: 0, x: -direction * 0.45 * multiplier, y: 18 });
            }

            if (chips.length > 0) {
                gsap.set(chips, { autoAlpha: 0, y: 12 });
            }

            if (nodes.length > 0) {
                gsap.set(nodes, { autoAlpha: 0.18, scale: 0.84 });
            }

            if (lines.length > 0) {
                gsap.set(lines, { autoAlpha: 0.1, scaleX: 0.78 });
            }

            if (hud) {
                gsap.set(hud, { autoAlpha: 0, y: 18 });
            }
        }

        function playReveal(multiplier) {
            if (reducedMotion) {
                gsap.set(stage, { autoAlpha: 1, x: 0, y: 0 });
                if (copy) {
                    gsap.set(copy, { autoAlpha: 1, x: 0 });
                }
                if (visual) {
                    gsap.set(visual, { autoAlpha: 1, x: 0, y: 0 });
                }
                if (chips.length > 0) {
                    gsap.set(chips, { autoAlpha: 1, y: 0 });
                }
                if (nodes.length > 0) {
                    gsap.set(nodes, { autoAlpha: 1, scale: 1 });
                }
                if (lines.length > 0) {
                    gsap.set(lines, { autoAlpha: 1, scaleX: 1 });
                }
                if (hud) {
                    gsap.set(hud, { autoAlpha: 1, y: 0 });
                }
                return;
            }

            setInitialState(multiplier);

            gsap.to(stage, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.95,
                ease: "power3.out",
                overwrite: "auto"
            });

            if (copy) {
                gsap.to(copy, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            if (visual) {
                gsap.to(visual, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            if (chips.length > 0) {
                gsap.to(chips, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            if (nodes.length > 0) {
                gsap.to(nodes, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.9,
                    stagger: 0.03,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            if (lines.length > 0) {
                gsap.to(lines, {
                    autoAlpha: 1,
                    scaleX: 1,
                    duration: 1,
                    stagger: 0.04,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            if (hud) {
                gsap.to(hud, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        }

        setInitialState(1);

        ScrollTrigger.create({
            trigger: stage,
            start: "top 68%",
            end: "bottom 32%",
            onEnter: function () {
                stage.classList.add("is-active");
                playReveal(1);
            },
            onEnterBack: function () {
                stage.classList.add("is-active");
                playReveal(-1);
            },
            onLeave: function () {
                stage.classList.remove("is-active");
            },
            onLeaveBack: function () {
                stage.classList.remove("is-active");
                setInitialState(1);
            }
        });
    });
}
