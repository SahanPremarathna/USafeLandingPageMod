(function () {
    "use strict";

    function initNavigation() {
        var menuToggle = document.getElementById("mobile-menu");
        var navList = document.getElementById("nav-list");
        var nav = document.querySelector(".site-nav");
        var lastScrollY = window.scrollY;
        var hideThreshold = 220;
        var deltaThreshold = 6;

        if (menuToggle && navList && !menuToggle.dataset.bound) {
            menuToggle.dataset.bound = "true";
            menuToggle.addEventListener("click", function () {
                var expanded = menuToggle.getAttribute("aria-expanded") === "true";
                menuToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
                navList.classList.toggle("active");
                menuToggle.classList.toggle("is-active");

                if (nav) {
                    nav.classList.remove("is-hidden");
                }
            });
        }

        if (navList && !navList.dataset.bound) {
            navList.dataset.bound = "true";
            navList.addEventListener("click", function (event) {
                var target = event.target;
                if (!(target instanceof HTMLElement) || target.tagName !== "A") {
                    return;
                }

                navList.classList.remove("active");
                if (menuToggle) {
                    menuToggle.classList.remove("is-active");
                    menuToggle.setAttribute("aria-expanded", "false");
                }
            });
        }

        var currentPage = document.body.getAttribute("data-page");
        var pageLinks = document.querySelectorAll(".nav-links a[data-page]");

        for (var i = 0; i < pageLinks.length; i += 1) {
            var link = pageLinks[i];
            if (link.getAttribute("data-page") === currentPage) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        }

        function handleScroll() {
            var currentScrollY = window.scrollY;
            var delta = currentScrollY - lastScrollY;

            if (!nav) {
                lastScrollY = currentScrollY;
                return;
            }

            nav.classList.toggle("is-scrolled", currentScrollY > 24);

            if (navList && navList.classList.contains("active")) {
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
        if (!window.USafeNavigationScrollBound) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            window.USafeNavigationScrollBound = true;
        }
    }

    window.USafeNavigation = {
        refresh: initNavigation
    };

    initNavigation();
})();
