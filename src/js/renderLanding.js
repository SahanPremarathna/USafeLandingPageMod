import logoUrl from "../../images/usafelogo.webp";
import heroPosterUrl from "../../images/pre_load_hero_bg.webp";
import heroWebmUrl from "../../images/hero_bg.webm";

var problemFallback = {
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
};

function getProblemContent(content) {
    var incoming = content && content.problem ? content.problem : {};
    return {
        label: incoming.label || problemFallback.label,
        title: incoming.title || problemFallback.title,
        intro: incoming.intro || problemFallback.intro,
        stages: Array.isArray(incoming.stages) && incoming.stages.length > 0 ? incoming.stages : problemFallback.stages
    };
}

function renderNavLinks(links) {
    return links.map(function (link) {
        return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
    }).join("");
}

function renderProblemChips(chips) {
    return (chips || []).map(function (chip) {
        return '<span class="problem-chip">' + chip + '</span>';
    }).join("");
}

function renderProblemStages(stages) {
    return stages.map(function (stage, index) {
        return [
            '<article class="problem-stage problem-stage-', stage.tone, '" data-problem-stage data-stage-index="', String(index), '">',
            '  <div class="problem-stage-shell">',
            '    <div class="problem-stage-copy">',
            '      <div class="problem-stage-meta">',
            '        <span class="card-kicker">', stage.kicker || ('Stage ' + String(index + 1)), '</span>',
            '        <span class="problem-stage-label">', stage.label || '', '</span>',
            '      </div>',
            '      <h3>', stage.title, '</h3>',
            '      <p>', stage.text, '</p>',
            '      <div class="problem-chip-list">', renderProblemChips(stage.chips), '</div>',
            '    </div>',
            '    <div class="problem-stage-visual" aria-hidden="true">',
            '      <div class="problem-visual-backdrop"></div>',
            '      <div class="problem-grid-plane"></div>',
            '      <div class="problem-scan problem-scan-a"></div>',
            '      <div class="problem-scan problem-scan-b"></div>',
            '      <div class="problem-route problem-route-main"></div>',
            '      <div class="problem-route problem-route-alt"></div>',
            '      <div class="problem-node problem-node-a"></div>',
            '      <div class="problem-node problem-node-b"></div>',
            '      <div class="problem-node problem-node-c"></div>',
            '      <div class="problem-hotspot problem-hotspot-a"></div>',
            '      <div class="problem-hotspot problem-hotspot-b"></div>',
            '      <div class="problem-orbit problem-orbit-a"></div>',
            '      <div class="problem-orbit problem-orbit-b"></div>',
            '      <div class="problem-alert-wave"></div>',
            '      <div class="problem-guardian-link"></div>',
            '      <div class="problem-status-beam"></div>',
            '      <div class="problem-scene-hud glass-panel">',
            '        <span>', stage.hudLabel || 'Safety Layer', '</span>',
            '        <strong>', stage.hudValue || 'USafe Engine', '</strong>',
            '      </div>',
            '    </div>',
            '  </div>',
            '</article>'
        ].join("");
    }).join("");
}

function renderFeatures(features) {
    return features.map(function (feature) {
        return [
            '<article class="feature-card glass-panel interactive-card" data-reveal>',
            '  <div class="feature-icon"><i class="', feature.icon, '" aria-hidden="true"></i></div>',
            '  <h3>', feature.title, '</h3>',
            '  <p>', feature.description, '</p>',
            feature.href ? '<a class="button button-secondary feature-card-action" href="' + feature.href + '">Learn More</a>' : '',
            '</article>'
        ].join("");
    }).join("");
}

function renderFooterColumns(columns) {
    return columns.map(function (column) {
        return [
            '<div class="footer-column">',
            '  <h3>', column.title, '</h3>',
            '  <ul>',
            column.links.map(function (link) {
                return '<li><a href="' + link.href + '">' + link.label + '</a></li>';
            }).join(""),
            '  </ul>',
            '</div>'
        ].join("");
    }).join("");
}

function renderSocials(socials) {
    return socials.map(function (social) {
        return [
            '<a href="', social.href, '" aria-label="', social.label, '">',
            '  <i class="', social.icon, '" aria-hidden="true"></i>',
            '</a>'
        ].join("");
    }).join("");
}

