import { initContactAnimations } from "./contact-animations.js";
import { initContactInteractions } from "./contact-interactions.js";
import { initSectionBackgroundVideos } from "./section-background-videos.js";

const contactSectionMedia = {
    hero: "images/bg_vids/vecteezy_cityscape-timelapse-at-night_2019801.mp4",
    paths: "images/bg_vids/vecteezy_global-network-medical-healthcare-system-protection-concept_4747818.mp4",
    main: "images/bg_vids/vecteezy_timelapse-of-road-traffic-or-public-transport-rush-hour_29873425.mp4",
    support: "images/bg_vids/vecteezy_global-network-medical-healthcare-system-protection-concept_4747818.mp4",
    cta: "images/bg_vids/vecteezy_timelapse-hong-kong-city_3362813.mp4"
};

const contactPageContent = {
    hero: {
        kicker: "Contact USafe",
        title: "Reach the team behind proactive safety",
        description: "Whether you need product details, support, collaboration information, or early access guidance, the USafe team is ready to respond directly.",
        primaryCta: { label: "Send a Message", href: "#contact-form" },
        secondaryCta: { label: "See How It Works", href: "how-it-works.html" },
        signalIntro: "A guided conversation path",
        signalTitle: "A calmer way to start the right conversation",
        signalText: "USafe helps route product questions, support needs, and partnership interest into a clearer next step without forcing every request into the same flow.",
        signalMeta: [
            { label: "Conversation paths", value: "Message, email, call" },
            { label: "Best for", value: "Product, support, partnerships" },
            { label: "Response style", value: "Direct team follow-up" }
        ]
    },
    paths: {
        kicker: "Contact Paths",
        title: "Choose how you want to reach USafe",
        items: [
            {
                id: "message",
                icon: "fa-regular fa-message",
                title: "Send a message",
                text: "Best for detailed questions and requests.",
                helper: "Start with a structured message and we will route it to the right person."
            },
            {
                id: "email",
                icon: "fa-regular fa-envelope",
                title: "Email directly",
                text: "Best for async conversations and resource requests.",
                helper: "Reach the team directly when you already know the conversation you need."
            },
            {
                id: "call",
                icon: "fa-solid fa-phone",
                title: "Call directly",
                text: "Best for quick discussions and urgent questions.",
                helper: "Use the direct phone line when the discussion is time-sensitive."
            }
        ]
    },
    form: {
        kicker: "Start with a message",
        title: "Tell us what you need",
        helper: "We'll route your message to the right person.",
        trustNote: "Messages are reviewed directly by the USafe team.",
        action: "https://formspree.io/f/xnjjdwdj"
    },
    direct: {
        kicker: "Direct Contact",
        title: "Reach the team directly",
        text: "If you already know the conversation you want to have, use the direct details below.",
        items: [
            { label: "Email", value: "teamusafe@gmail.com", href: "mailto:teamusafe@gmail.com" },
            { label: "Phone", value: "+94 77 249 2154", href: "tel:+94772492154" },
            { label: "Best for", value: "Product, support, partnerships" },
            { label: "Response", value: "Direct team follow-up" }
        ]
    },
    support: {
        kicker: "What You Can Reach Out About",
        title: "Common reasons people contact USafe",
        topics: [
            "Product questions and feature walkthroughs",
            "Partnership and collaboration opportunities",
            "Support requests and implementation feedback",
            "Early access and future release interest"
        ]
    },
    cta: {
        kicker: "Next Step",
        title: "Explore first, then reach out",
        text: "Explore the core safety experience first, then come back when you're ready to talk in more detail.",
        primaryCta: { label: "Explore How It Works", href: "how-it-works.html" },
        secondaryCta: { label: "Meet the Team", href: "team.html" }
    }
};

function renderSignalMeta(items) {
    return items.map(function (item) {
        return '<article><span>' + item.label + '</span><strong>' + item.value + '</strong></article>';
    }).join("");
}

function renderPathSelector(items) {
    return items.map(function (item, index) {
        var active = index === 0;
        return [
            '<button class="contact-path-option' + (active ? ' is-active' : '') + '" type="button" data-contact-path-option data-path-id="' + item.id + '" aria-pressed="' + String(active) + '">',
            '  <span class="contact-path-dot" aria-hidden="true"></span>',
            '  <span class="contact-path-label-group">',
            '    <span class="contact-path-label">' + item.title + '</span>',
            '    <span class="contact-path-helper">' + item.text + '</span>',
            '  </span>',
            '</button>'
        ].join("");
    }).join("");
}

function renderDirectItems(items) {
    return items.map(function (item) {
        var value = item.href ? '<a href="' + item.href + '">' + item.value + '</a>' : '<span>' + item.value + '</span>';
        return [
            '<div class="contact-direct-row">',
            '  <span class="contact-direct-label">' + item.label + '</span>',
            '  <strong class="contact-direct-value">' + value + '</strong>',
            '</div>'
        ].join("");
    }).join("");
}

