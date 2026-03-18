import { initHowItWorksAnimations } from "./how-it-works-animations.js";
import { initHowItWorksParallax } from "./how-it-works-parallax.js";
import { initHowItWorksNodes } from "./how-it-works-nodes.js";
import { initHowItWorksScrollScenes } from "./how-it-works-scroll-scenes.js";
import { initLayeredSafetyStack } from "./layered-safety-stack.js";
import { initSectionBackgroundVideos } from "./section-background-videos.js";

const howItWorksSectionMedia = {
    hero: "images/bg_vids/Copyofusafeapptrailer2.webm",
    capabilities: "images/bg_vids/Copyofusafeapptrailer2.webm",
    confidence: "images/bg_vids/vecteezy_loop-red-emergency-flasher-with-volume-light-in-4k_40458312.webm",
    routing: "images/bg_vids/vecteezy_timelapse-of-road-traffic-or-public-transport-rush-hour_29873425.mp4",
    response: "images/bg_vids/vecteezy_glowing-red-sos-sign-in-neon-style-on-dark-background_60852295.webm",
    guardian: "images/bg_vids/855564-hd_1280_720_24fps.mp4",
    community: "images/bg_vids/855564-hd_1280_720_24fps.mp4",
    conclusion: "images/bg_vids/vecteezy_global-network-medical-healthcare-system-protection-concept_4747818.webm"
};

