import heroBgVideoUrl from "../../images/hero_bg.webm";
import flyFree2VideoUrl from "../../images/homeAndSplash/FlyFree2.webm";
import flyFree3VideoUrl from "../../images/homeAndSplash/FlyFree3.webm";
import trailerVideoUrl from "../../images/homeAndSplash/Copy of usafe app trailer 2.webm";
import logoMotionVideoUrl from "../../images/homeAndSplash/USafe logo 2.webm";

const usafeLandingContent = {
    meta: {
        title: "USafe | Safety-First Navigation",
        description: "USafe is a proactive AI safety and navigation platform with live risk awareness, safer routing, guardian monitoring, and emergency response tools."
    },
    sectionMedia: {
        hero: heroBgVideoUrl,
        problem: flyFree2VideoUrl,
        "how-it-works": flyFree3VideoUrl,
        guardian: trailerVideoUrl,
        intelligence: flyFree3VideoUrl,
        community: flyFree2VideoUrl,
        vision: logoMotionVideoUrl,
        "final-cta": trailerVideoUrl,
        footer: heroBgVideoUrl
    },
    navigation: {
        links: [
            { label: "Home", href: "#hero" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Guardian", href: "#guardian" },
            { label: "Community", href: "#community" },
            { label: "Contact", href: "contact.html" }
        ],
        cta: { label: "Try USafe", href: "#final-cta" }
    },
    hero: {
        eyebrow: "PROACTIVE PERSONAL SAFETY",
        titlePrefix: "See the",
        title: "See the danger before it sees you.",
        description: "USafe predicts risky areas, guides safer routes, and keeps trusted guardians aware of your journey in real time.",
        primaryCta: { label: "Start Safer Journeys", href: "#final-cta" },
        secondaryCta: { label: "See How It Works", href: "#how-it-works" },
        trustLine: "Built for modern cities. Designed for real people.",
        stats: [],
        floatingCards: []
    },
    problem: {
        label: "WHY USAFE",
        title: "Because Safety Shouldn't Be Reactive",
        intro: "Scroll through how ordinary tools stop at directions, and how USafe expands into awareness, prevention, and response.",
        stages: [
            {
                title: "Protection, awareness, and response in one system.",
                text: "USafe combines real-time safety intelligence, reliable SOS, silent emergency help, and guardian monitoring into one proactive safety platform.",
                tone: "protect",
                kicker: "Stage 1"
            },
            {
                title: "The risk is left to you.",
                text: "Traditional tools stop at directions and leave critical safety decisions entirely to the user.",
                tone: "risk",
                kicker: "Stage 2"
            },
            {
                title: "USafe sees more than the route.",
                text: "USafe detects live risk, surfaces safer alternatives, and helps users move with more awareness.",
                tone: "aware",
                kicker: "Stage 3"
            },
            {
                title: "Most apps help you move.",
                text: "Directions, traffic, and arrival time ? but little awareness of personal safety.",
                tone: "basic",
                kicker: "Stage 4"
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
                description: "Continuous route scoring turns complex city signals into a simple confidence readout the user can understand at a glance."
            },
            {
                icon: "fa-solid fa-fire",
                title: "Risk Heatmap",
                description: "Dynamic hotspots show where caution is rising, helping users understand the shape of the environment around them."
            },
            {
                icon: "fa-solid fa-route",
                title: "Smart Safe Navigation",
                description: "USafe suggests safer route options, not just faster ones, balancing movement, awareness, and risk reduction."
            },
            {
                icon: "fa-solid fa-bell",
                title: "Emergency SOS",
                description: "One action can trigger alerts, location sharing, and coordinated support when speed matters most."
            },
            {
                icon: "fa-solid fa-phone-volume",
                title: "Silent Emergency Call",
                description: "When speaking is unsafe, discreet escalation tools preserve the chance to act without drawing attention."
            }
        ]
    },
    guardian: {
        label: "SafePath Guardian",
        title: "Guardian mode turns trusted people into a coordinated safety network.",
        description: "SafePath Guardian gives selected contacts a secure browser-based dashboard with live journey visibility, checkpoint progress, and action-ready emergency status.",
        capabilities: [
            "Trusted contacts join through a secure live link",
            "Browser dashboard shows route, status, and last known context",
            "Checkpoint updates confirm progress without friction",
            "Instant action protocol activates when the journey goes off track"
        ],
        panels: [
            { title: "Secure Link", text: "Guardian access opens in seconds without app installation friction." },
            { title: "Live Monitoring", text: "Contacts see movement, delays, and escalations from one focused dashboard." },
            { title: "Checkpoint Updates", text: "Routine check-ins reduce uncertainty during higher-risk travel windows." },
            { title: "Action Protocol", text: "When the system detects a serious break in pattern, support can move immediately." }
        ]
    },
    intelligence: {
        label: "AI Safety Intelligence",
        title: "Predictive safety intelligence built to notice patterns people miss.",
        description: "USafe combines route context, user movement, and evolving local signals to anticipate risk earlier and support calmer decisions under pressure.",
        bullets: [
            "Learns from route changes, environmental context, and anomaly signals",
            "Turns raw safety data into proactive guidance instead of static information",
            "Supports future-ready city safety workflows with explainable UI cues"
        ]
    },
    community: {
        label: "Community Reporting",
        title: "A safety network gets stronger when people can warn each other clearly.",
        description: "Community-powered reports help surface real local context fast, while the interface keeps signal quality readable instead of chaotic.",
        bullets: [
            "Citizens can flag hazards, suspicious activity, or blocked paths",
            "Reports strengthen local awareness for the next person entering the area",
            "The product balances human reports with system intelligence for better clarity"
        ]
    },
    vision: {
        label: "Vision",
        title: "We believe navigation should feel protective, not indifferent.",
        description: "USafe is building toward a future where movement through cities comes with live confidence, intelligent support, and a stronger sense of control."
    },
    cta: {
        title: "Try the safety-first route experience people will actually trust.",
        description: "USafe combines proactive guidance, AI intelligence, and guardian support into one product designed for real-world movement.",
        primaryCta: { label: "Request Early Access", href: "contact.html" },
        secondaryCta: { label: "Explore Features", href: "features.html" }
    },
    footer: {
        columns: [
            {
                title: "Navigation",
                links: [
                    { label: "Home", href: "#hero" },
                    { label: "How It Works", href: "#how-it-works" },
                    { label: "Guardian", href: "#guardian" }
                ]
            },
            {
                title: "Features",
                links: [
                    { label: "AI Safety Intelligence", href: "#intelligence" },
                    { label: "Community Reporting", href: "#community" },
                    { label: "Vision", href: "#vision" }
                ]
            },
            {
                title: "Company",
                links: [
                    { label: "Contact", href: "contact.html" },
                    { label: "How It Works", href: "how-it-works.html" },
                    { label: "Guardian", href: "#guardian" }
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
            { label: "YouTube", href: "#", icon: "fa-brands fa-youtube" },
            { label: "GitHub", href: "#", icon: "fa-brands fa-github" },
            { label: "LinkedIn", href: "https://www.linkedin.com/company/team-usafe/?viewAsMember=true", icon: "fa-brands fa-linkedin-in" }
        ],
        copyright: "(c) 2026 USafe. Safety-first navigation for modern cities."
    }
};

export default usafeLandingContent;





