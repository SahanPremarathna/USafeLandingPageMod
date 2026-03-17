import "../styles/base.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/sections.css";
import "../styles/heroPhraseSystem.css";
import "../styles/animations.css";
import "../styles/startupSplash.css";

import usafeLandingContent from "../content/usafeLandingContent.js";
import { heroTextContent, heroTypeTimings } from "../content/heroTextContent.js";
import { renderLanding } from "./renderLanding.js";
import { initSmoothScroll } from "./smoothScroll.js";
import { initNavigation } from "./navigation.js";
import logoUrl from "../../images/usafelogo.webp";
import heroPosterUrl from "../../images/pre_load_hero_bg.webp";
import heroWebmUrl from "../../images/hero_bg.webm";
import { runStartupSequence } from "./startupSplash.js";

function applyMeta(meta) {
    document.title = meta.title;
    var description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", meta.description);
    }
}

function loadExperienceModules() {
    return Promise.all([
        import("./heroAnimations.js"),
        import("./typewriterHeadline.js"),
        import("./heroBackgroundController.js"),
        import("./sectionReveal.js"),
        import("./cardInteractions.js"),
        import("./guardianSection.js"),
        import("./whyUsafeSection.js"),
        import("./sectionSnap.js"),
        import("./sectionBackgroundVideos.js")
    ]);
}

async function initExperience(modules) {
    modules = modules || await loadExperienceModules();

    var heroAnimations = modules[0];
    var typewriterHeadline = modules[1];
    var heroBackgroundController = modules[2];
    var sectionReveal = modules[3];
    var cardInteractions = modules[4];
    var guardianSection = modules[5];
    var whyUsafeSection = modules[6];
    var sectionSnap = modules[7];
    var sectionBackgroundVideos = modules[8];
    var lineEl = document.querySelector("[data-typed-line]");
    var backgroundController = heroBackgroundController.initHeroBackgroundController();

    var lenis = initSmoothScroll();
    initNavigation(lenis);
    heroAnimations.initHeroAnimations();
    typewriterHeadline.initTypewriterHeadline({
        phrases: heroTextContent,
        timings: heroTypeTimings,
        lineEl: lineEl,
        beforeEl: document.querySelector("[data-typed-before]"),
        highlightEl: document.querySelector("[data-typed-highlight]"),
        afterEl: document.querySelector("[data-typed-after]"),
        onPhraseChange: backgroundController.setActivePhrase
    });
    sectionReveal.initSectionReveal(lenis);
    cardInteractions.initCardInteractions();
    guardianSection.initGuardianSection();
    whyUsafeSection.initWhyUsafeSection(lenis);
    sectionSnap.initSectionSnap(lenis);
    sectionBackgroundVideos.initSectionBackgroundVideos(usafeLandingContent.sectionMedia);
}

async function boot() {
    var app = document.getElementById("app");
    var moduleCache = null;

    if (!app) {
        return;
    }

    applyMeta(usafeLandingContent.meta);
    document.body.classList.add("theme-usafe");
    renderLanding(app, usafeLandingContent);
    await runStartupSequence({
        appEl: app,
        logoSrc: logoUrl,
        criticalImageSources: [logoUrl, heroPosterUrl].concat(heroTextContent.map(function (phrase) {
            return phrase.screenSrc;
        })),
        criticalVideoSources: [heroWebmUrl],
        preloadModules: function () {
            if (!moduleCache) {
                moduleCache = loadExperienceModules();
            }

            return moduleCache;
        },
        onBeforeReveal: async function () {
            var modules = moduleCache || loadExperienceModules();
            await initExperience(await modules);
        }
    });
}

boot();
