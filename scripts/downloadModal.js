var DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=106hO-X5UMW4a6jYDDU55nMLg52BOzTH8";

var MODAL_STYLES = [
    ".udm-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px;",
    "background:rgba(3,7,18,0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);",
    "opacity:0;pointer-events:none;transition:opacity 0.3s ease;}",
    ".udm-overlay.udm-visible{opacity:1;pointer-events:all;}",

    ".udm-box{position:relative;width:100%;max-width:780px;max-height:92vh;overflow-y:auto;",
    "background:linear-gradient(160deg,rgba(12,22,44,0.98) 0%,rgba(6,12,28,0.99) 100%);",
    "border:1px solid rgba(104,190,255,0.2);border-radius:22px;",
    "box-shadow:0 28px 72px rgba(0,0,0,0.65),0 0 0 1px rgba(53,213,255,0.06) inset,0 0 48px rgba(17,148,255,0.07);",
    "padding:32px 28px 28px;",
    "transform:translateY(28px) scale(0.96);transition:transform 0.38s cubic-bezier(0.22,1,0.36,1);}",
    ".udm-visible .udm-box{transform:translateY(0) scale(1);}",

    ".udm-close{position:absolute;top:14px;right:16px;width:34px;height:34px;display:flex;align-items:center;",
    "justify-content:center;border:1px solid rgba(149,183,235,0.2);border-radius:50%;",
    "background:rgba(255,255,255,0.05);color:rgba(180,192,214,0.7);cursor:pointer;font-size:17px;",
    "font-family:inherit;line-height:1;transition:background 0.2s,color 0.2s,border-color 0.2s;}",
    ".udm-close:hover{background:rgba(255,255,255,0.11);color:rgba(241,246,255,0.97);border-color:rgba(149,183,235,0.38);}",

    /* Header */
    ".udm-header{margin-bottom:22px;}",
    ".udm-header-title{font-family:'Sora',sans-serif;font-size:1.38rem;font-weight:700;",
    "color:rgba(241,246,255,0.97);margin:0 0 5px;line-height:1.28;}",
    ".udm-header-sub{font-size:0.855rem;color:rgba(160,180,214,0.72);margin:0;line-height:1.55;}",

    /* Platform grid */
    ".udm-platforms{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:0;}",
    "@media(max-width:560px){.udm-platforms{grid-template-columns:1fr;}}",

    /* Platform card */
    ".udm-card{border-radius:16px;border:1px solid rgba(104,190,255,0.14);",
    "background:rgba(255,255,255,0.03);padding:20px 18px 18px;display:flex;flex-direction:column;gap:0;}",
    ".udm-card--ios{border-color:rgba(180,180,200,0.16);background:rgba(255,255,255,0.025);}",

    /* Card icon row */
    ".udm-card-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:12px;",
    "font-size:22px;margin-bottom:12px;}",
    ".udm-card--android .udm-card-icon{background:linear-gradient(135deg,rgba(61,194,91,0.22),rgba(53,213,255,0.1));",
    "border:1px solid rgba(61,194,91,0.28);color:#4ade80;}",
    ".udm-card--ios .udm-card-icon{background:linear-gradient(135deg,rgba(200,200,220,0.14),rgba(160,160,200,0.07));",
    "border:1px solid rgba(200,200,220,0.22);color:rgba(210,215,235,0.85);}",

    /* Badge */
    ".udm-card-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;",
    "font-size:0.64rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;width:fit-content;}",
    ".udm-badge--warn{border:1px solid rgba(255,193,7,0.38);background:rgba(255,193,7,0.09);color:#ffc107;}",
    ".udm-badge--muted{border:1px solid rgba(180,180,220,0.22);background:rgba(180,180,220,0.07);color:rgba(180,190,220,0.72);}",

    /* Card title */
    ".udm-card-title{font-family:'Sora',sans-serif;font-size:1rem;font-weight:700;",
    "color:rgba(241,246,255,0.95);margin:0 0 6px;line-height:1.3;}",

    /* Card desc */
    ".udm-card-desc{font-size:0.82rem;color:rgba(180,192,214,0.78);line-height:1.62;margin:0 0 16px;flex:1;}",

    /* Divider inside card */
    ".udm-card-divider{border:none;border-top:1px solid rgba(120,146,189,0.12);margin:0 0 14px;}",

    /* Steps */
    ".udm-steps-label{font-size:0.64rem;font-weight:800;letter-spacing:0.11em;text-transform:uppercase;",
    "color:rgba(159,223,255,0.72);display:block;margin:0 0 10px;}",
    ".udm-steps{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:8px;}",
    ".udm-steps li{display:flex;align-items:flex-start;gap:9px;font-size:0.8rem;",
    "color:rgba(200,215,240,0.85);line-height:1.5;}",
    ".udm-step-num{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:rgba(17,148,255,0.17);",
    "border:1px solid rgba(53,213,255,0.28);display:flex;align-items:center;justify-content:center;",
    "font-size:0.62rem;font-weight:700;color:#9fdfff;margin-top:2px;}",
    ".udm-steps li strong{color:rgba(220,232,252,0.94);font-weight:700;}",

    /* Note */
    ".udm-note{display:flex;align-items:center;gap:7px;padding:8px 12px;border-radius:9px;",
    "background:rgba(255,255,255,0.035);border:1px solid rgba(120,146,189,0.13);",
    "font-size:0.76rem;color:rgba(160,180,210,0.7);margin-bottom:14px;}",
    ".udm-note i{flex-shrink:0;color:#5bb8ff;font-size:0.78rem;}",

    /* iOS coming soon block */
    ".udm-ios-soon{display:flex;flex-direction:column;align-items:flex-start;gap:10px;",
    "padding:14px;border-radius:12px;background:rgba(255,255,255,0.025);border:1px solid rgba(180,180,220,0.13);",
    "margin-bottom:0;}",
    ".udm-ios-soon p{font-size:0.8rem;color:rgba(180,192,214,0.72);line-height:1.62;margin:0;}",
    ".udm-ios-soon strong{color:rgba(210,220,240,0.88);}",
    ".udm-ios-pill{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;",
    "background:rgba(255,255,255,0.04);border:1px solid rgba(180,180,220,0.18);",
    "font-size:0.72rem;font-weight:700;color:rgba(190,200,230,0.7);letter-spacing:0.04em;}",
    ".udm-ios-pill i{font-size:0.7rem;}",

    /* Download button */
    ".udm-download-btn{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;",
    "min-height:46px;padding:0 20px;border-radius:999px;font-weight:800;font-size:0.9rem;",
    "letter-spacing:0.01em;color:#06111f;text-decoration:none;",
    "background:linear-gradient(135deg,#8ee8ff 0%,#35d5ff 44%,#1194ff 100%);",
    "box-shadow:0 14px 34px rgba(17,148,255,0.3);",
    "transition:transform 0.22s ease,box-shadow 0.22s ease;}",
    ".udm-download-btn:hover{transform:translateY(-2px);box-shadow:0 20px 44px rgba(17,148,255,0.44);}",

    /* Shared utility */
    "[data-download-cta]{cursor:pointer;font-family:inherit;}",
    "button[data-download-cta]{border:none;outline:inherit;}",

    ".footer-download-cta{margin-top:18px;display:inline-flex;align-items:center;gap:8px;",
    "padding:0 20px;min-height:44px;border-radius:999px;font-weight:700;font-size:0.88rem;",
    "color:#06111f;background:linear-gradient(135deg,#8ee8ff 0%,#35d5ff 44%,#1194ff 100%);",
    "box-shadow:0 12px 28px rgba(17,148,255,0.22);transition:transform 0.22s ease,box-shadow 0.22s ease;}",
    ".footer-download-cta:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(17,148,255,0.34);}"
].join("");

