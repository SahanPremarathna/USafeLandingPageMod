import logoUrl from "../../images/final USafe logo.jpg";
import heroPosterUrl from "../../images/pre_load_hero_bg.webp";
import heroWebmUrl from "../../images/hero_bg.webm";

var problemFallback = {
    label: "WHY USAFE",
    title: "A safer route is only the beginning.",
    intro: "Scroll through how ordinary tools stop at directions, and how USafe expands into awareness, prevention, and response.",
    stages: [
        {
            title: "Most apps help you move.",
            text: "Directions, traffic, and arrival time - but little awareness of personal safety.",
            tone: "basic",
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
            title: "Protection, awareness, and response in one system.",
            text: "USafe combines real-time safety intelligence, reliable SOS, silent emergency help, and guardian monitoring into one proactive safety platform.",
            tone: "protect",
            kicker: "Stage 4"
        }
    ]
};

function getProblemContent(content) {
    var incoming = content && content.problem ? content.problem : {};
    return {
        label: incoming.label || problemFallback.label,
        title: incoming.title || problemFallback.title,
        intro: incoming.intro || problemFallback.intro,
        stages: Array.isArray(incoming.stages) && incoming.stages.length === 4 ? incoming.stages : problemFallback.stages
    };
}

function renderNavLinks(links) {
    return links.map(function (link) {
        return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
    }).join("");
}

function renderProblemDots(stages) {
    return stages.map(function (stage, index) {
        return '<button class="problem-dot" type="button" data-problem-dot data-stage-target="' + String(index) + '" aria-label="Go to Why USafe stage ' + String(index + 1) + '"></button>';
    }).join("");
}

function renderProblemStages(stages) {
    return stages.map(function (stage, index) {
        return [
            '<article class="problem-stage problem-stage-', stage.tone, '" data-problem-stage data-stage-index="', String(index), '">',
            '  <div class="problem-stage-copy">',
            '    <span class="card-kicker">', stage.kicker || ('Stage ' + String(index + 1)), '</span>',
            '    <h3>', stage.title, '</h3>',
            '    <p>', stage.text, '</p>',
            '  </div>',
            '  <div class="problem-stage-visual" aria-hidden="true">',
            '    <div class="problem-grid-plane"></div>',
            '    <div class="problem-glow problem-glow-a"></div>',
            '    <div class="problem-glow problem-glow-b"></div>',
            '    <div class="problem-route problem-route-main"></div>',
            '    <div class="problem-route problem-route-alt"></div>',
            '    <div class="problem-node problem-node-start"></div>',
            '    <div class="problem-node problem-node-end"></div>',
            '    <div class="problem-node problem-node-risk"></div>',
            '    <div class="problem-warning"></div>',
            '    <div class="problem-shield"></div>',
            '    <div class="problem-guardian-signal"></div>',
            '    <div class="problem-stage-card glass-panel">',
            '      <span>', index < 2 ? 'Ordinary tools' : 'USafe intelligence', '</span>',
            '      <strong>', stage.title, '</strong>',
            '      <p>', stage.text, '</p>',
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
            '</article>'
        ].join("");
    }).join("");
}

