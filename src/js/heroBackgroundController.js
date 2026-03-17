import { initMobileShowcase } from "./mobileShowcase.js";

export function initHeroBackgroundController() {
    var hero = document.querySelector(".hero-section");
    var mobileShowcase = initMobileShowcase();

    if (!hero) {
        return {
            setActivePhrase: function () {},
            destroy: function () {
                mobileShowcase.destroy();
            }
        };
    }

    function setActivePhrase(phrase, detail) {
        if (!phrase) {
            return;
        }

        hero.dataset.heroPhrase = phrase.id;
        hero.dataset.heroMode = phrase.animationMode;
        hero.dataset.heroPhase = detail && detail.phase ? detail.phase : "idle";
        mobileShowcase.setActivePhrase(phrase, detail);
    }

    return {
        setActivePhrase: setActivePhrase,
        destroy: function () {
            delete hero.dataset.heroPhrase;
            delete hero.dataset.heroMode;
            delete hero.dataset.heroPhase;
            delete hero.dataset.heroScreen;
            mobileShowcase.destroy();
        }
    };
}
