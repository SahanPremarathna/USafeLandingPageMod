import dangerScreenUrl from "../assets/mockups/sosf.png";
import riskScreenUrl from "../assets/mockups/safetyf.png";
import pathScreenUrl from "../assets/mockups/navf.png";
import helpScreenUrl from "../assets/mockups/processf.png";

export var heroTextContent = [
    {
        id: "danger",
        text: "DANGER before it happens.",
        highlight: "DANGER",
        animationMode: "alert-scan",
        screenSrc: dangerScreenUrl
    },
    {
        id: "risk",
        text: "RISK before it unfolds.",
        highlight: "RISK",
        animationMode: "predictive-radar",
        screenSrc: riskScreenUrl
    },
    {
        id: "routes",
        text: "PATH before you choose.",
        highlight: "PATH",
        animationMode: "guided-flow",
        screenSrc: pathScreenUrl
    },
    {
        id: "help",
        text: "HELP exactly when you need it.",
        highlight: "HELP",
        animationMode: "response-pulse",
        screenSrc: helpScreenUrl
    }
];

export var heroTypeTimings = {
    typeDelay: 72,
    holdDelay: 2200,
    glitchDuration: 340,
    restartDelay: 280
};

export function getDefaultHeroPhrase() {
    return heroTextContent[0];
}
