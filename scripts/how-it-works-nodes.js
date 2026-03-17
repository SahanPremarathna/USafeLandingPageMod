export function initHowItWorksNodes(scope) {
    var root = scope || document;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scenes = Array.prototype.slice.call(root.querySelectorAll("[data-node-scene]"));

    if (reducedMotion || !scenes.length) {
        return;
    }

    scenes.forEach(function (scene) {
        var tags = Array.prototype.slice.call(scene.querySelectorAll(".signal-tag"));
        var start = performance.now() * 0.001;

        function frame(now) {
            var t = now * 0.001 - start;
            for (var i = 0; i < tags.length; i += 1) {
                var offset = Math.sin(t * (0.7 + (i * 0.08)) + i) * 8;
                tags[i].style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
            }
            scene.__howNodesRaf = window.requestAnimationFrame(frame);
        }

        scene.__howNodesRaf = window.requestAnimationFrame(frame);
    });
}
