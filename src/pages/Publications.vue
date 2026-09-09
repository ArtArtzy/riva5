<template>
  <div class="publications-page">
    <HeaderMain class="!z-[1000]" />
    <VATitle menu="Publications" />

    <main
      class="publications-main max-w-[1200px] w-[95%] mx-auto mt-15 mt-[-100px] relative z-100"
    >
      <section class="publications-hero">
        <div class="publications-hero__grid" aria-hidden="true"></div>
        <div class="publications-hero__glow publications-hero__glow--top"></div>
        <div class="publications-hero__glow publications-hero__glow--bottom"></div>

        <div class="publications-hero__inner">
          <div class="publications-hero__visual" aria-hidden="true">
            <div class="publications-hero__orbit publications-hero__orbit--outer"></div>
            <div class="publications-hero__orbit publications-hero__orbit--inner"></div>
            <div class="publications-hero__icon-wrap">
              <img src="/images/research.svg" alt="" class="publications-hero__icon" />
            </div>
            <span class="publications-hero__dot publications-hero__dot--one"></span>
            <span class="publications-hero__dot publications-hero__dot--two"></span>
          </div>

          <div class="publications-hero__copy">
            <div class="publications-hero__eyebrow">
              <span class="publications-hero__eyebrow-line"></span>
              {{ t("publications.heroEyebrow") }}
            </div>
            <h1>{{ t("publications.heroTitle") }}</h1>
            <p>{{ t("publications.heroSubtitle") }}</p>
            <div class="publications-hero__accent" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </section>

      <section class="publication-card">
        <div class="publication-card__heading">
          <span class="publication-card__heading-accent" aria-hidden="true"></span>
          <span>{{ t("publications.featuredHeading") }}</span>
        </div>

        <div class="publication-card__content">
          <div class="publication-cover">
            <img
              src="/images/bookcover.webp"
              :alt="t('publications.reportTitle')"
              decoding="async"
              class="publication-cover__image"
            />
            <span class="publication-cover__pages">
              {{ t("publications.pages", { count: 41 }) }}
            </span>
          </div>

          <div class="publication-details">
            <div class="publication-featured">
              {{ t("publications.featuredDate") }}
            </div>
            <h2>{{ t("publications.reportTitle") }}</h2>
            <h3>{{ t("publications.reportSubtitle") }}</h3>
            <p class="publication-description">
              {{ t("publications.description") }}
            </p>

            <div class="language-grid">
              <q-btn
                outline
                no-caps
                align="left"
                color="primary"
                class="language-option"
                :href="pdfLinks.english"
                target="_blank"
                rel="noopener noreferrer"
              >
                <q-icon name="description" size="28px" class="language-option__icon" />
                <div class="language-option__copy">
                  <strong>{{ t("publications.englishPdf") }}</strong>
                  <span>{{ t("publications.original") }}</span>
                </div>
              </q-btn>

              <q-btn
                outline
                no-caps
                align="left"
                color="primary"
                class="language-option"
                :href="pdfLinks.russian"
                target="_blank"
                rel="noopener noreferrer"
              >
                <q-icon name="description" size="28px" class="language-option__icon" />
                <div class="language-option__copy">
                  <strong>{{ t("publications.russianPdf") }}</strong>
                  <span>{{ t("publications.machineTranslated") }}</span>
                </div>
              </q-btn>
            </div>
          </div>
        </div>
      </section>

      <section class="digital-trade-section">
        <div class="digital-trade-section__header">
          <div class="digital-trade-section__heading">
            <span class="digital-trade-section__accent" aria-hidden="true"></span>
            <div>
              <div class="digital-trade-section__eyebrow">{{ t("publications.exploreTitle") }}</div>
              <p>
                {{ t("publications.exploreSubtitle") }}
              </p>
            </div>
          </div>

        </div>

        <div class="digital-trade-section__grid">
          <article class="digital-trade-resource">
            <img
              src="/images/pub2_1.webp"
              :alt="t('publications.economyProfiles')"
              loading="lazy"
              decoding="async"
              class="digital-trade-resource__image"
            />
            <div class="digital-trade-resource__body">
              <div class="digital-trade-resource__title-row">
                <h3>{{ t("publications.economyProfiles") }}</h3>
              </div>
              <p>
                {{ t("publications.economyProfilesDescription") }}
              </p>
              <div class="digital-trade-resource__tags">
                <span>{{ t("publications.eastNorthEastAsia") }}</span>
                <span>{{ t("publications.southEastAsia") }}</span>
                <span>{{ t("publications.southSouthWestAsia") }}</span>
                <span>{{ t("publications.pacific") }}</span>
              </div>
              <a
                href="https://www.unescap.org/projects/rcdtra/economy-profiles"
                target="_blank"
                rel="noopener noreferrer"
                class="digital-trade-resource__button"
              >
                {{ t("publications.exploreEconomyProfiles") }}
                <q-icon name="open_in_new" size="16px" />
              </a>
            </div>
          </article>

          <article class="digital-trade-resource digital-trade-resource--guide">
            <img
              src="/images/pub2_2.webp"
              :alt="t('publications.guideTitle')"
              loading="lazy"
              decoding="async"
              class="digital-trade-resource__image"
            />
            <div class="digital-trade-resource__body">
              <div class="digital-trade-resource__labels">
                <span>{{ t("publications.guideLabel") }}</span>
                <span>2025</span>
              </div>
              <div class="digital-trade-resource__title-row">
                <h3>{{ t("publications.guideTitle") }}</h3>
              </div>
              <p>{{ t("publications.guideDescription") }}</p>
              <a
                href="https://www.unescap.org/kp/2025/regional-digital-trade-integration-index-rdtii-21-guide"
                target="_blank"
                rel="noopener noreferrer"
                class="digital-trade-resource__button digital-trade-resource__button--outline"
              >
                {{ t("publications.viewGuide") }}
                <q-icon name="open_in_new" size="16px" />
              </a>
            </div>
          </article>
        </div>

        <section class="key-publication">
          <div class="key-publication__heading">
            <span class="key-publication__accent" aria-hidden="true"></span>
            <div>
              <h2>{{ t("publications.referenceHeading") }}</h2>
              <p class="key-publication__subtitle">
                {{ t("publications.referenceSubtitle") }}
              </p>
            </div>
          </div>

          <a
            href="https://www.unescap.org/kp/2026/regional-digital-trade-integration-index-rdtii-21-economy-profiles"
            target="_blank"
            rel="noopener noreferrer"
            class="key-publication__card"
          >
            <img
              src="/images/pub3_1.webp"
              :alt="t('publications.referenceTitle')"
              loading="lazy"
              decoding="async"
              class="key-publication__image"
            />

            <div class="key-publication__content">
              <div class="key-publication__labels">
                <span>{{ t("publications.publicationLabel") }}</span>
                <span>2025</span>
              </div>
              <h3>{{ t("publications.referenceTitle") }}</h3>
              <p>
                {{ t("publications.referenceDescription") }}
              </p>
              <span class="key-publication__button">
                {{ t("publications.viewOnEscap") }}
                <q-icon name="open_in_new" size="16px" />
              </span>
            </div>

            <ul class="key-publication__highlights">
              <li><q-icon name="description" size="20px" />{{ t("publications.highlightCoverage") }}</li>
              <li><q-icon name="bar_chart" size="20px" />{{ t("publications.highlightAnalysis") }}</li>
              <li><q-icon name="groups" size="20px" />{{ t("publications.highlightMeasures") }}</li>
              <li><q-icon name="settings" size="20px" />{{ t("publications.highlightPolicy") }}</li>
            </ul>
          </a>
        </section>

        <section class="regulatory-reviews">
          <div class="regulatory-reviews__heading">
            <span class="regulatory-reviews__accent" aria-hidden="true"></span>
            <div>
              <h2>{{ t("publications.regulatoryReviewsTitle") }}</h2>
              <p>{{ t("publications.regulatoryReviewsSubtitle") }}</p>
            </div>
          </div>

          <div class="regulatory-reviews__grid">
            <a
              v-for="review in regulatoryReviews"
              :key="review.image"
              :href="review.url"
              target="_blank"
              rel="noopener noreferrer"
              class="regulatory-review-card"
            >
              <img
                :src="review.image"
                :alt="`${t(review.titleKey)} publication cover`"
                loading="lazy"
                decoding="async"
                class="regulatory-review-card__image"
              />
              <div class="regulatory-review-card__content">
                <div class="regulatory-review-card__labels">
                  <span>{{ t("publications.regulatoryReviewLabel") }}</span>
                  <span>2025</span>
                </div>
                <h3>{{ t(review.titleKey) }}</h3>
                <p>{{ t(review.descriptionKey) }}</p>
              </div>
              <span class="regulatory-review-card__button">
                {{ t("publications.viewOnEscap") }}
                <q-icon name="open_in_new" size="16px" />
              </span>
            </a>
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
.publications-page {
  min-height: 100vh;
  background: #fff;
  color: #252525;
}

