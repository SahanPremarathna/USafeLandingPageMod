(function () {
    "use strict";

    function initNavigation() {
        var menuToggle = document.getElementById("mobile-menu");
        var navList = document.getElementById("nav-list");

        if (menuToggle && navList && !menuToggle.dataset.bound) {
            menuToggle.dataset.bound = "true";
            menuToggle.addEventListener("click", function () {
                navList.classList.toggle("active");
                menuToggle.classList.toggle("is-active");
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
    }

    window.USafeNavigation = {
        refresh: initNavigation
    };

    initNavigation();
})();