const howItWorksContent = {
    hero: {
        label: "HOW USAFE WORKS",
        title: "A Layered Safety system that Feels Immediate.",
        body: "Each core capability is designed to work alone and together, giving users a complete safety stack instead of a single panic feature.",
        primaryCta: { label: "Try USafe", href: "contact.html" },
        secondaryCta: { label: "Meet the Team", href: "team.html" },
        metricLabel: "Route confidence",
        metricValue: 82,
        routeChip: "Campus to home",
        stackLabel: "USAFE SAFETY STACK",
        liveLabel: "LIVE SYSTEM",
        stack: [
            { label: "Awareness", value: "Live risk signals" },
            { label: "Prevention", value: "Safer path selected" },
            { label: "Response", value: "Guardian support ready" }
        ]
    },
    capabilities: {
        label: "CORE CAPABILITIES",
        title: "The main feature panel behind the USafe experience.",
        body: "These capabilities are designed to interlock. Each one can help on its own, but together they turn navigation into a proactive safety product.",
        support: "Each feature will also have its own dedicated sub-page.",
        items: [
            {
                id: "feature-score",
                title: "Real-Time Safety Score",
                body: "USafe continuously evaluates route conditions and nearby safety signals to produce a live confidence score. Instead of reading multiple warnings separately, the user gets one clear measure of how safe the journey currently feels.",
                why: "It reduces cognitive load and helps the user make quick decisions at a glance.",
                icon: "fa-solid fa-gauge-high",
                cue: "confidence"
            },
            {
                id: "feature-heatmap",
                title: "Risk Heatmap",
                body: "The Risk Heatmap shows where caution may be rising based on local context, community reports, and surrounding activity. It helps users understand not just where they are, but how the environment around them is changing.",
                why: "It turns vague unease into visible context and helps users avoid emerging hotspots.",
                icon: "fa-solid fa-fire-flame-curved",
                cue: "heatmap"
            },
            {
                id: "feature-routing",
                title: "Smart Safe Navigation",
                body: "USafe does not only optimize for speed. It suggests route options that balance movement, awareness, visibility, and risk reduction, helping users choose paths that feel safer in real conditions.",
                why: "It gives users route confidence instead of just shorter ETAs.",
                icon: "fa-solid fa-route",
                cue: "routing"
            },
            {
                id: "feature-sos",
                title: "Emergency SOS",
                body: "When speed matters most, one action can trigger urgent alerts, location sharing, and coordinated emergency support. The system is designed to reduce delay and simplify escalation under pressure.",
                why: "It provides fast access to help during high-stakes situations.",
                icon: "fa-solid fa-bell",
                cue: "sos"
            },
            {
                id: "feature-silent-call",
                title: "Silent Emergency Call",
                body: "When speaking is unsafe or impossible, Silent Emergency Call gives users a discreet escalation path. It supports communication and action without requiring visible panic behavior.",
                why: "It preserves agency in situations where attention must not be drawn.",
                icon: "fa-solid fa-phone-volume",
                cue: "silent"
            }
        ]
    },
    scenes: [
        {
            label: "LIVE CONFIDENCE",
            title: "A safety score that helps users understand the moment at a glance.",
            body: "USafe brings live route context, nearby conditions, and surrounding signals into one readable confidence score. Instead of forcing the user to interpret scattered warnings, it delivers one clear readout that can support faster and calmer decisions.",
            bullets: [
                "Summarizes multiple route and context signals into one clear score",
                "Updates as movement, timing, and nearby conditions change",
                "Helps users notice when a journey feels less certain before risk escalates"
            ],
            tone: "confidence",
            microLabels: ["Confidence live", "Context read", "Route updated"]
        },
        {
            label: "SMART ROUTING",
            title: "Safer navigation starts with visibility, not just directions.",
            body: "USafe combines route planning with local awareness. The heatmap helps users understand where caution may be rising, while Smart Safe Navigation turns that context into route guidance that favors confidence, visibility, and safer decision-making over raw speed alone.",
            bullets: [
                "Highlights areas where caution may be increasing",
                "Helps users compare route options with safety in mind",
                "Turns awareness into better path selection"
            ],
            tone: "routing",
            microLabels: ["Heatmap live", "Safer branch", "Visibility favored"]
        },
        {
            label: "EMERGENCY RESPONSE",
            title: "Visible help when speed matters. Silent help when safety requires discretion.",
            body: "USafe supports two different escalation paths. Emergency SOS is built for urgent, visible support where immediate alerting and location sharing matter most. Silent Emergency Call is designed for moments when speaking is unsafe, helping the user escalate discreetly without drawing attention.",
            bullets: [
                "Emergency SOS coordinates urgent alerting and support",
                "Silent Emergency Call supports discreet escalation when voice is unsafe",
                "Together they cover both visible and low-profile emergency scenarios"
            ],
            tone: "response",
            microLabels: ["SOS ready", "Silent path", "Support dispatched"]
        }
    ],
    guardian: {
        label: "SAFEPATH GUARDIAN",
        title: "Checkpoint updates keep trusted contacts informed along the journey.",
        body: "SafePath Guardian helps users keep selected emergency contacts aware of their progress without requiring constant live tracking. Instead of a full monitoring portal, the system sends simple checkpoint updates when key locations are reached, making it easier to reassure trusted people during a journey.",
        bullets: [
            "Selected emergency contacts can be linked to the journey in advance",
            "Contacts receive a simple update when the user reaches a checkpoint",
            "The system reduces uncertainty without requiring live location sharing",
            "Checkpoint-based updates keep the experience lightweight and practical"
        ],
        checkpoints: [
            { label: "Journey linked", value: "Contacts selected" },
            { label: "Checkpoint reached", value: "Passed safely" },
            { label: "Arrival update", value: "Journey on track" }
        ],
        messages: [
            { eyebrow: "Trusted contact update", title: "Checkpoint reached", text: "Campus gate passed safely." },
            { eyebrow: "Progress message", title: "Journey progressing as expected", text: "Midpoint reached on schedule." },
            { eyebrow: "Reassurance", title: "Passed safely", text: "Trusted contacts informed without live tracking." }
        ],
        support: [
            { title: "Checkpoint Messages", text: "When a planned checkpoint is reached, USafe can notify selected contacts that the journey is progressing as expected." },
            { title: "Reassurance Without Overexposure", text: "The feature is designed to keep trusted people informed without turning the trip into a constant live-tracking session." },
            { title: "Lightweight Journey Updates", text: "Instead of requiring a separate portal or complex interface, the system focuses on simple and meaningful progress updates." },
            { title: "Trusted Contact Awareness", text: "By letting a small set of chosen contacts know that checkpoints were reached, the user can create a greater sense of confidence during travel." }
        ]
    },

    community: {
        label: "COMMUNITY REPORTING",
        title: "A safety network gets stronger when people can warn each other clearly.",
        body: "Community-powered reports help surface real local context fast, while the interface keeps signal quality readable instead of chaotic.",
        bullets: [
            "Citizens can flag hazards, suspicious activity, or blocked paths",
            "Reports strengthen local awareness for the next person entering the area",
            "The product balances human reports with system intelligence for better clarity"
        ],
        tags: [
            "Street lighting issue",
            "Unusual crowd activity",
            "Safer crossing available",
            "Blocked pedestrian path",
            "Guardian pickup point"
        ]
    },
    conclusion: {
        label: "THE FULL SYSTEM",
        title: "USafe works best as a safety layer, not just a tool.",
        body: "Each capability is valuable on its own, but the full experience comes from how awareness, guidance, trusted support, and intelligent escalation work together. That is what turns navigation into something calmer, smarter, and more prepared for the real world.",
        support: "Explore the product, meet the team, or experience the system in context.",
        primaryCta: { label: "Try USafe", href: "contact.html" },
        secondaryCta: { label: "Meet the Team", href: "team.html" }
    }
};