.publications-main {
  margin-bottom: 40px;
}

.publications-hero {
  position: relative;
  min-height: 232px;
  overflow: hidden;
  isolation: isolate;
  color: #fff;
  border: 1px solid rgba(153, 225, 247, 0.28);
  border-radius: 24px;
  background:
    radial-gradient(circle at 92% 10%, rgba(78, 203, 239, 0.28), transparent 34%),
    linear-gradient(118deg, #062d46 0%, #0c496a 56%, #087d9f 100%);
  box-shadow: 0 22px 46px rgba(4, 38, 58, 0.2);
}

.publications-hero__grid,
.publications-hero__glow {
  position: absolute;
  pointer-events: none;
}

.publications-hero__grid {
  inset: 0;
  z-index: -1;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(90deg, transparent 0%, #000 42%, #000 100%);
}

.publications-hero__glow {
  z-index: -1;
  width: 320px;
  height: 320px;
  border: 1px solid rgba(166, 235, 255, 0.16);
  border-radius: 50%;
}

.publications-hero__glow::after {
  position: absolute;
  inset: 28px;
  border: 1px solid rgba(166, 235, 255, 0.12);
  border-radius: inherit;
  content: "";
}

.publications-hero__glow--top {
  top: -232px;
  right: 9%;
}

.publications-hero__glow--bottom {
  right: -90px;
  bottom: -254px;
}

.publications-hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 232px;
  align-items: center;
  gap: clamp(34px, 5vw, 74px);
  padding: 28px clamp(28px, 6vw, 78px);
}

.publications-hero__visual {
  position: relative;
  display: grid;
  width: 170px;
  height: 170px;
  flex: 0 0 170px;
  place-items: center;
}

.publications-hero__orbit {
  position: absolute;
  border: 1px solid rgba(183, 239, 255, 0.42);
  border-radius: 50%;
  transform: rotate(-24deg);
}

.publications-hero__orbit--outer {
  width: 162px;
  height: 94px;
}

.publications-hero__orbit--inner {
  width: 126px;
  height: 150px;
  border-color: rgba(183, 239, 255, 0.21);
  transform: rotate(38deg);
}

.publications-hero__icon-wrap {
  position: relative;
  z-index: 1;
  display: grid;
  width: 108px;
  height: 136px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  background: rgba(2, 37, 61, 0.32);
  box-shadow: 0 16px 34px rgba(2, 28, 44, 0.18), inset 0 0 0 8px rgba(255, 255, 255, 0.035);
  transform: rotate(-7deg);
}

.publications-hero__icon {
  width: 88px;
  height: 88px;
  transform: rotate(7deg);
}

.publications-hero__dot {
  position: absolute;
  z-index: 2;
  width: 8px;
  height: 8px;
  border: 2px solid #0c496a;
  border-radius: 50%;
  background: #fdc300;
  box-shadow: 0 0 0 5px rgba(253, 195, 0, 0.12);
}

.publications-hero__dot--one {
  top: 18px;
  right: 20px;
}

.publications-hero__dot--two {
  bottom: 28px;
  left: 14px;
  width: 6px;
  height: 6px;
  background: #61d2f1;
  box-shadow: 0 0 0 5px rgba(97, 210, 241, 0.12);
}

.publications-hero__copy {
  max-width: 780px;
}

.publications-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 13px;
  color: #8fe0f6;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.publications-hero__eyebrow-line {
  display: inline-block;
  width: 30px;
  height: 2px;
  background: #fdc300;
}