export function renderLanding(root, content) {
    var problem = getProblemContent(content);

    root.innerHTML = [
        '<div class="site-shell" data-page="home">',
        '  <div class="section-video-stage" aria-hidden="true">',
        '    <video class="section-video-layer is-active" data-section-video-primary autoplay muted loop playsinline preload="auto"></video>',
        '    <video class="section-video-layer" data-section-video-secondary autoplay muted loop playsinline preload="auto"></video>',
        '    <div class="section-video-overlay"></div>',
        '  </div>',
        '  <nav class="site-nav" id="site-nav">',
        '    <div class="container nav-inner">',
        '      <a class="brand-mark" href="#hero" aria-label="USafe Home">',
        '        <img src="', logoUrl, '" alt="USafe logo">',
        '        <span>USafe</span>',
        '      </a>',
        '      <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Open navigation">',
        '        <span></span><span></span><span></span>',
        '      </button>',
        '      <div class="nav-menu" id="nav-menu">',
        '        <ul class="nav-links">',
        renderNavLinks(content.navigation.links),
        '        </ul>',
        '        <a class="button button-primary nav-cta" href="', content.navigation.cta.href, '">', content.navigation.cta.label, '</a>',
        '      </div>',
        '    </div>',
        '  </nav>',
        '  <main class="page-root">',
        '    <section class="hero-section story-section" id="hero" data-section-media-key="hero">',
        '      <div class="hero-backdrop">',
        '        <video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="', heroPosterUrl, '">',
        '          <source src="', heroWebmUrl, '" type="video/webm">',
        '        </video>',
        '        <div class="hero-noise"></div>',
        '        <div class="hero-grid-overlay"></div>',
        '      </div>',
        '      <div class="container hero-shell" data-reveal>',
        '        <div class="hero-copy">',
        '          <span class="eyebrow">', content.hero.eyebrow, '</span>',
        '          <h1 class="hero-headline">',
        '            <span class="headline-pretext">', content.hero.titlePrefix || 'See the', '</span>',
        '            <span class="typed-line" data-typed-line aria-live="polite" aria-atomic="true">',
        '              <span class="typed-before" data-typed-before></span>',
        '              <span class="typed-highlight" data-typed-highlight></span>',
        '              <span class="typed-after" data-typed-after></span>',
        '            </span>',
        '          </h1>',
        '          <p class="hero-description">', content.hero.description, '</p>',
        '          <div class="hero-actions">',
        '            <a class="button button-primary" href="', content.hero.primaryCta.href, '">', content.hero.primaryCta.label, '</a>',
        '            <a class="button button-secondary" href="', content.hero.secondaryCta.href, '">', content.hero.secondaryCta.label, '</a>',
        '          </div>',
        '          <p class="trust-line">', content.hero.trustLine, '</p>',
        '        </div>',
        '        <div class="hero-visual hero-visual-phone" id="hero-visual">',
        '          <div class="mobile-showcase" data-mobile-showcase>',
        '            <div class="mobile-device-shell">',
        '              <div class="mobile-device">',
        '                <div class="mobile-device-notch"></div>',
        '                <div class="mobile-screen-wrap">',
        '                  <img class="mobile-screen" data-mobile-screen alt="USafe app preview" draggable="false">',
        '                  <div class="mobile-screen-reflection" aria-hidden="true"></div>',
        '                  <div class="mobile-screen-glow" aria-hidden="true"></div>',
        '                </div>',
        '              </div>',
        '              <div class="mobile-device-shadow" aria-hidden="true"></div>',
        '            </div>',
        '          </div>',
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section story-section" id="problem" data-section-media-key="problem">',        '      <div class="problem-story-shell">',
        '        <div class="problem-story-intro">',
        '          <span class="eyebrow">', problem.label, '</span>',
        '          <h2>', problem.title, '</h2>',
        '          <p>', problem.intro, '</p>',
        '        </div>',
        '        <div class="problem-stage-stack">',
        renderProblemStages(problem.stages),
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section story-section" id="how-it-works" data-section-media-key="how-it-works">',
        '      <div class="container section-header" data-reveal>',
        '        <span class="eyebrow">', content.howItWorks.label, '</span>',
        '        <h2>', content.howItWorks.title, '</h2>',
        '        <p>', content.howItWorks.intro, '</p>',
        '      </div>',
        '      <div class="container feature-grid">',
        renderFeatures(content.howItWorks.features),
        '      </div>',
        '    </section>',
        '    <section class="content-section vision-section story-section" id="vision" data-section-media-key="vision">',
        '      <div class="container">',
        '        <div class="vision-panel glass-panel" data-reveal>',
        '          <span class="eyebrow">', content.vision.label, '</span>',
        '          <h2>', content.vision.title, '</h2>',
        '          <p>', content.vision.description, '</p>',
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section cta-section story-section" id="final-cta" data-section-media-key="final-cta">',
        '      <div class="container">',
        '        <div class="cta-panel glass-panel" data-reveal>',
        '          <span class="eyebrow">Ready to Try USafe?</span>',
        '          <h2>', content.cta.title, '</h2>',
        '          <p>', content.cta.description, '</p>',
        '          <div class="hero-actions centered-actions">',
        '            <a class="button button-primary" href="', content.cta.primaryCta.href, '">', content.cta.primaryCta.label, '</a>',
        '            <a class="button button-secondary" href="', content.cta.secondaryCta.href, '">', content.cta.secondaryCta.label, '</a>',
        '          </div>',
        '        </div>',
        '      </div>',
        '    </section>',
        '  </main>',
        '  <footer class="site-footer" data-section-media-key="footer">',
        '    <div class="container footer-layout">',
        '      <div class="footer-brand">',
        '        <a class="brand-mark" href="#hero" aria-label="USafe Home">',
        '          <img src="', logoUrl, '" alt="USafe logo">',
        '          <span>USafe</span>',
        '        </a>',
        '        <p>Proactive AI-guided safety navigation built for real movement in real cities.</p>',
        '      </div>',
        '      <div class="footer-columns">',
        renderFooterColumns(content.footer.columns),
        '      </div>',
        '      <div class="footer-meta">',
        '        <p>', content.footer.copyright, '</p>',
        '        <div class="footer-socials">',
        renderSocials(content.footer.socials),
        '        </div>',
        '      </div>',
        '    </div>',
        '  </footer>',
        '</div>'
    ].join("");
}











