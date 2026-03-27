import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function sendYTCommand(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*"
    );
}

export function initVideoReveal(lenis) {
    var section = document.querySelector("[data-video-reveal-section]");
    var wrapper = document.querySelector("[data-video-reveal-wrapper]");
    var label = document.querySelector("[data-video-reveal-label]");
    var iframe = document.querySelector("[data-video-reveal-iframe]");

    if (!section || !wrapper || !iframe) return;

    if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
    }

    var srcLoaded = false;
    var sectionVisible = false;

    function loadIframe() {
        if (srcLoaded) return;
        srcLoaded = true;
        iframe.src = iframe.dataset.src;
    }

    function play() {
        sectionVisible = true;
        if (!srcLoaded) {
            loadIframe();
        } else {
            sendYTCommand(iframe, "playVideo");
        }
    }

    function pause() {
        sectionVisible = false;
        sendYTCommand(iframe, "pauseVideo");
    }

    document.addEventListener("visibilitychange", function () {
        if (!srcLoaded) return;
        if (document.hidden) {
            sendYTCommand(iframe, "pauseVideo");
        } else if (sectionVisible) {
            sendYTCommand(iframe, "playVideo");
        }
    });

    // Initial hidden state
    gsap.set(wrapper, { autoAlpha: 0, y: 64, scale: 0.97 });
    if (label) gsap.set(label, { autoAlpha: 0, y: 24 });

    // Fade in when section enters viewport
    ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        end: "bottom 15%",
        onEnter: function () {
            play();
            gsap.timeline()
                .to(label ? [label] : [], {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, 0)
                .to(wrapper, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    clearProps: "scale"
                }, 0.1);
        },
        onLeave: function () {
            pause();
            gsap.timeline()
                .to(wrapper, {
                    autoAlpha: 0,
                    y: -40,
                    scale: 0.97,
                    duration: 0.65,
                    ease: "power2.in"
                }, 0)
                .to(label ? [label] : [], {
                    autoAlpha: 0,
                    y: -16,
                    duration: 0.45,
                    ease: "power2.in"
                }, 0);
        },
        onEnterBack: function () {
            play();
            gsap.timeline()
                .to(label ? [label] : [], {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, 0)
                .to(wrapper, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    clearProps: "scale"
                }, 0.1);
        },
        onLeaveBack: function () {
            pause();
            gsap.timeline()
                .to(wrapper, {
                    autoAlpha: 0,
                    y: 64,
                    scale: 0.97,
                    duration: 0.65,
                    ease: "power2.in"
                }, 0)
                .to(label ? [label] : [], {
                    autoAlpha: 0,
                    y: 24,
                    duration: 0.45,
                    ease: "power2.in"
                }, 0);
        }
    });
}
