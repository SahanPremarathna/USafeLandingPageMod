import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGuardianSection() {
    var consolePanel = document.getElementById("guardian-console");
    var feedCards = gsap.utils.toArray(".feed-card");

    if (!consolePanel) {
        return;
    }

    gsap.fromTo(
        consolePanel,
        { y: 30, autoAlpha: 0 },
        {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: consolePanel,
                start: "top 78%"
            }
        }
    );

    feedCards.forEach(function (card, index) {
        gsap.to(card, {
            y: index % 2 === 0 ? -6 : 6,
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    });

    gsap.to(".guardian-node", {
        scale: 1.24,
        opacity: 0.75,
        transformOrigin: "center center",
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    });
}