var MODAL_HTML = [
    '<div class="udm-overlay" id="usafe-download-modal" role="dialog" aria-modal="true" aria-labelledby="udm-title">',
    '  <div class="udm-box">',
    '    <button class="udm-close" id="udm-close-btn" aria-label="Close">&times;</button>',

    '    <div class="udm-header">',
    '      <h2 class="udm-header-title" id="udm-title">Get USafe</h2>',
    '      <p class="udm-header-sub">Choose your platform below to get started.</p>',
    '    </div>',

    '    <div class="udm-platforms">',

    /* ── Android card ── */
    '      <div class="udm-card udm-card--android">',
    '        <div class="udm-card-icon"><i class="fa-brands fa-android" aria-hidden="true"></i></div>',
    '        <div class="udm-card-badge udm-badge--warn">',
    '          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Not on Play Store',
    '        </div>',
    '        <h3 class="udm-card-title">Android</h3>',
    '        <p class="udm-card-desc">',
    '          USafe isn\'t on the Google Play Store yet. Download the APK directly and install it manually on your device.',
    '        </p>',
    '        <hr class="udm-card-divider">',
    '        <span class="udm-steps-label">How to install</span>',
    '        <ol class="udm-steps">',
    '          <li><span class="udm-step-num">1</span><span>Tap <strong>Download APK</strong> — the file saves to your device.</span></li>',
    '          <li><span class="udm-step-num">2</span><span>Go to <strong>Settings → Security</strong> (or <strong>Privacy</strong>).</span></li>',
    '          <li><span class="udm-step-num">3</span><span>Enable <strong>"Install unknown apps"</strong> for your browser or file manager.</span></li>',
    '          <li><span class="udm-step-num">4</span><span>Open <strong>Downloads</strong>, tap the <strong>USafe .apk</strong> file.</span></li>',
    '          <li><span class="udm-step-num">5</span><span>Tap <strong>Install</strong> and follow the prompts. Done!</span></li>',
    '        </ol>',
    '        <div class="udm-note">',
    '          <i class="fa-solid fa-circle-info" aria-hidden="true"></i>',
    '          Requires Android 8.0 (Oreo) or higher.',
    '        </div>',
    '        <a class="udm-download-btn" href="', DOWNLOAD_URL, '" target="_blank" rel="noopener noreferrer">',
    '          <i class="fa-solid fa-download" aria-hidden="true"></i> Download APK',
    '        </a>',
    '      </div>',

    /* ── iOS card ── */
    '      <div class="udm-card udm-card--ios">',
    '        <div class="udm-card-icon"><i class="fa-brands fa-apple" aria-hidden="true"></i></div>',
    '        <div class="udm-card-badge udm-badge--muted">',
    '          <i class="fa-solid fa-gears" aria-hidden="true"></i> In Development',
    '        </div>',
    '        <h3 class="udm-card-title">iOS</h3>',
    '        <p class="udm-card-desc">',
    '          We\'re actively building and optimizing USafe for iPhone and iPad.',
    '          Our team is working hard to make the iOS experience just as powerful as Android.',
    '        </p>',
    '        <hr class="udm-card-divider">',
    '        <div class="udm-ios-soon">',
    '          <span class="udm-ios-pill"><i class="fa-solid fa-wrench" aria-hidden="true"></i> Under Active Optimization</span>',
    '          <p>',
    '            The iOS version of USafe is currently under <strong>active development and optimization</strong>.',
    '            We\'re fine-tuning performance, safety features, and the overall experience for Apple devices.',
    '            Stay tuned — it\'s coming soon.',
    '          </p>',
    '        </div>',
    '      </div>',

    '    </div>',
    '  </div>',
    '</div>'
].join("");

