export function initCardInteractions() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
        return;
    }

    var cards = Array.prototype.slice.call(document.querySelectorAll(".interactive-card"));

    cards.forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            var rect = card.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.setProperty("--card-rotate-x", String((-y * 10).toFixed(2)) + "deg");
            card.style.setProperty("--card-rotate-y", String((x * 12).toFixed(2)) + "deg");
            card.style.setProperty("--card-shine-x", String((x + 0.5) * 100) + "%");
            card.style.setProperty("--card-shine-y", String((y + 0.5) * 100) + "%");
        });

        card.addEventListener("pointerleave", function () {
            card.style.removeProperty("--card-rotate-x");
            card.style.removeProperty("--card-rotate-y");
            card.style.removeProperty("--card-shine-x");
            card.style.removeProperty("--card-shine-y");
        });
    });
}