function renderSupportTopics(topics) {
    return topics.map(function (topic, index) {
        return '<li data-contact-reveal data-contact-delay="' + String(index * 60) + '"><span>' + topic + '</span></li>';
    }).join("");
}

function renderMessagePanel(content) {
    return [
        '<div class="contact-panel-body is-active" data-contact-panel="message">',
        '  <span class="section-kicker">' + content.form.kicker + '</span>',
        '  <h2>' + content.form.title + '</h2>',
        '  <p class="section-helper">' + content.form.helper + '</p>',
        '  <form class="contact-form" action="' + content.form.action + '" method="POST" novalidate>',
        '    <div class="contact-form-grid">',
        '      <label class="field"><span>First Name</span><small>Tell us who we are speaking with.</small><input type="text" name="first_name" placeholder="Jane" required></label>',
        '      <label class="field"><span>Last Name</span><small>Use the name you want us to reply to.</small><input type="text" name="last_name" placeholder="Doe" required></label>',
        '      <label class="field field-full"><span>Email Address</span><small>We will respond here first.</small><input type="email" name="email" placeholder="you@example.com" required></label>',
        '      <label class="field field-full"><span>Phone Number</span><small>Optional, if a follow-up call helps.</small><input type="tel" name="phone" placeholder="+94 77 000 0000"></label>',
        '      <label class="field field-full"><span>Message</span><small>Share the context so we can route it well.</small><textarea name="message" rows="6" placeholder="Tell us what you are reaching out about." required></textarea></label>',
        '    </div>',
        '    <div class="contact-form-footer">',
        '      <p class="contact-trust-note">' + content.form.trustNote + '</p>',
        '      <button class="button button-primary contact-submit" type="submit">Send Message</button>',
        '    </div>',
        '  </form>',
        '</div>'
    ].join("");
}

function renderEmailPanel() {
    return [
        '<div class="contact-panel-body" data-contact-panel="email" hidden>',
        '  <span class="section-kicker">Email Directly</span>',
        '  <h2>Start an async conversation</h2>',
        '  <p class="section-helper">Send product questions, partnership context, or support details directly to the team inbox.</p>',
        '  <div class="contact-inline-action-group">',
        '    <div class="contact-inline-row">',
        '      <span>Email</span>',
        '      <strong><a href="mailto:teamusafe@gmail.com">teamusafe@gmail.com</a></strong>',
        '    </div>',
        '    <div class="contact-inline-row">',
        '      <span>Best for</span>',
        '      <strong>Detailed questions, resources, collaboration follow-up</strong>',
        '    </div>',
        '    <a class="button button-primary" href="mailto:teamusafe@gmail.com">Open Email</a>',
        '  </div>',
        '</div>'
    ].join("");
}

function renderCallPanel() {
    return [
        '<div class="contact-panel-body" data-contact-panel="call" hidden>',
        '  <span class="section-kicker">Call Directly</span>',
        '  <h2>Talk to the team faster</h2>',
        '  <p class="section-helper">Use the direct phone line when the conversation is urgent or a quick discussion is the clearest route.</p>',
        '  <div class="contact-inline-action-group">',
        '    <div class="contact-inline-row">',
        '      <span>Phone</span>',
        '      <strong><a href="tel:+94772492154">+94 77 249 2154</a></strong>',
        '    </div>',
        '    <div class="contact-inline-row">',
        '      <span>Best for</span>',
        '      <strong>Urgent questions, short calls, direct clarification</strong>',
        '    </div>',
        '    <a class="button button-primary" href="tel:+94772492154">Call Now</a>',
        '  </div>',
        '</div>'
    ].join("");
}