function injectStyles() {
    if (document.getElementById("usafe-download-modal-styles")) {
        return;
    }
    var style = document.createElement("style");
    style.id = "usafe-download-modal-styles";
    style.textContent = MODAL_STYLES;
    document.head.appendChild(style);
}

function injectModal() {
    if (document.getElementById("usafe-download-modal")) {
        return;
    }
    var wrapper = document.createElement("div");
    wrapper.innerHTML = MODAL_HTML;
    document.body.appendChild(wrapper.firstElementChild);
}

function openModal() {
    injectModal();
    var modal = document.getElementById("usafe-download-modal");
    if (!modal) {
        return;
    }
    requestAnimationFrame(function () {
        modal.classList.add("udm-visible");
        document.body.style.overflow = "hidden";
        var closeBtn = modal.querySelector("#udm-close-btn");
        if (closeBtn) {
            closeBtn.focus();
        }
    });
}

function closeModal() {
    var modal = document.getElementById("usafe-download-modal");
    if (!modal) {
        return;
    }
    modal.classList.remove("udm-visible");
    document.body.style.overflow = "";
}

export function initDownloadModal() {
    injectStyles();

    document.addEventListener("click", function (event) {
        var modal = document.getElementById("usafe-download-modal");

        if (event.target.closest("[data-download-cta]")) {
            event.preventDefault();
            openModal();
            return;
        }

        if (!modal || !modal.classList.contains("udm-visible")) {
            return;
        }

        if (event.target === modal) {
            closeModal();
            return;
        }

        if (event.target.closest("#udm-close-btn")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            var modal = document.getElementById("usafe-download-modal");
            if (modal && modal.classList.contains("udm-visible")) {
                closeModal();
            }
        }
    });
}
