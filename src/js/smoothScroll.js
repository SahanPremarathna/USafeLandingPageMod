import Lenis from "lenis";
import { gsap } from "gsap";

export function initSmoothScroll() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
        return null;
    }

    var lenis = new Lenis({
        duration: 0.82,
        smoothWheel: true,
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