function renderPage(content) {
    return [
        '<div class="section-video-stage" aria-hidden="true">',
'  <video class="section-video-layer is-active" data-section-video-primary autoplay muted loop playsinline preload="auto"></video>',
'  <video class="section-video-layer" data-section-video-secondary autoplay muted loop playsinline preload="auto"></video>',
'  <div class="section-video-overlay"></div>',
'</div>',
'<section class="contact-section contact-hero" data-section-media-key="hero">',
        '  <div class="contact-section-backdrop contact-section-backdrop-hero" aria-hidden="true">',
        '    <div class="hero-grid"></div>',
        '    <div class="hero-glow hero-glow-a"></div>',
        '    <div class="hero-glow hero-glow-b"></div>',
        '  </div>',
        '  <div class="page-container contact-hero-layout">',
        '    <div class="contact-hero-copy" data-contact-reveal>',
        '      <span class="section-kicker">' + content.hero.kicker + '</span>',
        '      <h1>' + content.hero.title + '</h1>',
        '      <p>' + content.hero.description + '</p>',
        '      <div class="contact-actions">',
        '        <a class="button button-primary" href="' + content.hero.primaryCta.href + '">' + content.hero.primaryCta.label + '</a>',
        '        <a class="button button-secondary" href="' + content.hero.secondaryCta.href + '">' + content.hero.secondaryCta.label + '</a>',
        '      </div>',
        '    </div>',
        '    <div class="contact-hero-visual" data-contact-reveal data-contact-delay="140">',
        '      <div class="contact-signal-visual glass-panel">',
        '        <div class="contact-signal-orbit orbit-a"></div>',
        '        <div class="contact-signal-orbit orbit-b"></div>',
        '        <div class="contact-signal-route route-a"></div>',
        '        <div class="contact-signal-route route-b"></div>',
        '        <div class="contact-signal-route route-c"></div>',
        '        <div class="contact-signal-node node-a"></div>',
        '        <div class="contact-signal-node node-b"></div>',
        '        <div class="contact-signal-node node-c"></div>',
        '        <div class="contact-signal-copy">',
        '          <span class="contact-signal-badge">' + content.hero.signalIntro + '</span>',
        '          <h3>' + content.hero.signalTitle + '</h3>',
        '          <p>' + content.hero.signalText + '</p>',
        '        </div>',
        '        <div class="contact-signal-meta">' + renderSignalMeta(content.hero.signalMeta) + '</div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-paths" data-section-media-key="paths">',
        '  <div class="page-container">',
        '    <div class="section-heading" data-contact-reveal>',
        '      <span class="section-kicker">' + content.paths.kicker + '</span>',
        '      <h2>' + content.paths.title + '</h2>',
        '    </div>',
        '    <div class="contact-path-selector" data-contact-reveal data-contact-delay="80">' + renderPathSelector(content.paths.items) + '</div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-main" id="contact-form" data-section-media-key="main">',
        '  <div class="page-container contact-main-layout">',
        '    <div class="contact-form-panel glass-panel" data-contact-panel-stage data-contact-reveal>',
        '      <div class="contact-panel-shell">',
                 renderMessagePanel(content),
                 renderEmailPanel(),
                 renderCallPanel(),
        '      </div>',
        '    </div>',
        '    <aside class="contact-side-panel" data-contact-reveal data-contact-delay="120">',
        '      <div class="contact-direct-card">',
        '        <span class="section-kicker">' + content.direct.kicker + '</span>',
        '        <h2>' + content.direct.title + '</h2>',
        '        <p>' + content.direct.text + '</p>',
        '        <div class="contact-direct-list">' + renderDirectItems(content.direct.items) + '</div>',
        '      </div>',
        '      <div class="contact-editorial-panel">',
        '        <span class="section-kicker">' + content.support.kicker + '</span>',
        '        <h3>' + content.support.title + '</h3>',
        '        <p>Reach out when you need product clarity, support context, collaboration details, or a better sense of what comes next.</p>',
        '      </div>',
        '    </aside>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-support-strip" data-section-media-key="support">',
        '  <div class="page-container">',
        '    <div class="support-strip-panel" data-contact-reveal>',
        '      <span class="section-kicker">What You Can Reach Out About</span>',
        '      <div class="support-strip-chips">',
                 renderSupportTopics(content.support.topics),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-cta" data-section-media-key="cta">',
        '  <div class="page-container contact-cta-layout">',
        '    <div class="cta-copy" data-contact-reveal>',
        '      <span class="section-kicker">' + content.cta.kicker + '</span>',
        '      <h2>' + content.cta.title + '</h2>',
        '      <p>' + content.cta.text + '</p>',
        '      <div class="contact-actions">',
        '        <a class="button button-primary" href="' + content.cta.primaryCta.href + '">' + content.cta.primaryCta.label + '</a>',
        '        <a class="button button-secondary" href="' + content.cta.secondaryCta.href + '">' + content.cta.secondaryCta.label + '</a>',
        '      </div>',
        '    </div>',
        '    <div class="cta-visual" data-contact-reveal data-contact-delay="140">',
        '      <div class="cta-visual-shell">',
        '        <div class="cta-route cta-route-a"></div>',
        '        <div class="cta-route cta-route-b"></div>',
        '        <div class="cta-route cta-route-c"></div>',
        '        <div class="cta-node cta-node-a"></div>',
        '        <div class="cta-node cta-node-b"></div>',
        '        <div class="cta-node cta-node-c"></div>',
        '        <div class="cta-glow"></div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");
}

function initContactPage() {
    var root = document.getElementById("contact-root");
    if (!root) {
        return;
    }

    root.innerHTML = renderPage(contactPageContent);
    initSectionBackgroundVideos(contactSectionMedia, document);
    initContactAnimations(document);
    initContactInteractions(document);
}

initContactPage();


