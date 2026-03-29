import "../../css/shared/sectionNav.css";

var DOUBLE_CLICK_DELAY = 280;  // ms window to detect a second click
var NAV_OFFSET = 0;            // px — sections already pad for the fixed nav

// ── Helpers ──────────────────────────────────────────────────────────

function getSections() {
    var all = Array.prototype.slice.call(document.querySelectorAll("section"));
    return all.filter(function (el) {
        return el.offsetHeight > 150;
    });
}

/**
 * Returns the index of the section the user is currently "inside".
 * Uses the point 38 % down from the top of the viewport as the probe.
 */
function getCurrentIndex(sections) {
    var probe = window.scrollY + window.innerHeight * 0.38;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
        var top = sections[i].getBoundingClientRect().top + window.scrollY;
        if (top <= probe) {
            current = i;
        }
    }
    return current;
}

function scrollToSection(section, lenis) {
    var top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    if (lenis) {
        lenis.scrollTo(Math.max(0, top), {
            duration: 1.1,
            easing: function (t) {
                // ease-in-out cubic
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
        });
    } else {
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
}

function scrollToTop(lenis) {
    if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// ── Button factory ────────────────────────────────────────────────────

function createButton() {
    var btn = document.createElement("button");
    btn.className = "section-nav-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Scroll to next section");
    btn.innerHTML = [
        '<svg class="section-nav-icon" viewBox="0 0 24 24" fill="none"',
        ' stroke="currentColor" stroke-width="2.5"',
        ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
        '<polyline points="6 9 12 15 18 9"></polyline>',
        "</svg>"
    ].join("");
    return btn;
}

// ── Core init ─────────────────────────────────────────────────────────

function _init(lenis) {
    var sections = getSections();
    if (sections.length < 2) {
        return;
    }

    var btn = createButton();
    document.body.appendChild(btn);

    // entrance animation — one rAF to let the browser register the initial state
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            btn.classList.add("is-visible");
        });
    });

    // ── State ─────────────────────────────────────────────────────────

    var isUp = false;

    function updateState() {
        var idx = getCurrentIndex(sections);
        var shouldBeUp = (idx >= sections.length - 1);

        if (shouldBeUp !== isUp) {
            isUp = shouldBeUp;
            btn.classList.toggle("is-up", isUp);
            btn.setAttribute(
                "aria-label",
                isUp ? "Scroll to previous section" : "Scroll to next section"
            );
        }
    }

    // ── Click handling (single vs double) ─────────────────────────────

    var clickCount = 0;
    var clickTimer = null;

    btn.addEventListener("click", function (e) {
        e.preventDefault();
        clickCount += 1;

        if (clickCount === 1) {
            clickTimer = setTimeout(function () {
                clickCount = 0;

                // — Single click —
                var idx = getCurrentIndex(sections);
                if (isUp) {
                    // UP: go to the section above, or top if already at first
                    if (idx > 0) {
                        scrollToSection(sections[idx - 1], lenis);
                    } else {
                        scrollToTop(lenis);
                    }
                } else {
                    // DOWN: go to the next section
                    if (idx < sections.length - 1) {
                        scrollToSection(sections[idx + 1], lenis);
                    }
                }
            }, DOUBLE_CLICK_DELAY);
        } else {
            clearTimeout(clickTimer);
            clickCount = 0;

            // — Double click —
            if (isUp) {
                scrollToTop(lenis);
            } else {
                scrollToSection(sections[sections.length - 1], lenis);
            }
        }

        // brief press feedback
        btn.classList.add("is-clicking");
        setTimeout(function () {
            btn.classList.remove("is-clicking");
        }, 140);
    });

    // ── Scroll tracking ───────────────────────────────────────────────

    var ticking = false;

    function onScroll() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                updateState();
                ticking = false;
            });
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    if (lenis) {
        lenis.on("scroll", onScroll);
    }

    // set initial direction
    updateState();
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Mount the floating section-navigation button.
 * @param {object|null} lenis  Pass the Lenis instance on pages that use it,
 *                             or null/undefined for native smooth scroll.
 */
export function initSectionNav(lenis) {
    // One rAF ensures dynamically-rendered sections are in the DOM
    requestAnimationFrame(function () {
        _init(lenis || null);
    });
}
