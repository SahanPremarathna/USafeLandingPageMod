import Lenis from "lenis";
import { gsap } from "gsap";

export function initSmoothScroll() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
        return null;
    }

    var lenis = new Lenis({
        duration: 0.55,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        gestureOrientation: "vertical"
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    gsap.ticker.lagSmoothing(0);

    return lenis;
}
