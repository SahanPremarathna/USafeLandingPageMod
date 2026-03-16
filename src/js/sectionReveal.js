import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSectionReveal(lenis) {
    if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.utils.toArray("[data-reveal]").forEach(function (element, index) {
        var childTargets = Array.from(element.children).filter(function (child) {
            return !(child instanceof HTMLElement) ? false : !child.hasAttribute("data-static");
        });

        var timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: element,
                start: "top 84%",
                end: "bottom 14%",
                toggleActions: "play none none reverse"
            }
        });

        timeline.fromTo(
            element,
            { autoAlpha: 0, y: 56, scale: 0.965, filter: "blur(12px)" },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.96,
                delay: (index % 3) * 0.05,
                clearProps: "filter"
            }
        );

        if (childTargets.length > 0) {
            timeline.fromTo(
                childTargets,
                { autoAlpha: 0, y: 24 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.62,
                    stagger: 0.08
                },
                0.12
            );
        }
    });

    gsap.utils.toArray(".story-section").forEach(function (section) {
        gsap.fromTo(
            section,
            { "--section-glow-opacity": 0.08 },
            {
                "--section-glow-opacity": 0.3,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });
}
