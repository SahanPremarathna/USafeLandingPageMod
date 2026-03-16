import content from "../../usafe-landing-content.js";
import { renderHomePage } from "./home/render-home.js";
import { initHomeEffects } from "./home/effects.js";

function applyMeta(meta) {
    if (!meta) {
        return;
    }

    if (meta.title) {
        document.title = meta.title;
    }

    if (meta.description) {
        var descriptionNode = document.querySelector('meta[name="description"]');
        if (descriptionNode) {
            descriptionNode.setAttribute("content", meta.description);
        }
    }
}

function bootHomePage() {
    var homeRoot = document.getElementById("home-root");
    var footerRoot = document.getElementById("site-footer");

    if (!homeRoot || !footerRoot) {
        return;
    }

    applyMeta(content.meta);
    renderHomePage({
        content: content,
        homeRoot: homeRoot,
        footerRoot: footerRoot
    });
    initHomeEffects();

    if (window.USafeReveal && typeof window.USafeReveal.refresh === "function") {
        window.USafeReveal.refresh();
    }

    if (window.USafeNavigation && typeof window.USafeNavigation.refresh === "function") {
        window.USafeNavigation.refresh();
    }
}

bootHomePage();