function renderBullets(items) {
    return items.map(function (item) {
        return '<li>' + item + '</li>';
    }).join("");
}

function getLayeredSafetyTone(item, index) {
    var label = String((item && item.label) || "").toLowerCase();
    if (label.indexOf("aware") !== -1) {
        return "awareness";
    }
    if (label.indexOf("prevent") !== -1) {
        return "prevention";
    }
    if (label.indexOf("response") !== -1) {
        return "response";
    }
    return ["awareness", "prevention", "response"][index] || "awareness";
}

function renderLayeredSafetyStack(items) {
    return [
        '<div class="layered-safety-stack" data-layered-safety-stack>',
        '  <div class="layered-safety-ambient" aria-hidden="true"></div>',
        '  <div class="layered-safety-tilt" data-layered-safety-stack-tilt>',
        '    <div class="layered-safety-stack-scene" data-layered-safety-stack-scene>',
        '      <div class="layered-safety-spine" aria-hidden="true"></div>',
        '      <div class="layered-safety-core" aria-hidden="true"></div>',
               items.map(function (item, index) {
                   var tone = getLayeredSafetyTone(item, index);
                   return [
                       '      <article class="layered-safety-card layered-safety-card-' + tone + '" data-layered-safety-card data-stack-slot="' + String(index) + '">',
                       '        <div class="layered-safety-card-body">',
                       '          <div class="layered-safety-card-topline">',
                       '            <span class="layered-safety-label">' + item.label + '</span>',
                       '            <span class="layered-safety-dot" aria-hidden="true"></span>',
                       '          </div>',
                       '          <strong>' + item.value + '</strong>',
                       '        </div>',
                       '      </article>'
                   ].join('');
               }).join(''),
        '    </div>',
        '  </div>',
        '</div>'
    ].join('');
}

function splitHeadingLines(title, preferredLines) {
    var words = String(title || "").trim().split(/\\s+/).filter(Boolean);
    var lineCount = Math.max(1, Math.min(preferredLines || 2, words.length));
    var lines = [];
    var start = 0;

    for (var i = 0; i < lineCount; i += 1) {
        var remainingWords = words.length - start;
        var remainingLines = lineCount - i;
        var take = Math.ceil(remainingWords / remainingLines);
        lines.push(words.slice(start, start + take).join(" "));
        start += take;
    }

    return lines;
}

function decorateHeadingLine(line) {
    return String(line || "").replace(/Immediate\./g, '<span class="hero-keyword-immediate" data-text="Immediate">Immediate</span>.');
}