.publications-hero__copy h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(2rem, 3.7vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.02;
}

.publications-hero__copy p {
  max-width: 735px;
  margin: 14px 0 0;
  color: rgba(245, 252, 255, 0.88);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.5;
}

.publications-hero__accent {
  display: flex;
  gap: 6px;
  margin-top: 18px;
}

.publications-hero__accent span {
  display: block;
  width: 28px;
  height: 4px;
  border-radius: 999px;
  background: #fdc300;
}

.publications-hero__accent span:nth-child(2) {
  width: 10px;
  opacity: 0.6;
}

.publications-hero__accent span:nth-child(3) {
  width: 5px;
  opacity: 0.35;
}

.publication-card {
  width: min(1130px, calc(100% - 72px));
  margin: 24px auto 0;
  padding: 0 0 28px;
  border-bottom: 1px solid #e5edf2;
  background: #fff;
}

.publication-card__heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  color: #183b66;
  font-size: 1.2rem;
  font-weight: 700;
}

.publication-card__heading-accent {
  display: block;
  width: 5px;
  height: 24px;
  flex: 0 0 5px;
  border-radius: 1px;
  background: #fdc300;
}

.publication-card__content {
  display: grid;
  grid-template-columns: minmax(170px, 195px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.publication-cover {
  position: relative;
  width: min(100%, 185px);
  align-self: center;
  justify-self: center;
  aspect-ratio: 319 / 453;
  background: #06a9e2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.publication-cover__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.publication-cover__pages {
  position: absolute;
  right: 12px;
  bottom: -12px;
  padding: 5px 12px;
  color: #fff;
  background: #444;
  border-radius: 999px;
  font-size: 0.78rem;
}

.publication-details {
  min-width: 0;
}

.publication-featured {
  margin-bottom: 10px;
  color: #0c6eae;
  font-size: 0.72rem;
  font-weight: 600;
}

.publication-details h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.25vw, 1.95rem);
  font-weight: 700;
  line-height: 1.12;
}

