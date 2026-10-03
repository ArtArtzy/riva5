<template>
  <div class="publications-page">
    <HeaderMain class="!z-[1000]" />
    <VATitle menu="Publications" />

    <main class="publications-main">
      <section class="publications-hero">
        <div class="publications-hero__grid" aria-hidden="true"></div>
        <div class="publications-hero__glow publications-hero__glow--top"></div>
        <div class="publications-hero__glow publications-hero__glow--bottom"></div>
        <div class="publications-hero__inner">
          <div class="publications-hero__visual" aria-hidden="true">
            <img src="/images/publications-book.svg" alt="" class="publications-hero__icon" />
          </div>
          <div class="publications-hero__copy">
            <div class="publications-hero__eyebrow">
              <span class="publications-hero__eyebrow-line"></span>
              {{ t("publications.heroEyebrow") }}
            </div>
            <h1>{{ t("publications.heroTitle") }}</h1>
            <p>{{ t("publications.heroSubtitle") }}</p>
            <div class="publications-hero__accent" aria-hidden="true"><span></span><span></span><span></span></div>
          </div>
        </div>
      </section>

      <section id="gvc" class="topic-section gvc-section">
        <header class="topic-heading topic-heading--gvc">
          <span class="topic-heading__accent" aria-hidden="true"></span>
          <div>
            <h1>{{ t("publications.gvcTitle") }}</h1>
            <p>{{ t("publications.gvcSubtitle") }}</p>
          </div>
        </header>

        <article class="featured-card">
          <div class="card-kicker"><span></span>{{ t("publications.featuredHeading") }}</div>
          <div class="featured-card__body">
            <div class="publication-cover">
              <img src="/images/bookcover.webp" :alt="t('publications.reportTitle')" decoding="async" />
              <span class="publication-cover__pages">{{ t("publications.pages", { count: 41 }) }}</span>
            </div>
            <div class="featured-card__details">
              <div class="publication-featured">{{ t("publications.featuredDate") }}</div>
              <h2>{{ t("publications.reportTitle") }}</h2>
              <h3>{{ t("publications.reportSubtitle") }}</h3>
              <p>{{ t("publications.description") }}</p>
              <div class="language-grid">
                <a class="language-option" :href="pdfLinks.english" target="_blank" rel="noopener noreferrer">
                  <q-icon name="description" /><span><strong>{{ t("publications.englishPdf") }}</strong><small>{{ t("publications.original") }}</small></span>
                </a>
                <a class="language-option" :href="pdfLinks.russian" target="_blank" rel="noopener noreferrer">
                  <q-icon name="description" /><span><strong>{{ t("publications.russianPdf") }}</strong><small>{{ t("publications.machineTranslated") }}</small></span>
                </a>
              </div>
            </div>
          </div>
        </article>

        <article class="monitor-card">
          <div class="card-kicker"><span></span>{{ t("publications.monitorEyebrow") }}</div>
          <img src="/images/tradeSupplyChainMonitor.webp" :alt="t('publications.monitorTitle')" loading="lazy" decoding="async" />
          <div class="monitor-card__copy">
            <h2>{{ t("publications.monitorTitle") }}</h2>
            <p>{{ t("publications.monitorDescriptionStart") }}<strong>{{ t("publications.monitorDescriptionAnalyzer") }}</strong>{{ t("publications.monitorDescriptionEnd") }}</p>
          </div>
          <a class="primary-link" href="https://www.unescap.org/our-work/trade-investment-innovation/trade-policy-integration/trade-and-supply-chain-monitor" target="_blank" rel="noopener noreferrer">
            {{ t("publications.exploreMonitor") }}<q-icon name="open_in_new" />
          </a>
        </article>
      </section>

      <section id="rdti" class="topic-section rdti-section">
        <header class="topic-heading">
          <span class="topic-heading__accent" aria-hidden="true"></span>
          <div>
            <h2>{{ t("publications.rdtiTitle") }}</h2>
            <p>{{ t("publications.rdtiSubtitle") }}</p>
          </div>
        </header>

        <article class="resource-card guide-card">
          <div class="card-kicker"><span></span>{{ t("publications.guideLabel") }}</div>
          <img src="/images/pub2_2.webp" :alt="t('publications.guideTitle')" loading="lazy" decoding="async" />
          <div class="resource-card__copy">
            <div class="resource-labels"><span>{{ t("publications.guideLabel") }}</span><span>2025</span></div>
            <h3>{{ t("publications.guideTitle") }}</h3>
            <p>{{ t("publications.guideDescriptionFirst") }}</p>
            <p>
              {{ t("publications.guideDescriptionSecondStart") }}<a href="https://hdl.handle.net/20.500.12870/6849" target="_blank" rel="noopener noreferrer">{{ t("publications.previousGuide") }}</a>{{ t("publications.guideDescriptionSecondEnd") }}
            </p>
            <a class="secondary-link" href="https://www.unescap.org/kp/2025/regional-digital-trade-integration-index-rdtii-21-guide" target="_blank" rel="noopener noreferrer">{{ t("publications.viewGuide") }}<q-icon name="open_in_new" /></a>
          </div>
        </article>

        <article class="resource-card economy-card">
          <div class="card-kicker"><span></span>{{ t("publications.economyProfiles") }}</div>
          <img src="/images/economy-profiles-2025.webp" :alt="t('publications.economyProfiles')" loading="lazy" decoding="async" />
          <div class="resource-card__copy">
            <h3>{{ t("publications.economyProfiles") }}</h3>
            <p>{{ t("publications.economyProfilesDescription") }}</p>
            <a class="primary-link" href="https://www.unescap.org/projects/rcdtra/economy-profiles" target="_blank" rel="noopener noreferrer">{{ t("publications.exploreEconomyProfiles") }}<q-icon name="open_in_new" /></a>
          </div>
        </article>

        <section class="regulatory-card">
          <div class="card-kicker"><span></span>{{ t("publications.regulatoryReviewsTitle") }}</div>
          <p class="regulatory-card__intro">{{ t("publications.regulatoryReviewsSubtitle") }}</p>
          <div class="regulatory-grid">
            <div v-for="review in regulatoryReviews" :key="review.image" class="regulatory-item">
              <img :src="review.image" :alt="`${t(review.titleKey)} publication cover`" loading="lazy" decoding="async" />
              <span class="regulatory-item__copy"><strong>{{ t(review.titleKey) }}</strong><small>{{ t(review.descriptionKey) }}</small></span>
              <a class="regulatory-item__action" :href="review.url" target="_blank" rel="noopener noreferrer">{{ t("publications.viewOnEscap") }}<q-icon name="open_in_new" /></a>
            </div>
          </div>
        </section>
      </section>
    </main>
    <FooterMain />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import HeaderMain from "../components/Header.vue";
