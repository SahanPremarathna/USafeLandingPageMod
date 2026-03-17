import { initContactAnimations } from "./contact-animations.js";
import { initContactInteractions } from "./contact-interactions.js";

const contactPageContent = {
    hero: {
        kicker: "Contact USafe",
        title: "Reach the team behind proactive safety",
        description: "Whether you need product details, support, collaboration information, or early access guidance, the USafe team is ready to respond directly.",
        primaryCta: { label: "Send a Message", href: "#contact-form" },
        secondaryCta: { label: "See How It Works", href: "how-it-works.html" },
        signalCards: [
            {
                title: "Direct team access",
                text: "Best for product conversations, implementation questions, and thoughtful feedback.",
                badge: "Conversation"
            },
            {
                title: "Support and partnerships",
                text: "Reach the right people for collaboration, support requests, or early access discussions.",
                badge: "Routing"
            },
            {
                title: "Clear next steps",
                text: "Messages are reviewed by the team with a bias toward calm, useful responses.",
                badge: "Trust"
            }
        ],
        contactSignal: [
            { label: "Best for", value: "Support, partnerships, early access" },
            { label: "Typical reply", value: "Direct team follow-up" },
            { label: "Format", value: "Message, email, or call" }
        ]
    },
    paths: {
        kicker: "Contact Paths",
        title: "Choose the path that fits the conversation",
        items: [
            {
                icon: "fa-regular fa-message",
                title: "Send a message",
                text: "Best for detailed questions and requests.",
                href: "#contact-form"
            },
            {
                icon: "fa-regular fa-envelope",
                title: "Email directly",
                text: "Best for async conversations and resources.",
                href: "mailto:teamusafe@gmail.com"
            },
            {
                icon: "fa-solid fa-phone",
                title: "Call directly",
                text: "Best for quick discussions and urgent questions.",
                href: "tel:+94772492154"
            }
        ]
    },
    form: {
        kicker: "Start with a message",
        title: "Tell us what you need",
        helper: "We'll route your message to the right person as quickly as possible.",
        trustNote: "Messages are reviewed directly by the USafe team.",
        action: "https://formspree.io/f/xnjjdwdj"
    },
    direct: {
        kicker: "Direct Contact",
        title: "Reach the team in the way that feels easiest",
        text: "Use direct details when you already know the conversation you want to have.",
        items: [
            { icon: "fa-solid fa-envelope", label: "Email", value: "teamusafe@gmail.com", href: "mailto:teamusafe@gmail.com" },
            { icon: "fa-solid fa-phone", label: "Phone", value: "+94 77 249 2154", href: "tel:+94772492154" },
            { icon: "fa-solid fa-layer-group", label: "Best for", value: "Product, support, partnerships" },
            { icon: "fa-regular fa-clock", label: "Response", value: "Direct team follow-up" }
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

function renderSignalCards(cards) {
    return cards.map(function (card, index) {
        return [
            '<article class="contact-signal-card" data-contact-depth="' + String(index + 1) + '" data-contact-reveal data-contact-delay="' + String(index * 70) + '">',
            '  <span class="contact-signal-badge">' + card.badge + '</span>',
            '  <h3>' + card.title + '</h3>',
            '  <p>' + card.text + '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderSignalMeta(items) {
    return items.map(function (item) {
        return '<article><span>' + item.label + '</span><strong>' + item.value + '</strong></article>';
    }).join("");
}

function renderPathCards(items) {
    return items.map(function (item, index) {
        return [
            '<a class="contact-path-card" href="' + item.href + '" data-contact-reveal data-contact-delay="' + String(index * 80) + '">',
            '  <div class="contact-path-icon"><i class="' + item.icon + '" aria-hidden="true"></i></div>',
            '  <div class="contact-path-copy">',
            '    <h3>' + item.title + '</h3>',
            '    <p>' + item.text + '</p>',
            '  </div>',
            '</a>'
        ].join("");
    }).join("");
}

function renderDirectItems(items) {
    return items.map(function (item) {
        var value = item.href ? '<a href="' + item.href + '">' + item.value + '</a>' : '<span>' + item.value + '</span>';
        return [
            '<article class="contact-direct-row">',
            '  <div class="contact-direct-icon"><i class="' + item.icon + '" aria-hidden="true"></i></div>',
            '  <div class="contact-direct-copy">',
            '    <span>' + item.label + '</span>',
            '    <strong>' + value + '</strong>',
            '  </div>',
            '</article>'
        ].join("");
    }).join("");
}

function renderSupportTopics(topics) {
    return topics.map(function (topic) {
        return '<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>' + topic + '</span></li>';
    }).join("");
}

function renderPage(content) {
    return [
        '<section class="contact-section contact-hero">',
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
        '    <div class="contact-hero-visual" data-contact-depth-wrap>',
        '      <div class="contact-signal-stack">' + renderSignalCards(content.hero.signalCards) + '</div>',
        '      <div class="contact-signal-panel glass-panel" data-contact-reveal data-contact-delay="220">',
        '        <div class="contact-signal-head"><span>Contact Signal</span><strong>Conversation Ready</strong></div>',
        '        <div class="contact-signal-meta">' + renderSignalMeta(content.hero.contactSignal) + '</div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-paths">',
        '  <div class="page-container">',
        '    <div class="section-heading" data-contact-reveal>',
        '      <span class="section-kicker">' + content.paths.kicker + '</span>',
        '      <h2>' + content.paths.title + '</h2>',
        '    </div>',
        '    <div class="contact-path-grid">' + renderPathCards(content.paths.items) + '</div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-main" id="contact-form">',
        '  <div class="page-container contact-main-layout">',
        '    <div class="contact-form-panel glass-panel" data-contact-reveal>',
        '      <span class="section-kicker">' + content.form.kicker + '</span>',
        '      <h2>' + content.form.title + '</h2>',
        '      <p class="section-helper">' + content.form.helper + '</p>',
        '      <form class="contact-form" action="' + content.form.action + '" method="POST" novalidate>',
        '        <div class="contact-form-grid">',
        '          <label class="field"><span>First Name</span><input type="text" name="first_name" placeholder="Jane" required></label>',
        '          <label class="field"><span>Last Name</span><input type="text" name="last_name" placeholder="Doe" required></label>',
        '          <label class="field field-full"><span>Email Address</span><input type="email" name="email" placeholder="you@example.com" required></label>',
        '          <label class="field field-full"><span>Phone Number</span><input type="tel" name="phone" placeholder="+94 77 000 0000"></label>',
        '          <label class="field field-full"><span>Message</span><textarea name="message" rows="6" placeholder="Tell us what you are reaching out about." required></textarea></label>',
        '        </div>',
        '        <div class="contact-form-footer">',
        '          <p class="contact-trust-note">' + content.form.trustNote + '</p>',
        '          <button class="button button-primary contact-submit" type="submit">Send Message</button>',
        '        </div>',
        '      </form>',
        '    </div>',
        '    <aside class="contact-side-panel" data-contact-reveal data-contact-delay="120">',
        '      <div class="contact-direct-card glass-panel">',
        '        <span class="section-kicker">' + content.direct.kicker + '</span>',
        '        <h2>' + content.direct.title + '</h2>',
        '        <p>' + content.direct.text + '</p>',
        '        <div class="contact-direct-list">' + renderDirectItems(content.direct.items) + '</div>',
        '      </div>',
        '      <div class="contact-editorial-panel">',
        '        <span class="section-kicker">' + content.support.kicker + '</span>',
        '        <h3>' + content.support.title + '</h3>',
        '        <ul class="contact-topic-list">' + renderSupportTopics(content.support.topics) + '</ul>',
        '      </div>',
        '    </aside>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-support-strip">',
        '  <div class="page-container">',
        '    <div class="support-strip-panel" data-contact-reveal>',
        '      <span class="section-kicker">What You Can Reach Out About</span>',
        '      <div class="support-strip-chips">',
        content.support.topics.map(function (topic) { return '<span>' + topic + '</span>'; }).join(''),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section class="contact-section contact-cta">',
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
        '        <div class="cta-node cta-node-a"></div>',
        '        <div class="cta-node cta-node-b"></div>',
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
    initContactAnimations(document);
    initContactInteractions(document);
}

initContactPage();
