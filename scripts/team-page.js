import "../js/shared/pageLoader.js";
import "../js/shared/navigation.js";
import { initSectionNav } from "../js/shared/sectionNav.js";
import { initTeamAnimations } from "./team-animations.js";
import { initSectionBackgroundVideos } from "./section-background-videos.js";
import teamGallery0Url from "../images/team-gallery/team-0.webp";
import teamGallery6Url from "../images/team-gallery/team-6.webp";
import teamGallery3Url from "../images/team-gallery/team-3.webp";
import teamGallery2Url from "../images/team-gallery/team-2.webp";
import teamHeroVideoUrl from "../images/bg_vids/3255275-hd_1920_1080_25fps.webm";
import teamPeopleVideoUrl from "../images/bg_vids/vecteezy_an-electrocardiogram-heart-monitor-pulses-on-a-blue-grid_1622996.webm";
import teamNarrativeVideoUrl from "../images/bg_vids/vecteezy_timelapse-hong-kong-city_3362813.webm";
import sanukaImageUrl from "../images/developer_images/sanuka.jpg";
import sahanImageUrl from "../images/developer_images/sahan.jpeg";
import naveeshImageUrl from "../images/developer_images/naveesh.png";
import yousufImageUrl from "../images/developer_images/yousuf.png";
import vinharaImageUrl from "../images/developer_images/vinhara.jpg";
import sithumiImageUrl from "../images/developer_images/sithumi.jpg";

const teamGalleryImages = [
    teamGallery0Url,
    teamGallery6Url,
    teamGallery3Url,
    teamGallery2Url
];

const teamSectionMedia = {
    hero: teamHeroVideoUrl,
    people: teamPeopleVideoUrl,
    narrative: teamNarrativeVideoUrl
};

const teamPageContent = {
    hero: {
        kicker: "Team USafe",
        title: "We're building for moments that matter",
        description: "USafe is built by a multidisciplinary team focused on one outcome: helping people move with confidence in uncertain environments.",
        primaryCta: { label: "See How It Works", href: "how-it-works.html" },
        secondaryCta: { label: "Contact Team", href: "contact.html" }
    },
    people: {
        kicker: "The People",
        title: "The people behind your safety layer",
        featuredIntro: "A multidisciplinary team combining product thinking, interface design, systems engineering, and machine-learning-led exploration.",
        members: [
            {
                name: "Sanuka Pathiraja",
                role: "Full Stack Developer",
                line: "Focused on clarity in high-pressure situations.",
                image: sanukaImageUrl,
                github: "https://github.com/Sanuka-Pathiraja?tab=overview&from=2026-01-01&to=2026-01-20",
                linkedin: "https://www.linkedin.com/in/sanuka-pathiraja-4539b3330/"
            },
            {
                name: "Sahan Premarathna",
                role: "Full Stack Developer",
                line: "Designing systems that think before users react.",
                image: sahanImageUrl,
                github: "https://github.com/SahanPremarathna",
                linkedin: "https://www.linkedin.com/in/sahan-premarathna/"
            },
            {
                name: "Naveesh Abeydheera",
                role: "Full Stack Developer",
                line: "Building dependable logic for uncertain real-world journeys.",
                image: naveeshImageUrl,
                github: "https://github.com/Navi2004725",
                linkedin: "https://www.linkedin.com/in/naveesh-abeydheera-a92511332/"
            },
            {
                name: "Yousuf Nizam",
                role: "Front End & ML Developer",
                line: "Shaping product behavior around confidence and precision.",
                image: yousufImageUrl,
                github: "https://github.com/YousufNizam",
                linkedin: "https://www.linkedin.com/in/yousuf-nizam-428b22334/"
            },
            {
                name: "Vinhara Perera",
                role: "Front End & ML Developer",
                line: "Translating intelligent systems into calm, usable interfaces.",
                image: vinharaImageUrl,
                github: "https://github.com/vinhara",
                linkedin: "https://www.linkedin.com/in/vinhara-perera-0872b0351/"
            },
            {
                name: "Sithumi Palihena",
                role: "Front End & ML Developer",
                line: "Creating readable experiences for moments that matter.",
                image: sithumiImageUrl,
                github: "https://github.com/SithumiPalihena",
                linkedin: "https://www.linkedin.com/in/sithumi-palihena-565799346/"
            }
        ]
    },
    unified: {
        kicker: "How USafe Thinks",
        title: "How USafe thinks, and why it exists",
        paragraphs: [
            "USafe is built to make decisions before you have to. It starts with understanding the real world as it is - not ideal conditions, but unpredictable movement, urgency, and uncertainty.",
            "We detect what matters in real time, interpret complex signals into clear and usable insight, and guide actions that help people respond with confidence. The system is not designed to simply inform, but to support calm, coordinated decisions when it matters most.",
            "This approach exists for a reason.",
            "USafe is not being built in isolation. It is shaped by real movement, real risk, and the need for clarity before situations escalate. Every part of the system is designed to reduce uncertainty and give people a stronger sense of control in the moments that matter.",
            "We are building for those moments.",
            "If you believe safety should be proactive, intelligent, and human-centered, you are in the right place."
        ],
        primaryCta: { label: "Explore USafe", href: "index.html" },
        secondaryCta: { label: "Connect with the Team", href: "contact.html" }
    }
};

