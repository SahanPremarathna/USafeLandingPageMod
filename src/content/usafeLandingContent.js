import heroBgVideoUrl from "../../images/hero_bg.webm";
import flyFree2VideoUrl from "../../images/homeAndSplash/FlyFree2.webm";
import UsafeLogoRevealOne from "../../images/bg_vids/Copyofusafeapptrailer2.webm";
import trailerVideoUrl from "../../images/homeAndSplash/Copy of usafe app trailer 2.webm";
import logoMotionVideoUrl from "../../images/homeAndSplash/USafe logo 2.webm";

const usafeLandingContent = {
    meta: {
        title: "USafe | Safety-First Navigation",
        description: "USafe is a proactive AI safety and navigation platform with live risk awareness, safer routing, guardian monitoring, and emergency response tools."
    },
    sectionMedia: {
        hero: heroBgVideoUrl,
        problem: UsafeLogoRevealOne,
        "how-it-works": UsafeLogoRevealOne,
        vision: heroBgVideoUrl,
        "final-cta": heroBgVideoUrl,
        footer: heroBgVideoUrl
    },
    navigation: {
        links: [
            { label: "Home", href: "#hero" },
            { label: "How It Works", href: "how-it-works.html" },
            { label: "Team", href: "team.html" },
            { label: "Contact", href: "contact.html" }
        ],
        cta: { label: "Try USafe", href: "#final-cta" }
    },
    hero: {
        eyebrow: "PROACTIVE PERSONAL SAFETY",
        titlePrefix: "See the",
        title: "See the danger before it sees you.",
        description: "USafe predicts risky areas, guides safer routes, and keeps trusted guardians aware of your journey in real time.",
        primaryCta: { label: "Start Safer Journeys", href: "contact.html" },
        secondaryCta: { label: "See How It Works", href: "how-it-works.html" },
        trustLine: "Built for modern cities. Designed for real people.",
        stats: [],
        floatingCards: []
    },
    problem: {
        label: "WHY USAFE",
        title: "Safety Should Be Predictive. Not Reactive.",
        intro: "Most apps guide you. USafe protects you. Before, during, and after your journey.",
        stages: [
            {
                kicker: "Stage 1",
                label: "Awareness",
                title: "USafe detects risk before it becomes your problem.",
                text: "Live route context, anomaly signals, and neighborhood patterns surface early so users move with clarity instead of guesswork.",
                tone: "awareness",
                chips: ["Live risk signals", "Radar scan", "Context-aware alerts"],
                hudLabel: "Live Safety Layer",
                hudValue: "Awareness Engine"
            },
            {
                kicker: "Stage 2",
                label: "Prevention",
                title: "USafe steers people away from danger, not toward it.",
                text: "Safer route intelligence weighs risk, hotspots, and route changes in real time so the best path is the one that protects you.",
                tone: "prevention",
                chips: ["Safer route logic", "Heatmap prediction", "Decision support"],
                hudLabel: "Predictive Routing",
                hudValue: "Prevention Engine"
            },
            {
                kicker: "Stage 3",
                label: "Response",
                title: "When something changes, help is already in motion.",
                text: "Silent escalation, SOS triggers, and guardian coordination turn one moment of risk into an immediate support network.",
                tone: "response",
                chips: ["SOS pulse", "Silent emergency help", "Guardian sync"],
                hudLabel: "Emergency Network",
                hudValue: "Response Engine"
            }
        ]
    },
    howItWorks: {
        label: "How USafe Works",
        title: "A layered safety system that feels immediate, readable, and actionable.",
        intro: "Each core capability is designed to work alone and together, giving users a complete safety stack instead of a single panic feature.",
        features: [
            {
                icon: "fa-solid fa-shield-heart",
                title: "Real-Time Safety Score",
                description: "Continuous route scoring turns complex city signals into a simple confidence readout the user can understand at a glance.",
                href: "how-it-works.html#feature-real-time-safety-score"
            },
            {
                icon: "fa-solid fa-fire",
                title: "Risk Heatmap",
                description: "Dynamic hotspots show where caution is rising, helping users understand the shape of the environment around them.",
                href: "how-it-works.html#feature-risk-heatmap"
            },
            {
                icon: "fa-solid fa-route",
                title: "Smart Safe Navigation",
                description: "USafe suggests safer route options, not just faster ones, balancing movement, awareness, and risk reduction.",
                href: "how-it-works.html#feature-smart-safe-navigation"
            },
            {
                icon: "fa-solid fa-bell",
                title: "Emergency SOS",
                description: "One action can trigger alerts, location sharing, and coordinated support when speed matters most.",
                href: "how-it-works.html#feature-emergency-sos"
            },
            {
                icon: "fa-solid fa-phone-volume",
                title: "Silent Emergency Call",
                description: "When speaking is unsafe, discreet escalation tools preserve the chance to act without drawing attention.",
                href: "how-it-works.html#feature-silent-emergency-call"
            }
        ]
    },
    vision: {
        label: "Vision",
        title: "We believe safety should move with you, not follow behind you.",
        description: "Our vision is a world where safety is proactive, intelligence is calm, and every journey feels more in your control."
    },
    cta: {
        title: "Try the safety-first route experience people will actually trust.",
        description: "USafe combines proactive guidance, AI intelligence, and guardian support into one product designed for real-world movement.",
        primaryCta: { label: "Request Early Access", href: "contact.html" },
        secondaryCta: { label: "Explore Features", href: "how-it-works.html" }
    },
    footer: {
        columns: [
            {
                title: "Navigation",
                links: [
                    { label: "Home", href: "#hero" },
                    { label: "How It Works", href: "how-it-works.html" },
                    { label: "Team", href: "team.html" }
                ]
            },
            {
                title: "Features",
                links: [
                    { label: "Vision", href: "#vision" }
                ]
            },
            {
                title: "Company",
                links: [
                    { label: "Team", href: "team.html" },
                    { label: "Contact", href: "contact.html" },
                    { label: "How It Works", href: "how-it-works.html" }
                ]
            },
            {
                title: "Legal",
                links: [
                    { label: "Privacy Policy", href: "#" },
                    { label: "Terms", href: "#" }
                ]
            }
        ],
        socials: [
            { label: "YouTube", href: "https://youtu.be/Ihp_Uo9KIIQ?si=m24_tcEkq2BqvBkf", icon: "fa-brands fa-youtube" },
            { label: "LinkedIn", href: "https://www.linkedin.com/company/team-usafe/?viewAsMember=true", icon: "fa-brands fa-linkedin-in" },
            { label: "Instagram", href: "https://www.instagram.com/itsusafe/", icon: "fa-brands fa-instagram" }
        ],
        copyright: "(c) 2026 USafe. Safety-first navigation for modern cities."
    }
};

export default usafeLandingContent;



