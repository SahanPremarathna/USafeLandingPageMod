import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
    var hero = document.querySelector(".hero-section");
    var heroVisual = document.querySelector(".hero-visual");
    var heroCopy = document.querySelector(".hero-copy");
    var heroFrame = document.querySelector(".mobile-device-shell") || document.querySelector(".hero-visual");
    var dashboard = hero ? hero.querySelector(".dashboard-panel") : null;
    var signals = gsap.utils.toArray(".hero-signal");
    var routes = gsap.utils.toArray(".map-route");

    if (!hero || !heroVisual || !heroCopy || !heroFrame) {
        return;
    }

    var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
        .fromTo(heroFrame, { autoAlpha: 0, y: 34, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.95 })
        .fromTo(heroCopy, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.56")
        .fromTo(heroVisual, { autoAlpha: 0, x: 26 }, { autoAlpha: 1, x: 0, duration: 1.05 }, "-=0.62");

    if (dashboard) {
        intro.fromTo(dashboard, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.72 }, "-=0.54");
    }

    routes.forEach(function (route, index) {
        gsap.to(route, {
            opacity: index === 0 ? 0.96 : 0.42,
            duration: 3 + (index * 0.6),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    signals.forEach(function (signal) {
        gsap.to(signal, {
            scale: 1.06,
            opacity: 0.48,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    gsap.to(heroFrame, {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}