.publication-details h3 {
  margin: 11px 0 13px;
  color: #0784c8;
  font-size: clamp(0.98rem, 1.55vw, 1.2rem);
  font-weight: 700;
  line-height: 1.25;
}

.publication-description {
  max-width: 760px;
  margin: 0 0 17px;
  color: #707070;
  font-size: 0.86rem;
  line-height: 1.35;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 245px));
  gap: 14px;
  justify-content: start;
}

.language-option {
  width: 100%;
  min-width: 0;
  min-height: 64px;
  padding: 8px 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #dce5ec;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(19, 57, 84, 0.04);
  text-align: left;
}

.language-option:hover {
  background: #f5fbff;
}

.language-option :deep(.q-btn__content) {
  width: 100%;
  justify-content: flex-start;
  gap: 12px;
}

.language-option__icon {
  flex: 0 0 auto;
  color: #0c78bc;
}

.language-option__copy {
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
}

.language-option__copy strong {
  color: #0c6eae;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.15;
}

.language-option__copy span {
  color: #6d7881;
  font-size: 0.68rem;
  line-height: 1.3;
}

.digital-trade-section {
  width: min(1130px, calc(100% - 72px));
  margin: 0 auto;
  border-bottom: 1px solid #e5edf2;
  background: #fff;
}

.digital-trade-section__header {
  display: flex;
  min-height: 0;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 12px;
}

.digital-trade-section__heading {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.digital-trade-section__accent {
  display: block;
  width: 6px;
  height: 24px;
  flex: 0 0 6px;
  margin-top: 2px;
  border-radius: 2px;
  background: #fdc300;
}

.digital-trade-section__eyebrow {
  color: #183b66;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.05;
}

.digital-trade-section__heading p {
  max-width: 720px;
  margin: 4px 0 0;
  color: #5d7285;
  font-size: 0.78rem;
  line-height: 1.4;
}

.digital-trade-section__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 0 0 22px;
}

.key-publication {
  padding: 18px 0 22px;
  border-top: 1px solid #e5edf2;
}

.key-publication__heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.key-publication__accent {
  display: block;
  width: 5px;
  height: 24px;
  flex: 0 0 5px;
  border-radius: 2px;
  background: #fdc300;
}

.key-publication__heading h2 {
  margin: 0;
  color: #173e70;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.1;
}

.key-publication__subtitle {
  margin: 4px 0 0;
  color: #5d7285;
  font-size: 0.78rem;
  line-height: 1.35;
}