function renderHeroGallery(images) {
    return images.map(function (image, index) {
        return [
            '<article class="team-gallery-photo team-gallery-photo-' + String(index + 1) + '" data-team-reveal data-team-delay="' + String(index * 70) + '" data-gallery-card tabindex="0" role="button" aria-pressed="false" aria-label="Focus team gallery image ' + String(index + 1) + '">',
            '  <img src="' + image + '" alt="Team gallery image ' + String(index + 1) + '">',
            '</article>'
        ].join("");
    }).join("");
}

function renderSocialLinks(member) {
    var links = [];

    if (member.github && member.github !== "#") {
        links.push('<a href="' + member.github + '" target="_blank" rel="noreferrer noopener" aria-label="' + member.name + ' on GitHub"><i class="fab fa-github"></i></a>');
    }

    if (member.linkedin && member.linkedin !== "#") {
        links.push('<a href="' + member.linkedin + '" target="_blank" rel="noreferrer noopener" aria-label="' + member.name + ' on LinkedIn"><i class="fab fa-linkedin-in"></i></a>');
    }

    return links.join("");
}

function renderFeaturedMember(member) {
    return [
        '<article class="person-card person-card-featured" data-team-reveal>',
        '  <div class="person-image-wrap">',
        '    <img src="' + member.image + '" alt="' + member.name + '" class="person-image">',
        '  </div>',
        '  <div class="person-copy">',
        '    <span class="section-kicker">Featured Builder</span>',
        '    <h3>' + member.name + '</h3>',
        '    <p class="person-role">' + member.role + '</p>',
        '    <p class="person-line">' + member.line + '</p>',
        '    <div class="person-socials">' + renderSocialLinks(member) + '</div>',
        '  </div>',
        '</article>'
    ].join("");
}

function renderMemberCard(member, index) {
    return [
        '<article class="person-card person-card-grid person-card-grid-' + String(index + 1) + '" data-team-reveal data-team-delay="' + String(index * 55) + '">',
        '  <div class="person-image-wrap">',
        '    <img src="' + member.image + '" alt="' + member.name + '" class="person-image">',
        '  </div>',
        '  <div class="person-copy">',
        '    <h3>' + member.name + '</h3>',
        '    <p class="person-role">' + member.role + '</p>',
        '    <p class="person-line">' + member.line + '</p>',
        '    <div class="person-socials">' + renderSocialLinks(member) + '</div>',
        '  </div>',
        '</article>'
    ].join("");
}

