export function initNavigation(lenis) {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a, .nav-cta, .hero-actions a"));
    var pageLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
    var lastScrollY = window.scrollY;
    var hideThreshold = 220;
    var deltaThreshold = 6;

    pageLinks.forEach(function (link) {
        var href = link.getAttribute("href") || "";
        if (href === "#hero") {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            var expanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
            menu.classList.toggle("is-open");
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var href = link.getAttribute("href") || "";

            if (href.charAt(0) === "#") {
                var target = document.querySelector(href);
                if (!target) {
                    return;
                }

                event.preventDefault();
                if (lenis) {
                    lenis.scrollTo(target, { offset: -96 });
                } else {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }

            if (menu && menu.classList.contains("is-open")) {
                menu.classList.remove("is-open");
                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            }
        });
    });

    function handleScroll() {
        var currentScrollY = window.scrollY;
        var delta = currentScrollY - lastScrollY;

        if (!nav) {
            lastScrollY = currentScrollY;
            return;
        }

        nav.classList.toggle("is-scrolled", currentScrollY > 24);

        if (menu && menu.classList.contains("is-open")) {
            nav.classList.remove("is-hidden");
            lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY <= hideThreshold) {
            nav.classList.remove("is-hidden");
        } else if (delta > deltaThreshold) {
            nav.classList.add("is-hidden");
        } else if (delta < -deltaThreshold) {
            nav.classList.remove("is-hidden");
        }

        lastScrollY = currentScrollY;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
}