.key-publication__card {
  display: grid;
  grid-template-columns: 100px minmax(0, 1.2fr) minmax(220px, 0.8fr);
  gap: 18px;
  align-items: center;
  padding: 10px 14px 10px 10px;
  color: inherit;
  border: 1px solid #d8e6ef;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(34, 87, 119, 0.07);
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.key-publication__card:hover {
  border-color: #8dc7e6;
  box-shadow: 0 6px 18px rgba(34, 87, 119, 0.12);
}

.key-publication__image {
  width: 100px;
  height: 136px;
  display: block;
  border-radius: 3px;
  background: #eef6fb;
  object-fit: contain;
  object-position: center;
}

.key-publication__content {
  min-width: 0;
}

.key-publication__labels {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.key-publication__labels span {
  padding: 3px 7px;
  color: #157dc1;
  border-radius: 3px;
  background: #eaf7ff;
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1;
}

.key-publication__content h3 {
  margin: 0;
  color: #173e70;
  font-size: clamp(1.05rem, 1.7vw, 1.35rem);
  font-weight: 700;
  line-height: 1.15;
}

.key-publication__content p {
  margin: 9px 0 0;
  color: #5a7690;
  font-size: 0.78rem;
  line-height: 1.42;
}

.key-publication__button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 13px;
  padding: 8px 13px;
  color: #0879c6;
  border: 1px solid #0879c6;
  border-radius: 3px;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.2;
}

.key-publication__card:hover .key-publication__button {
  color: #fff;
  background: #0879c6;
}

.key-publication__highlights {
  display: grid;
  gap: 13px;
  margin: 0;
  padding: 0 0 0 20px;
  color: #5a7690;
  border-left: 1px solid #d8e6ef;
  font-size: 0.72rem;
  line-height: 1.3;
  list-style: none;
}

.key-publication__highlights li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.key-publication__highlights .q-icon {
  flex: 0 0 20px;
  color: #0879c6;
}

.regulatory-reviews {
  padding: 18px 0 22px;
  border-top: 1px solid #e5edf2;
}

.regulatory-reviews__heading {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.regulatory-reviews__accent {
  display: block;
  width: 5px;
  height: 24px;
  flex: 0 0 5px;
  margin-top: 1px;
  border-radius: 2px;
  background: #fdc300;
}

.regulatory-reviews__heading h2 {
  margin: 0;
  color: #173e70;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.1;
}

.regulatory-reviews__heading p {
  margin: 4px 0 0;
  color: #5d7285;
  font-size: 0.78rem;
  line-height: 1.4;
}

.regulatory-reviews__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, auto));
  grid-auto-flow: column;
  gap: 0 18px;
}

.regulatory-review-card {
  display: grid;
  min-width: 0;
  grid-template-columns: 62px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  color: inherit;
  border-bottom: 1px solid #e5edf2;
  background: #fff;
  text-decoration: none;
  transition: background 0.2s ease;
}

.regulatory-review-card:hover {
  background: #f7fbfe;
}

.regulatory-review-card:nth-child(n + 4) {
  padding-left: 18px;
  border-left: 1px solid #d8e6ef;
}

.regulatory-review-card__image {
  width: 62px;
  height: 76px;
  display: block;
  border-radius: 3px;
  background: #eef6fb;
  object-fit: contain;
  object-position: center;
}

.regulatory-review-card__content {
  min-width: 0;
}

.regulatory-review-card__labels {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 7px;
}

.regulatory-review-card__labels span {
  padding: 3px 6px;
  color: #157dc1;
  border-radius: 3px;
  background: #eaf7ff;
  font-size: 0.56rem;
  font-weight: 700;
  line-height: 1;
}

.regulatory-review-card__content h3 {
  margin: 0;
  color: #173e70;
  font-size: clamp(0.78rem, 1.1vw, 0.92rem);
  font-weight: 700;
  line-height: 1.18;
}

.regulatory-review-card__content p {
  margin: 4px 0 0;
  color: #5a7690;
  font-size: 0.64rem;
  line-height: 1.35;
}

.regulatory-review-card__button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  color: #0879c6;
  border: 1px solid #0879c6;
  border-radius: 3px;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.regulatory-review-card:hover .regulatory-review-card__button {
  color: #fff;
  background: #0879c6;
}

.digital-trade-resource {
  display: grid;
  min-height: 170px;
  min-width: 0;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 12px;
  padding: 10px;
  overflow: hidden;
  border: 1px solid #d8e6ef;
  border-radius: 4px;
  background: #f3faff;
  box-shadow: none;
}

.digital-trade-resource__image {
  width: 120px;
  height: 150px;
  display: block;
  border-radius: 3px;
  background: #eef6fb;
  object-fit: contain;
  object-position: center;
}