function renderPeopleSection(people) {
    var featured = people.members[0];
    var rest = people.members.slice(1);

    return [
        '<section class="team-section team-people-section" data-section-media-key="people">',
        '  <div class="page-container">',
        '    <div class="section-heading" data-team-reveal>',
        '      <span class="section-kicker">' + people.kicker + '</span>',
        '      <h2>' + people.title + '</h2>',
        '      <p>' + people.featuredIntro + '</p>',
        '    </div>',
        '    <div class="people-layout">',
        '      <div class="people-featured">' + renderFeaturedMember(featured) + '</div>',
        '      <div class="people-grid">' + rest.map(renderMemberCard).join("") + '</div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");
}

function renderUnifiedSection(unified) {
    return [
        '<section class="team-section team-narrative" data-section-media-key="narrative">',
        '  <div class="team-section-backdrop team-section-backdrop-narrative" aria-hidden="true">',
        '    <div class="narrative-lines"></div>',
        '    <div class="narrative-glow narrative-glow-a"></div>',
        '    <div class="narrative-glow narrative-glow-b"></div>',
        '  </div>',
        '  <div class="page-container">',
        '    <div class="team-narrative-panel">',
        '      <div class="team-narrative-ambient" aria-hidden="true">',
        '        <div class="team-narrative-symbol">U</div>',
        '        <div class="team-narrative-divider"></div>',
        '      </div>',
        '      <div class="team-narrative-copy">',
        '        <div class="team-narrative-intro">',
        '          <span class="section-kicker" data-team-reveal>' + unified.kicker + '</span>',
        '          <h2 data-team-reveal data-team-delay="40">' + unified.title + '</h2>',
        '          <div class="team-narrative-copy-divider" aria-hidden="true"></div>',
        '        </div>',
        '        <div class="team-narrative-body">',
                    unified.paragraphs.map(function (paragraph, index) {
                        return '<p data-team-reveal data-team-delay="' + String(90 + (index * 55)) + '">' + paragraph + '</p>';
                    }).join(''),
        '        </div>',
        '        <div class="team-actions team-narrative-actions" data-team-reveal data-team-delay="420">',
        '          <a class="button button-primary" href="' + unified.primaryCta.href + '">' + unified.primaryCta.label + '</a>',
        '          <a class="button button-secondary" href="' + unified.secondaryCta.href + '">' + unified.secondaryCta.label + '</a>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join("");
}

function renderPage(content) {
    return [
        '<div class="section-video-stage" aria-hidden="true">',
'  <video class="section-video-layer is-active" data-section-video-primary autoplay muted loop playsinline preload="auto"></video>',
'  <video class="section-video-layer" data-section-video-secondary autoplay muted loop playsinline preload="auto"></video>',
'  <div class="section-video-overlay"></div>',
'</div>',
'<section class="team-section team-hero" data-section-media-key="hero">',
        '  <div class="team-section-backdrop team-section-backdrop-hero" aria-hidden="true">',
        '    <div class="hero-grid"></div>',
        '    <div class="hero-glow hero-glow-a"></div>',
        '    <div class="hero-glow hero-glow-b"></div>',
        '  </div>',
        '  <div class="page-container team-hero-layout">',
        '    <div class="team-hero-copy" data-team-reveal>',
        '      <span class="section-kicker">' + content.hero.kicker + '</span>',
        '      <h1>' + content.hero.title + '</h1>',
        '      <p>' + content.hero.description + '</p>',
        '      <div class="team-actions">',
        '        <a class="button button-primary" href="' + content.hero.primaryCta.href + '">' + content.hero.primaryCta.label + '</a>',
        '        <a class="button button-secondary" href="' + content.hero.secondaryCta.href + '">' + content.hero.secondaryCta.label + '</a>',
        '      </div>',
        '    </div>',
        '    <div class="team-hero-visual">',
        '      <div class="team-gallery-layout">' + renderHeroGallery(teamGalleryImages) + '</div>',
        '    </div>',
        '  </div>',
        '</section>',
        renderPeopleSection(content.people),
        renderUnifiedSection(content.unified)
    ].join("");
}

function initTeamGallery(scope) {
    var root = scope || document;
    var gallery = root.querySelector(".team-gallery-layout");
    var cards = gallery ? Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-card]")) : [];

    if (!gallery || cards.length === 0) {
        return;
    }

    function setActive(nextCard) {
        var clearSelection = nextCard && nextCard.classList.contains("is-active");
        var hasActive = Boolean(nextCard) && !clearSelection;

        gallery.classList.toggle("has-active", hasActive);

        cards.forEach(function (card) {
            var isActive = hasActive && card === nextCard;
            card.classList.toggle("is-active", isActive);
            card.classList.toggle("is-inactive", hasActive && card !== nextCard);
            card.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            setActive(card);
        });

        card.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();
            setActive(card);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setActive(null);
        }
    });
}

function initTeamPage() {
    var root = document.getElementById("team-root");
    if (!root) {
        return;
    }

    root.innerHTML = renderPage(teamPageContent);
    initSectionBackgroundVideos(teamSectionMedia, document);
    initTeamAnimations(document);
    initTeamGallery(document);
}

initTeamPage();
initSectionNav();