import VATitle from "../components/VATitle.vue";
import FooterMain from "../components/Footer.vue";

const { t } = useI18n({ useScope: "global" });

const pdfFiles = {
  english:
    "Identifying_Potential_Sectors_and_Enhancing_Value_Chain_Participation_in_NCA_EN.pdf",
  russian:
    "Identifying_Potential_Sectors_and_Enhancing_Value_Chain_Participation_in_NCA_RU.pdf",
};

const pdfLinks = {
  english: `https://riva.negotiatetrade.org/riva_docs/publications/${pdfFiles.english}`,
  russian: `https://riva.negotiatetrade.org/riva_docs/publications/${pdfFiles.russian}`,
};

const regulatoryReviews = [
  {
    image: "/images/pub4_1.webp",
    url: "https://www.unescap.org/kp/2025/digital-trade-regulatory-review-asia-and-pacific-2025",
    titleKey: "publications.reviewAsiaTitle",
    descriptionKey: "publications.reviewAsiaDescription",
  },
  {
    image: "/images/pub4_2.webp",
    url: "https://www.unescap.org/kp/2025/digital-trade-regulatory-review-asean-2025",
    titleKey: "publications.reviewAseanTitle",
    descriptionKey: "publications.reviewAseanDescription",
  },
  {
    image: "/images/pub4_3.webp",
    url: "https://www.unescap.org/kp/2026/digital-trade-regulatory-review-north-and-central-asia-2025#",
    titleKey: "publications.reviewNorthCentralAsiaTitle",
    descriptionKey: "publications.reviewNorthCentralAsiaDescription",
  },
  {
    image: "/images/pub4_4.webp",
    url: "https://www.unescap.org/kp/2026/digital-trade-regulatory-review-pacific-2025#",
    titleKey: "publications.reviewPacificTitle",
    descriptionKey: "publications.reviewPacificDescription",
  },
  {
    image: "/images/pub4_5.webp",
    url: "https://www.unescap.org/kp/2026/digital-trade-regulatory-review-south-and-south-west-asia-2025",
    titleKey: "publications.reviewSouthSouthWestAsiaTitle",
    descriptionKey: "publications.reviewSouthSouthWestAsiaDescription",
  },
];
</script>