.digital-trade-resource__body {
  min-width: 0;
  padding: 16px 16px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.digital-trade-resource__title-row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
}

.digital-trade-resource__title-row h3 {
  margin: 0;
  color: #173e70;
  font-size: clamp(1rem, 1.55vw, 1.25rem);
  font-weight: 700;
  line-height: 1.12;
}

.digital-trade-resource__title-arrow {
  display: grid;
  width: 23px;
  height: 23px;
  flex: 0 0 23px;
  place-items: center;
  color: #147ec4;
  border-radius: 50%;
  background: #eef8ff;
  font-size: 1.55rem;
  line-height: 1;
}

.digital-trade-resource__body p {
  margin: 9px 0 0;
  color: #5a7690;
  font-size: 0.78rem;
  line-height: 1.4;
}

.digital-trade-resource__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 0;
  margin-top: 10px;
  color: #718da4;
  font-size: 0.62rem;
  line-height: 1.3;
}

.digital-trade-resource__tags span:not(:last-child)::after {
  margin: 0 6px;
  color: #9ab0bf;
  content: "|";
}

.digital-trade-resource__labels {
  display: flex;
  gap: 6px;
  margin-bottom: 9px;
}

.digital-trade-resource__labels span {
  padding: 3px 7px;
  color: #157dc1;
  border-radius: 3px;
  background: #eaf7ff;
  font-size: 0.6rem;
  font-weight: 700;
  line-height: 1;
}

.digital-trade-resource__button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  padding: 8px 13px;
  color: #fff;
  border: 1px solid #0879c6;
  border-radius: 3px;
  background: #0879c6;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.digital-trade-resource__button:hover {
  background: #0666a7;
}

.digital-trade-resource__button--outline {
  color: #0879c6;
  background: #fff;
}

.digital-trade-resource__button--outline:hover {
  color: #fff;
  background: #0879c6;
}

@media (max-width: 900px) {
  .publications-hero__inner {
    gap: 28px;
    padding-inline: 32px;
  }

  .publications-hero__visual {
    width: 156px;
    height: 156px;
    flex-basis: 156px;
  }

  .publications-hero__orbit--outer {
    width: 150px;
    height: 88px;
  }

  .publications-hero__orbit--inner {
    width: 116px;
    height: 140px;
  }

  .publications-hero__icon-wrap {
    width: 102px;
    height: 128px;
    border-radius: 26px;
  }

  .publications-hero__icon {
    width: 84px;
    height: 84px;
  }

  .publication-card {
    width: calc(100% - 24px);
    padding: 18px 20px 26px;
  }

  .publication-card__content {
    grid-template-columns: minmax(165px, 185px) minmax(0, 1fr);
    gap: 28px;
  }

  .language-grid { grid-template-columns: minmax(0, 245px); }

  .digital-trade-section {
    width: calc(100% - 24px);
  }

  .digital-trade-section__header {
    padding-inline: 22px;
  }

  .key-publication {
    padding-inline: 22px;
  }

  .key-publication__card {
    grid-template-columns: 96px minmax(0, 1fr) minmax(190px, 0.9fr);
    gap: 14px;
    padding-right: 12px;
  }

  .key-publication__image {
    width: 96px;
    height: 132px;
  }

  .regulatory-reviews {
    padding-inline: 22px;
  }

  .regulatory-reviews__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .regulatory-review-card {
    grid-template-columns: 76px minmax(0, 1fr) auto;
    gap: 10px;
  }

  .regulatory-review-card__image {
    width: 76px;
    height: 104px;
  }

  .digital-trade-resource {
    min-height: 164px;
    grid-template-columns: 110px minmax(0, 1fr);
  }

  .digital-trade-resource__image {
    width: 110px;
    height: 138px;
  }
}

