import "../styles/base.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/sections.css";
import "../styles/animations.css";

import usafeLandingContent from "../content/usafeLandingContent.js";
import { renderLanding } from "./renderLanding.js";
import { initSmoothScroll } from "./smoothScroll.js";
import { initNavigation } from "./navigation.js";

function applyMeta(meta) {
    document.title = meta.title;
    var description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", meta.description);
    }
}

async function initExperience() {
    var modules = await Promise.all([
        import("./heroAnimations.js"),
        import("./sectionReveal.js"),
        import("./cardInteractions.js"),
        import("./threeScene.js"),
        import("./guardianSection.js"),
        import("./whyUsafeSection.js"),
        import("./sectionSnap.js"),
        import("./sectionBackgroundVideos.js")
    ]);

    var heroAnimations = modules[0];
    var sectionReveal = modules[1];
    var cardInteractions = modules[2];
    var threeScene = modules[3];
    var guardianSection = modules[4];
    var whyUsafeSection = modules[5];
    var sectionSnap = modules[6];
    var sectionBackgroundVideos = modules[7];

    var lenis = initSmoothScroll();
    initNavigation(lenis);
    threeScene.initThreeScene();
    heroAnimations.initHeroAnimations();
    sectionReveal.initSectionReveal(lenis);
    cardInteractions.initCardInteractions();
    guardianSection.initGuardianSection();
    whyUsafeSection.initWhyUsafeSection();
    sectionSnap.initSectionSnap(lenis);
    sectionBackgroundVideos.initSectionBackgroundVideos(usafeLandingContent.sectionMedia);
}

function boot() {
    var app = document.getElementById("app");
    if (!app) {
        return;
    }

    applyMeta(usafeLandingContent.meta);
    document.body.classList.add("theme-usafe");
    renderLanding(app, usafeLandingContent);
    initExperience();
}

boot();
