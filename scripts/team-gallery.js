function modulo(index, length) {
    return (index + length) % length;
}

export function initTeamGallery(root, images, options) {
    if (!root || !Array.isArray(images) || images.length === 0) {
        return;
    }

    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var intervalDuration = options && options.interval ? options.interval : 3800;
    var currentIndex = 0;
    var intervalId = null;
    var transitionTimeout = null;
    var cards = {
        front: root.querySelector('[data-gallery-card="front"] img'),
        middle: root.querySelector('[data-gallery-card="middle"] img'),
        back: root.querySelector('[data-gallery-card="back"] img')
    };
    var prevZone = root.querySelector('[data-gallery-nav="prev"]');
    var nextZone = root.querySelector('[data-gallery-nav="next"]');

    function preload(index) {
        var img = new Image();
        img.src = images[modulo(index, images.length)];
    }

    function render(direction) {
        var prevIndex = modulo(currentIndex - 1, images.length);
        var nextIndex = modulo(currentIndex + 1, images.length);

        cards.front.src = images[currentIndex];
        cards.middle.src = images[nextIndex];
        cards.back.src = images[prevIndex];

        cards.front.alt = "Team gallery image " + String(currentIndex + 1);
        cards.middle.alt = "Team gallery image " + String(nextIndex + 1);
        cards.back.alt = "Team gallery image " + String(prevIndex + 1);

        root.dataset.direction = direction || "next";
        root.classList.remove("is-transitioning");
        void root.offsetWidth;
        root.classList.add("is-transitioning");

        preload(currentIndex + 1);
        preload(currentIndex - 1);
    }

    function next() {
        currentIndex = modulo(currentIndex + 1, images.length);
        render("next");
    }

    function prev() {
        currentIndex = modulo(currentIndex - 1, images.length);
        render("prev");
    }

    function stopAuto() {
        if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    }

    function startAuto() {
        if (reducedMotion || images.length < 2 || intervalId) {
            return;
        }
        intervalId = window.setInterval(next, intervalDuration);
    }

    if (prevZone) {
        prevZone.addEventListener("mouseenter", function () {
            stopAuto();
            prev();
        });
        prevZone.addEventListener("focus", stopAuto);
        prevZone.addEventListener("click", prev);
    }

    if (nextZone) {
        nextZone.addEventListener("mouseenter", function () {
            stopAuto();
            next();
        });
        nextZone.addEventListener("focus", stopAuto);
        nextZone.addEventListener("click", next);
    }

    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);
    root.addEventListener("focusin", stopAuto);
    root.addEventListener("focusout", startAuto);
    root.addEventListener("animationend", function () {
        root.classList.remove("is-transitioning");
    });

    render("next");
    startAuto();
}