function renderHeading(tagName, className, title, preferredLines) {
    var lines = splitHeadingLines(title, preferredLines).map(function (line, index) {
        return '<span class="heading-line" style="--line-index:' + String(index) + '"><span>' + decorateHeadingLine(line) + '</span></span>';
    }).join("");
    var classAttr = className ? ' class="' + className + '"' : '';
    return '<' + tagName + classAttr + ' data-how-heading aria-label="' + title + '">' + lines + '</' + tagName + '>';
}

function renderCapabilities(items) {
    return items.map(function (item, index) {
        return [
            '<article class="capability-card reveal" data-how-reveal data-how-delay="' + String(index * 90) + '" data-how-depth data-depth-strength="' + String(index + 1) + '">',
            '  <div class="capability-card-top">',
            '    <span class="capability-index">0' + String(index + 1) + '</span>',
            '    <div class="capability-icon"><i class="' + item.icon + '" aria-hidden="true"></i></div>',
            '  </div>',
            '  ' + renderHeading('h3', 'capability-heading', item.title, 2) + '',
            '  <p>' + item.body + '</p>',
            '  <div class="capability-why"><span>Why it matters</span><strong>' + item.why + '</strong></div>',
            '</article>'
        ].join("");
    }).join("");
}

function renderScene(scene, index) {
    var reverse = index % 2 === 1 ? ' product-scene-reverse' : '';
    return [
        '<section class="story-section product-scene' + reverse + '" data-scene-index="' + String(index) + '" data-section-media-key="' + scene.tone + '">',
        '  <div class="page-container product-scene-shell">',
        '    <div class="scene-copy reveal" data-how-reveal>',
        '      <span class="section-kicker">' + scene.label + '</span>',
        '      ' + renderHeading('h2', 'scene-heading', scene.title, 2) + '',
        '      <p>' + scene.body + '</p>',
        '      <ul class="scene-bullets">' + renderBullets(scene.bullets) + '</ul>',
        '    </div>',
        '    <div class="scene-visual reveal" data-how-reveal data-how-side="' + (reverse ? 'left' : 'right') + '" data-how-depth data-depth-strength="2">',
        '      <div class="scene-visual-shell scene-' + scene.tone + '">',
        '        <div class="scene-grid"></div>',
        '        <div class="scene-glow"></div>',
        '        <div class="scene-float-card scene-float-a"></div>',
        '        <div class="scene-float-card scene-float-b"></div>',
        '        <div class="scene-core">',
        '          <div class="scene-core-head">',
        '            <span>' + scene.label + '</span>',
        '            <strong>Live layer</strong>',
        '          </div>',
        '          <div class="scene-core-metric">',
        (scene.tone === 'confidence' ? '            <strong class="scene-score" data-score-target="82">0</strong>' : '            <strong>' + (scene.tone === 'routing' ? 'Safer route' : 'Support paths') + '</strong>'),
        '            <span>' + scene.microLabels[0] + '</span>',
        '          </div>',
        '          <div class="scene-micro-list">',
                    scene.microLabels.map(function (label) { return '<span>' + label + '</span>'; }).join(''),
        '          </div>',
        '        </div>',
        (scene.tone === 'confidence' ? [
        '        <div class="scene-ring-stack">',
        '          <div class="scene-ring ring-a"></div>',
        '          <div class="scene-ring ring-b"></div>',
        '          <div class="scene-ring ring-c"></div>',
        '        </div>'
        ].join('') : ''),
        (scene.tone === 'routing' ? [
        '        <div class="route-branch branch-main"></div>',
        '        <div class="route-branch branch-alt"></div>',
        '        <div class="route-hotspot hotspot-a"></div>',
        '        <div class="route-hotspot hotspot-b"></div>'
        ].join('') : ''),
        (scene.tone === 'response' ? [
        '        <div class="response-split response-sos">',
        '          <span>SOS</span><strong>Urgent alerting live</strong>',
        '        </div>',
        '        <div class="response-split response-silent">',
        '          <span>Silent call</span><strong>Discreet path active</strong>',
        '        </div>',
        '        <div class="response-wave wave-a"></div>',
        '        <div class="response-wave wave-b"></div>'
        ].join('') : ''),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");
}

function renderGuardianSupport(items) {
    return items.map(function (item) {
        return '<article class="guardian-support-card"><h3>' + item.title + '</h3><p>' + item.text + '</p></article>';
    }).join("");
}

function renderGuardianCheckpoints(items) {
    return items.map(function (item, index) {
        return [
            '<article class="guardian-checkpoint point-' + String(index + 1) + '">',
            '  <span class="guardian-checkpoint-dot" aria-hidden="true"></span>',
            '  <div class="guardian-checkpoint-copy"><span>' + item.label + '</span><strong>' + item.value + '</strong></div>',
            '</article>'
        ].join("");
    }).join("");
}

function renderGuardianMessages(items) {
    return items.map(function (item, index) {
        return [
            '<article class="guardian-message-card message-' + String(index + 1) + '">',
            '  <span class="guardian-message-eyebrow">' + item.eyebrow + '</span>',
            '  <strong>' + item.title + '</strong>',
            '  <p>' + item.text + '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderSignalTags(tags, className) {
    return tags.map(function (tag, index) {
        return '<span class="signal-tag ' + className + ' tag-' + String(index + 1) + '">' + tag + '</span>';
    }).join("");
}

function renderPage(content) {
    return [
        '<div class="section-video-stage" aria-hidden="true">',
        '  <video class="section-video-layer is-active" data-section-video-primary autoplay muted loop playsinline preload="auto"></video>',
        '  <video class="section-video-layer" data-section-video-secondary autoplay muted loop playsinline preload="auto"></video>',
        '  <div class="section-video-overlay"></div>',
        '</div>',
        '<section class="hero-block story-section" data-section-media-key="hero">',
        '  <div class="hero-backdrop" aria-hidden="true">',
        '    <div class="hero-grid"></div>',
        '    <div class="hero-glow hero-glow-a"></div>',
        '    <div class="hero-glow hero-glow-b"></div>',
        '  </div>',
        '  <div class="page-container hero-shell">',
        '    <div class="hero-copy reveal" data-how-reveal>',
        '      <span class="section-kicker">' + content.hero.label + '</span>',
        '      ' + renderHeading('h1', 'hero-heading', content.hero.title, 3) + '',
        '      <p>' + content.hero.body + '</p>',
        '      <div class="hero-actions reveal" data-how-reveal data-how-delay="120">',
        '        <a class="button button-primary" href="' + content.hero.primaryCta.href + '">' + content.hero.primaryCta.label + '</a>',
        '        <a class="button button-secondary" href="' + content.hero.secondaryCta.href + '">' + content.hero.secondaryCta.label + '</a>',
        '      </div>',
        '    </div>',
        '    <div class="hero-panel reveal" data-how-reveal data-how-side="right" data-how-delay="180">',
        '      <div class="hero-panel-shell hero-panel-shell-stack">',
        '        <div class="hero-stack-wrap reveal" data-how-reveal data-how-delay="220">',
        '          ' + renderLayeredSafetyStack(content.hero.stack) + '',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',

        '<section class="capability-section story-section" data-section-media-key="capabilities">',
        '  <div class="page-container capability-shell">',
        '    <div class="capability-copy reveal" data-how-reveal>',
        '      <span class="section-kicker">' + content.capabilities.label + '</span>',
        '      ' + renderHeading('h2', 'capability-heading-main', content.capabilities.title, 2) + '',
        '      <p>' + content.capabilities.body + '</p>',
        '      <p class="section-support">' + content.capabilities.support + '</p>',
        '    </div>',
        '    <div class="capability-rail">' + renderCapabilities(content.capabilities.items) + '</div>',
        '  </div>',
        '</section>',

        content.scenes.map(renderScene).join(''),

        '<section class="story-section guardian-section" data-section-media-key="guardian">',
        '  <div class="page-container guardian-shell">',
        '    <div class="guardian-copy reveal" data-how-reveal>',
        '      <span class="section-kicker">' + content.guardian.label + '</span>',
        '      ' + renderHeading('h2', 'guardian-heading', content.guardian.title, 2) + '',
        '      <p>' + content.guardian.body + '</p>',
        '      <ul class="scene-bullets">' + renderBullets(content.guardian.bullets) + '</ul>',
        '    </div>',
        '    <div class="guardian-visual reveal" data-how-reveal data-how-side="right" data-how-depth data-depth-strength="2">',
        '      <div class="guardian-journey-scene">',
        '        <div class="guardian-journey-head"><span>CHECKPOINT UPDATES</span><strong>Trusted contact reassurance</strong></div>',
        '        <div class="guardian-journey-map">',
        '          <div class="guardian-scene-glow" aria-hidden="true"></div>',
        '          <div class="guardian-route-line" aria-hidden="true"></div>',
        '          <div class="guardian-contact-ping" aria-hidden="true"></div>',
        '          ' + renderGuardianCheckpoints(content.guardian.checkpoints) + '',
        '        </div>',
        '        <div class="guardian-message-stack">' + renderGuardianMessages(content.guardian.messages) + '</div>',
        '      </div>',
        '      <div class="guardian-support-grid">' + renderGuardianSupport(content.guardian.support) + '</div>',
        '    </div>',
        '  </div>',
        '</section>',



        '<section class="story-section community-section" data-section-media-key="community">',
        '  <div class="page-container community-shell">',
        '    <div class="community-copy reveal" data-how-reveal>',
        '      <span class="section-kicker">' + content.community.label + '</span>',
        '      ' + renderHeading('h2', 'community-heading', content.community.title, 2) + '',
        '      <p>' + content.community.body + '</p>',
        '      <ul class="scene-bullets">' + renderBullets(content.community.bullets) + '</ul>',
        '    </div>',
        '    <div class="community-visual reveal" data-how-reveal data-how-side="right" data-how-depth data-depth-strength="2">',
        '      <div class="community-scene" data-node-scene="community">',
        '        <div class="community-grid"></div>',
        '        <div class="community-ripple ripple-a"></div>',
        '        <div class="community-ripple ripple-b"></div>',
        '        <div class="community-line line-a"></div>',
        '        <div class="community-line line-b"></div>',
                 renderSignalTags(content.community.tags, 'community-tag'),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',

        '<section class="story-section conclusion-section" data-section-media-key="conclusion">',
        '  <div class="page-container conclusion-shell reveal" data-how-reveal>',
        '    <div class="conclusion-copy">',
        '      <span class="section-kicker">' + content.conclusion.label + '</span>',
        '      ' + renderHeading('h2', 'conclusion-heading', content.conclusion.title, 2) + '',
        '      <p>' + content.conclusion.body + '</p>',
        '      <p class="section-support">' + content.conclusion.support + '</p>',
        '      <div class="hero-actions">',
        '        <a class="button button-primary" href="' + content.conclusion.primaryCta.href + '">' + content.conclusion.primaryCta.label + '</a>',
        '        <a class="button button-secondary" href="' + content.conclusion.secondaryCta.href + '">' + content.conclusion.secondaryCta.label + '</a>',
        '      </div>',
        '    </div>',
        '    <div class="conclusion-visual reveal" data-how-reveal data-how-side="right" data-how-delay="140" aria-hidden="true">',
        '      <div class="system-converge">',
        '        <div class="system-line system-line-a"></div>',
        '        <div class="system-line system-line-b"></div>',
        '        <div class="system-line system-line-c"></div>',
        '        <div class="system-node system-node-a"></div>',
        '        <div class="system-node system-node-b"></div>',
        '        <div class="system-node system-node-c"></div>',
        '        <div class="system-core">Full system active</div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");
}

function initHowItWorksPage() {
    var root = document.getElementById("how-it-works-root");
    if (!root) {
        return;
    }

    root.innerHTML = renderPage(howItWorksContent);
    initSectionBackgroundVideos(howItWorksSectionMedia, document);
    initHowItWorksAnimations(document);
    initHowItWorksParallax(document);
    initLayeredSafetyStack(document);
    initHowItWorksNodes(document);
    initHowItWorksScrollScenes(document);
}

initHowItWorksPage();













