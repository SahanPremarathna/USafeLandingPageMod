function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getPhraseParts(phrase) {
    var highlight = phrase.highlight || "";
    var highlightStart = highlight ? phrase.text.indexOf(highlight) : -1;

    if (highlightStart < 0 || !highlight) {
        return {
            before: phrase.text,
            highlight: "",
            after: "",
            highlightStart: phrase.text.length,
            highlightEnd: phrase.text.length
        };
    }

    return {
        before: phrase.text.slice(0, highlightStart),
        highlight: highlight,
        after: phrase.text.slice(highlightStart + highlight.length),
        highlightStart: highlightStart,
        highlightEnd: highlightStart + highlight.length
    };
}

function getVisibleSegments(phrase, visibleCount) {
    var parts = getPhraseParts(phrase);
    var safeVisibleCount = clamp(visibleCount, 0, phrase.text.length);
    var beforeVisibleCount = Math.min(safeVisibleCount, parts.highlightStart);
    var highlightVisibleCount = clamp(safeVisibleCount - parts.highlightStart, 0, parts.highlight.length);
    var afterVisibleCount = clamp(safeVisibleCount - parts.highlightEnd, 0, parts.after.length);

    return {
        before: parts.before.slice(0, beforeVisibleCount),
        highlight: parts.highlight.slice(0, highlightVisibleCount),
        after: parts.after.slice(0, afterVisibleCount),
        isHighlightVisible: highlightVisibleCount > 0,
        isPhraseComplete: safeVisibleCount === phrase.text.length
    };
}

export function initTypewriterHeadline(options) {
    var phrases = Array.isArray(options && options.phrases) ? options.phrases : [];
    var beforeEl = options && options.beforeEl;
    var highlightEl = options && options.highlightEl;
    var afterEl = options && options.afterEl;
    var lineEl = options && options.lineEl;
    var onPhraseChange = typeof (options && options.onPhraseChange) === "function" ? options.onPhraseChange : function () {};
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timings = Object.assign({
        typeDelay: 40,
        holdDelay: 1380,
        glitchDuration: 220,
        restartDelay: 140
    }, options && options.timings ? options.timings : {});
    var timeoutId = null;
    var isDestroyed = false;
    var currentPhraseIndex = 0;
    var visibleCount = 0;

    if (!beforeEl || !highlightEl || !afterEl || !lineEl || phrases.length === 0) {
        return {
            destroy: function () {}
        };
    }

    function applySegments(phrase, count, phase) {
        var segments = getVisibleSegments(phrase, count);
        var isGlitching = phase === "glitching";

        beforeEl.textContent = segments.before;
        highlightEl.textContent = segments.highlight;
        afterEl.textContent = segments.after;
        lineEl.dataset.phase = phase;
        lineEl.dataset.phrase = phrase.id;
        lineEl.dataset.complete = segments.isPhraseComplete ? "true" : "false";
        lineEl.classList.toggle("is-highlight-active", segments.isHighlightVisible && !isGlitching);
        lineEl.classList.toggle("is-phrase-complete", segments.isPhraseComplete && !isGlitching);
        lineEl.classList.toggle("is-glitching", isGlitching);
    }

    function notify(phrase, phase) {
        onPhraseChange(phrase, {
            phase: phase,
            visibleCount: visibleCount,
            isComplete: visibleCount === phrase.text.length
        });
    }

    function schedule(nextStep, delay) {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            if (!isDestroyed) {
                nextStep();
            }
        }, delay);
    }

    function startPhrase(index) {
        var phrase = phrases[index];

        currentPhraseIndex = index;
        visibleCount = 0;
        applySegments(phrase, visibleCount, "typing");
        notify(phrase, "typing");
        schedule(typeForward, timings.typeDelay);
    }

    function typeForward() {
        var phrase = phrases[currentPhraseIndex];

        visibleCount += 1;
        applySegments(phrase, visibleCount, "typing");
        notify(phrase, "typing");

        if (visibleCount < phrase.text.length) {
            schedule(typeForward, timings.typeDelay);
            return;
        }

        applySegments(phrase, visibleCount, "holding");
        notify(phrase, "holding");
        schedule(startGlitchOut, timings.holdDelay);
    }

    function startGlitchOut() {
        var phrase = phrases[currentPhraseIndex];

        applySegments(phrase, visibleCount, "glitching");
        notify(phrase, "glitching");
        schedule(clearPhrase, timings.glitchDuration);
    }

    function clearPhrase() {
        var phrase = phrases[currentPhraseIndex];

        visibleCount = 0;
        applySegments(phrase, visibleCount, "cleared");
        notify(phrase, "cleared");
        schedule(function () {
            startPhrase((currentPhraseIndex + 1) % phrases.length);
        }, timings.restartDelay);
    }

    if (reducedMotion) {
        visibleCount = phrases[0].text.length;
        applySegments(phrases[0], visibleCount, "holding");
        notify(phrases[0], "holding");
        return {
            destroy: function () {
                window.clearTimeout(timeoutId);
                isDestroyed = true;
            }
        };
    }

    startPhrase(0);

    return {
        destroy: function () {
            isDestroyed = true;
            window.clearTimeout(timeoutId);
        }
    };
}