function renderGuardianPanels(panels) {
    return panels.map(function (panel) {
        return [
            '<article class="guardian-panel glass-panel interactive-card" data-reveal>',
            '  <h3>', panel.title, '</h3>',
            '  <p>', panel.text, '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderList(items) {
    return items.map(function (item) {
        return '<li>' + item + '</li>';
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
        '        <div class="hero-scene-canvas" id="hero-three-scene" aria-hidden="true"></div>',
        '      </div>',
        '      <div class="container hero-shell" data-reveal>',
        '        <div class="hero-copy">',
        '          <span class="eyebrow">', content.hero.eyebrow, '</span>',
        '          <h1>', content.hero.title, '</h1>',
        '          <p class="hero-description">', content.hero.description, '</p>',
        '          <div class="hero-actions">',
        '            <a class="button button-primary" href="', content.hero.primaryCta.href, '">', content.hero.primaryCta.label, '</a>',
        '            <a class="button button-secondary" href="', content.hero.secondaryCta.href, '">', content.hero.secondaryCta.label, '</a>',
        '          </div>',
        '          <p class="trust-line">', content.hero.trustLine, '</p>',
        '        </div>',
        '        <div class="hero-visual" id="hero-visual">',
        '          <div class="hero-map-stage">',
        '            <div class="hero-visual-glow"></div>',
        '            <div class="map-depth-layer map-depth-layer-a"></div>',
        '            <div class="map-route map-route-primary"></div>',
        '            <div class="map-route map-route-secondary"></div>',
        '            <div class="hero-signal hero-signal-a"></div>',
        '            <div class="node-pill node-pill-safe node-a">Safe Zone</div>',
        '            <div class="node-pill node-pill-danger node-c">Risk Shift</div>',
        '            <div class="dashboard-panel glass-panel" id="guardian-console-anchor">',
        '              <div class="dashboard-topline"><span>USafe City Intelligence</span><span>Live</span></div>',
        '              <div class="dashboard-score"><strong>82</strong><span>route confidence</span></div>',
        '              <div class="dashboard-route"><span>Campus to home</span><span>Safer path selected</span></div>',
        '              <div class="dashboard-progress"><span></span></div>',
        '            </div>',
        '          </div>',
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section story-section" id="problem" data-section-media-key="problem">',
        '      <div class="problem-ambient problem-ambient-a" aria-hidden="true"></div>',
        '      <div class="problem-ambient problem-ambient-b" aria-hidden="true"></div>',
        '      <div class="problem-story-shell">',
        '        <div class="problem-story-intro">',
        '          <span class="eyebrow">', problem.label, '</span>',
        '          <h2>', problem.title, '</h2>',
        '          <p>', problem.intro, '</p>',
        '        </div>',
        '        <div class="problem-pin-wrap">',
        '          <div class="problem-track" data-problem-track>',
        renderProblemStages(problem.stages),
        '          </div>',
        '          <div class="problem-dots" aria-label="Why USafe story pagination">',
        renderProblemDots(problem.stages),
        '          </div>',
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
        '    <section class="content-section story-section guardian-section" id="guardian" data-section-media-key="guardian">',
        '      <div class="container split-layout">',
        '        <div class="split-copy" data-reveal>',
        '          <span class="eyebrow">', content.guardian.label, '</span>',
        '          <h2>', content.guardian.title, '</h2>',
        '          <p>', content.guardian.description, '</p>',
        '          <ul class="signal-list">',
        renderList(content.guardian.capabilities),
        '          </ul>',
        '        </div>',
        '        <div class="guardian-visual" data-reveal>',
        '          <div class="guardian-console glass-panel" id="guardian-console">',
        '            <div class="guardian-console-head"><span>Guardian Dashboard</span><span>Secure Session</span></div>',
        '            <div class="guardian-console-body">',
        '              <div class="guardian-map-window">',
        '                <div class="guardian-map-glow"></div>',
        '                <div class="guardian-route"></div>',
        '                <div class="guardian-node guardian-node-primary"></div>',
        '                <div class="guardian-node guardian-node-secondary"></div>',
        '              </div>',
        '              <div class="guardian-feed">',
        '                <div class="feed-card"><span>Checkpoint</span><strong>Reached on time</strong></div>',
        '                <div class="feed-card"><span>Status</span><strong>Monitoring active</strong></div>',
        '                <div class="feed-card"><span>Protocol</span><strong>Instant action ready</strong></div>',
        '              </div>',
        '            </div>',
        '          </div>',
        '          <div class="guardian-panel-grid">',
        renderGuardianPanels(content.guardian.panels),
        '          </div>',
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section story-section" id="intelligence" data-section-media-key="intelligence">',
        '      <div class="container split-layout reverse-on-mobile">',
        '        <div class="intelligence-visual glass-panel interactive-card" data-reveal>',
        '          <div class="intelligence-core"></div>',
        '          <div class="intelligence-ring ring-one"></div>',
        '          <div class="intelligence-ring ring-two"></div>',
        '          <div class="intelligence-ring ring-three"></div>',
        '          <div class="intelligence-axis axis-x"></div>',
        '          <div class="intelligence-axis axis-y"></div>',
        '          <div class="intelligence-dot dot-a"></div>',
        '          <div class="intelligence-dot dot-b"></div>',
        '          <div class="intelligence-dot dot-c"></div>',
        '        </div>',
        '        <div class="split-copy" data-reveal>',
        '          <span class="eyebrow">', content.intelligence.label, '</span>',
        '          <h2>', content.intelligence.title, '</h2>',
        '          <p>', content.intelligence.description, '</p>',
        '          <ul class="signal-list">',
        renderList(content.intelligence.bullets),
        '          </ul>',
        '        </div>',
        '      </div>',
        '    </section>',
        '    <section class="content-section story-section" id="community" data-section-media-key="community">',
        '      <div class="container split-layout">',
        '        <div class="community-visual glass-panel interactive-card" data-reveal>',
        '          <div class="community-grid"></div>',
        '          <div class="community-report report-a"><span>Street lighting issue</span></div>',
        '          <div class="community-report report-b"><span>Unusual crowd activity</span></div>',
        '          <div class="community-report report-c"><span>Safer crossing available</span></div>',
        '        </div>',
        '        <div class="split-copy" data-reveal>',
        '          <span class="eyebrow">', content.community.label, '</span>',
        '          <h2>', content.community.title, '</h2>',
        '          <p>', content.community.description, '</p>',
        '          <ul class="signal-list">',
        renderList(content.community.bullets),
        '          </ul>',
        '        </div>',
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
