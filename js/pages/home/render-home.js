function renderStats(stats) {
    return stats.map(function (stat) {
        return [
            '<div class="hero-stat glass-panel reveal" data-reveal-delay="', stat.revealDelay || "0", 'ms">',
            '  <strong>', stat.value, '</strong>',
            '  <span>', stat.label, '</span>',
            '</div>'
        ].join("");
    }).join("");
}

function renderHeroCards(cards) {
    return cards.map(function (card, index) {
        return [
            '<article class="hero-floating-card glass-panel js-tilt reveal" data-reveal-delay="', String(140 + index * 90), 'ms">',
            '  <span class="panel-kicker">', card.title, '</span>',
            '  <p>', card.body, '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderComparisonColumn(column, variant) {
    return [
        '<article class="comparison-column comparison-column-', variant, ' glass-panel reveal">',
        '  <h3>', column.title, '</h3>',
        '  <ul class="comparison-list">',
        column.points.map(function (point) {
            return '<li>' + point + '</li>';
        }).join(""),
        '  </ul>',
        '</article>'
    ].join("");
}

function renderFeatureCards(features) {
    return features.map(function (feature, index) {
        return [
            '<article class="feature-card glass-panel js-tilt reveal" data-reveal-delay="', String(index * 70), 'ms">',
            '  <div class="feature-icon"><i class="', feature.icon, '" aria-hidden="true"></i></div>',
            '  <h3>', feature.title, '</h3>',
            '  <p>', feature.description, '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderPanelCards(panels) {
    return panels.map(function (panel, index) {
        return [
            '<article class="guardian-panel glass-panel js-tilt reveal" data-reveal-delay="', String(index * 80), 'ms">',
            '  <h3>', panel.title, '</h3>',
            '  <p>', panel.text, '</p>',
            '</article>'
        ].join("");
    }).join("");
}

function renderBulletList(items) {
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
    return socials.map(function (item) {
        return [
            '<a href="', item.href, '" aria-label="', item.label, '">',
            '  <i class="', item.icon, '" aria-hidden="true"></i>',
            '</a>'
        ].join("");
    }).join("");
}

export function renderHomePage(options) {
    var content = options.content;
    var homeRoot = options.homeRoot;
    var footerRoot = options.footerRoot;

    homeRoot.innerHTML = [
        '<section id="hero" class="landing-hero section-depth-anchor">',
        '  <div class="hero-background">',
        '    <video autoplay muted loop playsinline preload="metadata" poster="images/homeAndSplash/pre_load_hero_bg.webp" class="hero-video">',
        '      <source src="images/homeAndSplash/hero_bg.webm" type="video/webm">',
        '      <source src="images/hero_bg.mp4" type="video/mp4">',
        '    </video>',
        '    <div class="hero-grid"></div>',
        '    <div class="hero-gradient-orb orb-a"></div>',
        '    <div class="hero-gradient-orb orb-b"></div>',
        '  </div>',
        '  <div class="section-container hero-shell">',
        '    <div class="hero-copy reveal">',
        '      <span class="section-kicker">', content.hero.eyebrow, '</span>',
        '      <h1>', content.hero.title, '</h1>',
        '      <p class="hero-description">', content.hero.description, '</p>',
        '      <div class="hero-actions">',
        '        <a class="landing-btn landing-btn-primary" href="', content.hero.primaryCta.href, '">', content.hero.primaryCta.label, '</a>',
        '        <a class="landing-btn landing-btn-secondary" href="', content.hero.secondaryCta.href, '">', content.hero.secondaryCta.label, '</a>',
        '      </div>',
        '      <p class="hero-trust-line">', content.hero.trustLine, '</p>',
        '      <div class="hero-stats">',
        renderStats(content.hero.stats),
        '      </div>',
        '    </div>',
        '    <div class="hero-visual reveal" data-depth-scope>',
        '      <div class="hero-map-stage">',
        '        <div class="city-grid-layer" data-depth="18"></div>',
        '        <div class="city-grid-layer city-grid-layer-secondary" data-depth="30"></div>',
        '        <div class="route-line route-line-a" data-depth="24"></div>',
        '        <div class="route-line route-line-b" data-depth="32"></div>',
        '        <div class="radar-sweep" data-depth="16"></div>',
        '        <div class="map-node safe-node node-a" data-depth="26"><span>Safe</span></div>',
        '        <div class="map-node safe-node node-b" data-depth="20"><span>Clear</span></div>',
        '        <div class="map-node danger-node node-c" data-depth="36"><span>Risk</span></div>',
        '        <div class="hero-dashboard glass-panel" data-depth="10">',
        '          <div class="dashboard-topline">',
        '            <span>USafe City Intelligence</span>',
        '            <span>Live</span>',
        '          </div>',
        '          <div class="dashboard-score">',
        '            <strong>82</strong>',
        '            <span>route confidence</span>',
        '          </div>',
        '          <div class="dashboard-route">',
        '            <span>Campus to home</span>',
        '            <span>Safer path selected</span>',
        '          </div>',
        '        </div>',
        renderHeroCards(content.hero.floatingCards),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.problem.id, '" class="landing-section problem-section section-depth-anchor reveal">',
        '  <div class="section-container">',
        '    <div class="section-heading">',
        '      <span class="section-kicker">', content.problem.label, '</span>',
        '      <h2>', content.problem.title, '</h2>',
        '      <p>', content.problem.intro, '</p>',
        '    </div>',
        '    <div class="comparison-grid">',
        renderComparisonColumn(content.problem.comparison[0], "default"),
        renderComparisonColumn(content.problem.comparison[1], "usafe"),
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.howItWorks.id, '" class="landing-section how-it-works-section section-depth-anchor">',
        '  <div class="section-container">',
        '    <div class="section-heading reveal">',
        '      <span class="section-kicker">', content.howItWorks.label, '</span>',
        '      <h2>', content.howItWorks.title, '</h2>',
        '      <p>', content.howItWorks.intro, '</p>',
        '    </div>',
        '    <div class="feature-grid">',
        renderFeatureCards(content.howItWorks.features),
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.guardian.id, '" class="landing-section guardian-section section-depth-anchor">',
        '  <div class="section-container guardian-shell">',
        '    <div class="guardian-copy reveal">',
        '      <span class="section-kicker">', content.guardian.label, '</span>',
        '      <h2>', content.guardian.title, '</h2>',
        '      <p>', content.guardian.description, '</p>',
        '      <ul class="signal-list">',
        renderBulletList(content.guardian.capabilities),
        '      </ul>',
        '    </div>',
        '    <div class="guardian-visual reveal" data-depth-scope>',
        '      <div class="guardian-console glass-panel" data-depth="10">',
        '        <div class="guardian-console-header">',
        '          <span>Guardian Dashboard</span>',
        '          <span>Secure Session</span>',
        '        </div>',
        '        <div class="guardian-console-body">',
        '          <div class="guardian-map-window">',
        '            <div class="guardian-map-glow"></div>',
        '            <div class="guardian-route"></div>',
        '            <div class="guardian-node guardian-node-primary"></div>',
        '            <div class="guardian-node guardian-node-secondary"></div>',
        '          </div>',
        '          <div class="guardian-feed">',
        '            <div class="feed-item"><span>Checkpoint</span><strong>Reached on time</strong></div>',
        '            <div class="feed-item"><span>Status</span><strong>Monitoring active</strong></div>',
        '            <div class="feed-item"><span>Protocol</span><strong>Instant action ready</strong></div>',
        '          </div>',
        '        </div>',
        '      </div>',
        '      <div class="guardian-panels">',
        renderPanelCards(content.guardian.panels),
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.intelligence.id, '" class="landing-section intelligence-section section-depth-anchor reveal">',
        '  <div class="section-container split-section">',
        '    <div class="split-copy">',
        '      <span class="section-kicker">', content.intelligence.label, '</span>',
        '      <h2>', content.intelligence.title, '</h2>',
        '      <p>', content.intelligence.description, '</p>',
        '      <ul class="signal-list">',
        renderBulletList(content.intelligence.bullets),
        '      </ul>',
        '    </div>',
        '    <div class="intelligence-visual glass-panel js-tilt">',
        '      <div class="intelligence-core"></div>',
        '      <div class="intelligence-ring ring-one"></div>',
        '      <div class="intelligence-ring ring-two"></div>',
        '      <div class="intelligence-ring ring-three"></div>',
        '      <div class="intelligence-axis axis-x"></div>',
        '      <div class="intelligence-axis axis-y"></div>',
        '      <div class="intelligence-dot dot-a"></div>',
        '      <div class="intelligence-dot dot-b"></div>',
        '      <div class="intelligence-dot dot-c"></div>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.community.id, '" class="landing-section community-section section-depth-anchor reveal">',
        '  <div class="section-container split-section community-shell">',
        '    <div class="community-visual glass-panel js-tilt">',
        '      <div class="community-grid"></div>',
        '      <div class="community-report report-a"><span>Street lighting issue</span></div>',
        '      <div class="community-report report-b"><span>Unusual crowd activity</span></div>',
        '      <div class="community-report report-c"><span>Safer crossing available</span></div>',
        '    </div>',
        '    <div class="split-copy">',
        '      <span class="section-kicker">', content.community.label, '</span>',
        '      <h2>', content.community.title, '</h2>',
        '      <p>', content.community.description, '</p>',
        '      <ul class="signal-list">',
        renderBulletList(content.community.bullets),
        '      </ul>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.vision.id, '" class="landing-section vision-section section-depth-anchor reveal">',
        '  <div class="section-container">',
        '    <div class="vision-panel glass-panel">',
        '      <span class="section-kicker">', content.vision.label, '</span>',
        '      <h2>', content.vision.title, '</h2>',
        '      <p>', content.vision.description, '</p>',
        '    </div>',
        '  </div>',
        '</section>',
        '<section id="', content.cta.id, '" class="landing-section final-cta-section section-depth-anchor reveal">',
        '  <div class="section-container">',
        '    <div class="final-cta-panel glass-panel">',
        '      <span class="section-kicker">Ready to Try USafe?</span>',
        '      <h2>', content.cta.title, '</h2>',
        '      <p>', content.cta.description, '</p>',
        '      <div class="hero-actions">',
        '        <a class="landing-btn landing-btn-primary" href="', content.cta.primaryCta.href, '">', content.cta.primaryCta.label, '</a>',
        '        <a class="landing-btn landing-btn-secondary" href="', content.cta.secondaryCta.href, '">', content.cta.secondaryCta.label, '</a>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");

    footerRoot.innerHTML = [
        '<div class="section-container footer-shell">',
        '  <div class="footer-brand">',
        '    <a class="footer-logo" href="index.html" aria-label="USafe Home">',
        '      <img src="images/final USafe logo.jpg" alt="USafe Logo">',
        '      <span>USafe</span>',
        '    </a>',
        '    <p>Proactive AI-guided safety navigation built for real movement in real cities.</p>',
        '  </div>',
        '  <div class="footer-columns">',
        renderFooterColumns(content.footer.columns),
        '  </div>',
        '  <div class="footer-meta">',
        '    <p>', content.footer.copyright, '</p>',
        '    <div class="footer-socials">',
        renderSocials(content.footer.socials),
        '    </div>',
        '  </div>',
        '</div>'
    ].join("");
}