@media (max-width: 640px) {
  .publications-main {
    margin-bottom: 24px;
  }

  .publications-hero {
    min-height: 0;
    border-radius: 18px;
  }

  .publications-hero__inner {
    min-height: 0;
    align-items: flex-start;
    gap: 22px;
    padding: 30px 22px 32px;
  }

  .publications-hero__visual {
    width: 92px;
    height: 92px;
    flex-basis: 92px;
  }

  .publications-hero__orbit--outer {
    width: 92px;
    height: 56px;
  }

  .publications-hero__orbit--inner {
    width: 70px;
    height: 88px;
  }

  .publications-hero__icon-wrap {
    width: 68px;
    height: 84px;
    border-radius: 18px;
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.035);
  }

  .publications-hero__icon {
    width: 58px;
    height: 58px;
  }

  .publications-hero__dot--one {
    top: 4px;
    right: 3px;
  }

  .publications-hero__dot--two {
    bottom: 8px;
    left: 2px;
  }

  .publications-hero__eyebrow {
    margin-bottom: 9px;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
  }

  .publications-hero__eyebrow-line {
    width: 20px;
  }

  .publications-hero__copy h1 {
    font-size: clamp(1.7rem, 8vw, 2.35rem);
  }

  .publications-hero__copy p {
    margin-top: 12px;
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .publications-hero__accent {
    margin-top: 16px;
  }

  .publication-card {
    width: 100%;
    margin-top: 18px;
    padding: 18px 18px 28px;
    gap: 24px;
  }

  .publication-card__heading {
    margin-bottom: 18px;
  }

  .publication-card__content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .publication-cover {
    width: min(100%, 220px);
    margin: 0 auto;
  }

  .publication-details {
    padding-top: 0;
  }

  .publication-details h2 {
    font-size: 1.75rem;
  }

  .language-option { padding: 10px 14px; }

  .digital-trade-section {
    width: 100%;
    margin-top: 18px;
  }

  .digital-trade-section__header {
    min-height: 0;
    padding: 20px 18px 18px;
  }

  .digital-trade-section__grid {
    grid-template-columns: 1fr;
    padding: 0 18px 18px;
  }

  .key-publication {
    padding: 18px 18px 18px;
  }

  .key-publication__card {
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 14px;
    padding: 10px 12px;
  }

  .key-publication__image {
    width: 90px;
    height: 125px;
  }

  .key-publication__highlights {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 14px;
    padding: 13px 0 0;
    border-top: 1px solid #d8e6ef;
    border-left: 0;
  }

  .regulatory-reviews {
    padding: 18px 18px 18px;
  }

  .regulatory-reviews__grid {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    grid-auto-flow: row;
  }

  .regulatory-review-card {
    grid-template-columns: 92px minmax(0, 1fr) auto;
  }

  .regulatory-review-card:nth-child(n + 4) {
    padding-left: 0;
    border-left: 0;
  }

  .regulatory-review-card__image {
    width: 92px;
    height: 138px;
  }

  .digital-trade-resource {
    min-height: 150px;
    grid-template-columns: 100px minmax(0, 1fr);
  }

  .digital-trade-resource__image {
    width: 100px;
    height: 126px;
  }

  .digital-trade-resource__body {
    padding: 13px 12px;
  }
}

@media (max-width: 460px) {
  .publications-hero__inner {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 16px;
    padding-inline: 18px;
  }

  .publications-hero__visual {
    width: 78px;
    height: 78px;
    flex-basis: auto;
  }

  .publications-hero__orbit--outer {
    width: 78px;
    height: 48px;
  }

  .publications-hero__orbit--inner {
    width: 60px;
    height: 76px;
  }

  .publications-hero__icon-wrap {
    width: 58px;
    height: 72px;
    border-radius: 15px;
  }

  .publications-hero__icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 460px) {
  .digital-trade-section__heading h2 {
    font-size: 1rem;
  }

  .digital-trade-section__heading p {
    font-size: 0.72rem;
  }

  .digital-trade-resource {
    min-height: 134px;
    grid-template-columns: 90px minmax(0, 1fr);
  }

  .digital-trade-resource__image {
    width: 90px;
    height: 115px;
  }

  .digital-trade-resource__body {
    padding: 11px 10px;
  }

  .key-publication__card {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 13px;
  }

  .key-publication__image {
    width: 100px;
    height: 132px;
  }

  .key-publication__content {
    width: 100%;
  }

  .key-publication__highlights {
    grid-column: auto;
    grid-template-columns: 1fr;
    width: 100%;
  }

  .regulatory-review-card {
    grid-template-columns: 84px minmax(0, 1fr) auto;
    gap: 10px;
    padding: 8px 0;
  }

  .regulatory-review-card__image {
    width: 78px;
    height: 118px;
  }

  .digital-trade-resource__title-row h3 {
    font-size: 0.95rem;
  }

  .digital-trade-resource__body p {
    font-size: 0.72rem;
  }

  .digital-trade-resource__tags {
    font-size: 0.58rem;
  }
}

</style>