<style scoped>
.publications-page { min-height: 100vh; color: #17365e; background: #fff; }
.publications-main { width: min(1200px, calc(100% - 48px)); margin: -64px auto 40px; position: relative; z-index: 2; }
.publications-hero { position: relative; min-height: 192px; overflow: hidden; isolation: isolate; color: #fff; border: 1px solid rgba(153,225,247,.28); border-radius: 12px; background: linear-gradient(90deg,rgba(3,34,59,.14),rgba(3,34,59,0) 58%),url('/images/publicationsHeroBg.webp') center 48% / cover no-repeat,#073856; box-shadow: 0 12px 30px rgba(4,38,58,.14); }
.publications-hero__grid, .publications-hero__glow { position: absolute; pointer-events: none; }
.publications-hero__grid { display: none; }
.publications-hero__glow { display: none; }
.publications-hero__glow::after { position: absolute; inset: 28px; border: 1px solid rgba(166,235,255,.12); border-radius: inherit; content: ''; }
.publications-hero__glow--top { top: -232px; right: 9%; }
.publications-hero__glow--bottom { right: -90px; bottom: -254px; }
.publications-hero__inner { position: relative; z-index: 1; display: flex; min-height: 192px; align-items: center; gap: 16px; padding: 24px 34px; }
.publications-hero__visual { position: relative; display: grid; width: 52px; height: 52px; flex: 0 0 52px; place-items: center; color: #fff; }
.publications-hero__orbit { position: absolute; border: 1px solid rgba(183,239,255,.42); border-radius: 50%; transform: rotate(-24deg); }
.publications-hero__orbit--outer { width: 162px; height: 94px; }
.publications-hero__orbit--inner { width: 126px; height: 150px; border-color: rgba(183,239,255,.21); transform: rotate(38deg); }
.publications-hero__icon-wrap { display: none; }
.publications-hero__icon { display: block; width: 48px; height: 42px; }
.publications-hero__dot { position: absolute; z-index: 2; width: 8px; height: 8px; border: 2px solid #0c496a; border-radius: 50%; background: #fdc300; box-shadow: 0 0 0 5px rgba(253,195,0,.12); }
.publications-hero__dot--one { top: 18px; right: 20px; }
.publications-hero__dot--two { bottom: 28px; left: 14px; width: 6px; height: 6px; background: #61d2f1; box-shadow: 0 0 0 5px rgba(97,210,241,.12); }
.publications-hero__copy { max-width: 780px; }
.publications-hero__eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 13px; color: #8fe0f6; font-size: .72rem; font-weight: 700; letter-spacing: .18em; }
.publications-hero__eyebrow-line { display: inline-block; width: 30px; height: 2px; background: #fdc300; }
.publications-hero__copy h1 { margin: 0; color: #fff; font-size: clamp(1.5rem,2.6vw,2rem); font-weight: 700; letter-spacing: -.018em; line-height: 1.02; }
.publications-hero__copy p { max-width: 735px; margin: 10px 0 0; color: rgba(245,252,255,.92); font-size: clamp(.92rem,1.25vw,1.05rem); line-height: 1.5; }
.publications-hero__accent { display: flex; gap: 6px; margin-top: 18px; }
.publications-hero__accent span { display: block; width: 28px; height: 4px; border-radius: 999px; background: #fdc300; }
.publications-hero__accent span:nth-child(2) { width: 10px; opacity: .6; }
.publications-hero__accent span:nth-child(3) { width: 5px; opacity: .35; }
.topic-section { padding: 30px 24px 26px; scroll-margin-top: 24px; }
.gvc-section { background: #fff; }
.topic-heading--gvc { min-height: 76px; align-items: center; }
.topic-heading { display: flex; align-items: flex-start; gap: 16px; margin: 0 0 18px; }
.topic-heading__accent { flex: 0 0 6px; width: 6px; height: 34px; margin-top: 2px; border-radius: 4px; background: #f4b400; }
.topic-heading h1, .topic-heading h2 { margin: 0; color: #193d68; font-size: clamp(1.45rem, 2.6vw, 2rem); font-weight: 750; line-height: 1.2; }
.topic-heading p { margin: 6px 0 0; color: #516982; font-size: 1rem; line-height: 1.5; }
.featured-card, .monitor-card, .resource-card, .regulatory-card { position: relative; border: 1px solid #d6e5f2; border-radius: 7px; background: #fff; box-shadow: 0 2px 8px rgba(19,64,105,.035); }
.featured-card { padding: 14px 24px 20px; }
.card-kicker { display: flex; align-items: center; gap: 12px; color: #0865b3; font-size: .83rem; font-weight: 750; line-height: 1.25; text-transform: uppercase; }
.card-kicker > span { display: block; width: 5px; height: 23px; border-radius: 3px; background: #0879d5; }
.featured-card > .card-kicker, .monitor-card > .card-kicker, .resource-card > .card-kicker, .regulatory-card > .card-kicker { position: static; margin: 0 0 10px; padding: 0; background: transparent; }
.featured-card__body { display: grid; grid-template-columns: minmax(145px,205px) minmax(0,1fr); gap: clamp(24px,4vw,40px); align-items: center; }
.publication-cover { position: relative; width: 100%; max-width: 195px; height: 290px; margin: 2px auto 0; }
.publication-cover img { width: 100%; height: 100%; object-fit: cover; box-shadow: 0 3px 10px rgba(9,41,72,.16); }
.publication-cover__pages { position: absolute; right: 6px; bottom: -11px; padding: 5px 12px; border-radius: 20px; color: #fff; background: #12375f; font-size: .72rem; font-weight: 700; white-space: nowrap; }
.publication-featured { margin-bottom: 7px; color: #0871c7; font-size: .8rem; font-weight: 700; }
.featured-card__details h2 { margin: 0 0 5px; color: #183a65; font-size: clamp(1.15rem,2.3vw,1.55rem); font-weight: 750; line-height: 1.22; }
.featured-card__details h3 { margin: 0 0 9px; color: #125ba0; font-size: 1rem; font-weight: 700; line-height: 1.35; }
.featured-card__details > p { max-width: 760px; margin: 0 0 16px; color: #52677e; font-size: .94rem; line-height: 1.5; }
.language-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; max-width: 590px; }
.language-option { display: flex; align-items: center; gap: 13px; min-height: 58px; padding: 9px 14px; border: 1px solid #1680e5; border-radius: 5px; color: #0769c4; text-decoration: none; }
.language-option:hover { background: #f2f8ff; }
.language-option > .q-icon { flex: 0 0 auto; font-size: 27px; }
.language-option span { display: grid; gap: 2px; }
.language-option strong { font-size: .88rem; }
.language-option small { color: #60768d; font-size: .78rem; }
.monitor-card { display: grid; grid-template-columns: 190px minmax(0,1fr) auto; align-items: center; gap: 16px 24px; margin-top: 16px; padding: 14px 18px 12px; }
.monitor-card > .card-kicker { grid-column: 1 / -1; }
.monitor-card > img { width: 100%; height: 112px; border-radius: 3px; object-fit: cover; object-position: center; }
.monitor-card__copy h2 { margin: 0 0 5px; color: #193d68; font-size: 1.15rem; font-weight: 750; }
.monitor-card__copy p { max-width: 570px; margin: 0; color: #536b83; font-size: .9rem; line-height: 1.45; }
.primary-link, .secondary-link { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 40px; padding: 9px 14px; border: 1px solid #0879d5; border-radius: 4px; color: #fff; background: #0879d5; font-size: .83rem; font-weight: 700; text-decoration: none; white-space: nowrap; }
.primary-link:hover { background: #0865b3; }
.primary-link .q-icon, .secondary-link .q-icon { font-size: 16px; }
.rdti-section { margin-top: 24px; padding-top: 30px; background: #eaf7fc; }
.rdti-section .topic-heading { margin-bottom: 20px; }
.resource-card { display: grid; grid-template-columns: 145px minmax(0,1fr); gap: 14px 24px; align-items: center; margin: 0 0 12px; padding: 14px 22px 8px; }
.resource-card > .card-kicker { grid-column: 1 / -1; }
.resource-card > img { width: 100%; height: 155px; object-fit: cover; object-position: top; border-radius: 2px; }
.guide-card > img { object-fit: contain; object-position: center; }
.resource-card__copy { min-width: 0; }
.resource-labels { display: flex; gap: 8px; margin-bottom: 7px; }
.resource-labels > span { padding: 3px 7px; border-radius: 3px; color: #0871c7; background: #e7f3ff; font-size: .68rem; font-weight: 750; }
.resource-card__copy h3 { margin: 0 0 4px; color: #193d68; font-size: 1.15rem; font-weight: 750; line-height: 1.3; }
.resource-card__copy p { margin: 0 0 9px; color: #526b83; font-size: .9rem; line-height: 1.45; }
.secondary-link { min-height: 34px; padding: 6px 12px; color: #0871c7; background: #fff; }
.secondary-link:hover { color: #fff; background: #0879d5; }
.region-tags { display: flex; flex-wrap: wrap; gap: 0; margin: 5px 0 8px; color: #60768d; font-size: .78rem; }
.region-tags span { padding: 0 10px; border-right: 1px solid #b9cbdc; }
.region-tags span:first-child { padding-left: 0; }
.region-tags span:last-child { border-right: 0; }
.economy-card > img { height: 155px; object-fit: contain; object-position: center; }
.regulatory-card { margin-top: 12px; padding: 14px 12px 10px; }
.regulatory-card__intro { margin: 0 6px 8px; color: #536b83; font-size: .88rem; }
.regulatory-grid { display: grid; grid-template-columns: minmax(0,1fr); column-gap: 20px; }
.regulatory-item { display: grid; grid-template-columns: 62px minmax(0,1fr) auto; align-items: center; gap: 10px; min-width: 0; padding: 9px 5px; border-bottom: 1px solid #e0eaf2; color: inherit; text-decoration: none; }
a.regulatory-item:hover { background: #f8fbfe; }
.regulatory-item > img { width: 58px; height: 76px; object-fit: cover; }
.regulatory-item__copy { display: grid; align-content: center; min-width: 0; }
.regulatory-item__copy .resource-labels { margin-bottom: 4px; }
.regulatory-item__copy strong { color: #193d68; font-size: .84rem; line-height: 1.25; }
.regulatory-item__copy small { margin-top: 3px; color: #5c7187; font-size: .74rem; line-height: 1.3; }
.regulatory-item__action { display: inline-flex; align-items: center; gap: 5px; padding: 7px 9px; border: 1px solid #1480dc; border-radius: 3px; color: #0871c7; font-size: .72rem; font-weight: 700; text-decoration: none; white-space: nowrap; }
.regulatory-item__action .q-icon { font-size: 15px; }
@media (min-width:761px) and (max-width:1024px) {
 .publications-main { width: calc(100% - 40px); margin-top: -104px; }
 .topic-section { padding-inline: 20px; }
 .monitor-card { grid-template-columns: 160px minmax(0,1fr); column-gap: 20px; }
 .monitor-card > .primary-link { grid-column: 2; justify-self: start; }
 .regulatory-grid { grid-template-columns: minmax(0,1fr); }
 .regulatory-item { grid-column: auto !important; grid-row: auto !important; grid-template-columns: 62px minmax(0,1fr) auto; }
}
@media (max-width:760px) {
 .publications-main { width: min(calc(100% - 28px),620px); margin-top: -104px; }
 .publications-hero__inner { gap: 14px; padding-inline: 24px; }
 .publications-hero__visual { width: 48px; height: 48px; flex-basis: 48px; }
 .publications-hero__icon { width: 46px; height: 40px; }
 .topic-section { padding: 24px 14px 18px; }
 .featured-card { padding: 24px 14px 18px; }
 .featured-card__body { grid-template-columns: 125px minmax(0,1fr); gap: 18px; align-items: start; }
 .publication-cover { height: 190px; }
 .featured-card__details h2 { font-size: 1.08rem; }
 .featured-card__details h3 { font-size: .88rem; }
 .featured-card__details > p { font-size: .84rem; }
 .language-grid { grid-template-columns: 1fr; gap: 8px; }
 .language-option { min-height: 50px; }
 .monitor-card { grid-template-columns: 130px minmax(0,1fr); gap: 14px; padding: 26px 12px 12px; }
 .monitor-card > img { height: 92px; }
 .monitor-card > .primary-link { grid-column: 1 / -1; justify-self: end; }
 .resource-card { grid-template-columns: 105px minmax(0,1fr); gap: 14px; padding: 24px 12px 12px; }
 .resource-card > img { height: 130px; }
 .economy-card > img { height: 130px; }
 .rdti-section .resource-card { grid-template-columns: minmax(0,1fr); gap: 14px; padding: 18px 14px 16px; }
 .rdti-section .resource-card > .card-kicker, .rdti-section .resource-labels { display: none; }
 .rdti-section .resource-card > img { grid-column: 1; width: min(100%,180px); height: 240px; margin: 0 auto; object-fit: contain; object-position: center; }
 .rdti-section .resource-card__copy h3 { margin-bottom: 8px; }
 .regulatory-grid { grid-template-columns: 1fr; }
 .regulatory-item { grid-column: auto !important; grid-row: auto !important; grid-template-columns: minmax(0,1fr); gap: 10px; padding: 12px 5px; }
 .regulatory-item > img { width: min(100%,150px); height: 210px; justify-self: center; object-fit: contain; }
 .regulatory-item__action { grid-column: 1; justify-self: start; }
}
@media (max-width:480px) {
 .publications-main { width: calc(100% - 20px); }
 .publications-hero { min-height: 0; border-radius: 18px; }
 .publications-hero { background-position: 68% center; }
 .publications-hero__inner { grid-template-columns: 42px minmax(0,1fr); gap: 10px; min-height: 0; padding: 22px 12px; }
 .publications-hero__visual { width: 42px; height: 42px; flex-basis: auto; }
 .publications-hero__icon { width: 40px; height: 35px; }
 .publications-hero__eyebrow { gap: 7px; margin-bottom: 8px; font-size: .62rem; letter-spacing: .12em; }
 .publications-hero__eyebrow-line { width: 22px; }
 .publications-hero__copy h1 { font-size: clamp(1.3rem,6.5vw,1.8rem); }
 .publications-hero__copy p { margin-top: 8px; font-size: .8rem; line-height: 1.4; }
 .publications-hero__accent { margin-top: 10px; }
 .topic-section { padding-inline: 10px; }
 .topic-heading { gap: 11px; }
 .topic-heading p { font-size: .88rem; }
 .featured-card__body { grid-template-columns: 1fr; }
 .publication-cover { width: min(58%,175px); height: 240px; margin: 0 auto 8px; }
 .featured-card__details h2 { font-size: 1.16rem; }
 .language-grid { grid-template-columns: 1fr 1fr; }
 .language-option { gap: 7px; padding: 8px; }
 .language-option > .q-icon { font-size: 22px; }
 .language-option strong { font-size: .76rem; }
 .language-option small { font-size: .68rem; }
 .monitor-card { grid-template-columns: 1fr; }
 .monitor-card > img { height: 150px; }
 .monitor-card > .primary-link { grid-column: auto; justify-self: stretch; }
 .resource-card { grid-template-columns: 84px minmax(0,1fr); gap: 10px; padding-inline: 9px; }
 .resource-card > img { height: 116px; }
 .resource-card__copy h3 { font-size: .98rem; }
 .resource-card__copy p { font-size: .82rem; }
 .region-tags { font-size: .7rem; }
 .region-tags span { padding-inline: 6px; }
 .regulatory-item { grid-template-columns: minmax(0,1fr); gap: 10px; }
 .regulatory-item > img { width: min(100%,150px); height: 210px; }
 .regulatory-item__action { grid-column: 1; justify-self: start; padding: 5px 8px; }
}
</style>
