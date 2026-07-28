<template>
  <div class="publications-page">
    <HeaderMain class="!z-[1000]" />
    <VATitle menu="Publications" />

    <main
      class="publications-main max-w-[1200px] w-[95%] mx-auto mt-15 mt-[-100px] relative z-100"
    >
      <section
        class="publications-hero rounded-sm p-4"
        style="background: linear-gradient(-45deg, #113347 0%, #185172 57%, #133448 100%)"
      >
        <div class="flex gap-2 p-6 lg:px-16 gt-xs">
          <div class="w-30">
            <img src="/images/research.svg" alt="" />
          </div>
          <div class="fwhite flex-1">
            <div class="md:text-2xl lg:text-4xl font-semibold">
              {{ t("publications.heroTitle") }}
            </div>
            <div class="md:text-base lg:text-lg">
              {{ t("publications.heroSubtitle") }}
            </div>
          </div>
        </div>

        <div class="lt-sm">
          <div class="flex gap-2 p-2 items-center">
            <div class="w-10">
              <img src="/images/research.svg" alt="" />
            </div>
            <div class="text-xl font-semibold fwhite">
              {{ t("publications.heroTitle") }}
            </div>
          </div>
          <div class="fwhite">
            {{ t("publications.heroSubtitle") }}
          </div>
        </div>
      </section>

      <section class="publication-card">
        <div class="publication-cover">
          <img
            src="/images/bookcover.png"
            :alt="t('publications.reportTitle')"
            class="publication-cover__image"
          />
          <span class="publication-cover__pages">
            {{ t("publications.pages", { count: 41 }) }}
          </span>
        </div>

        <div class="publication-details">
          <div class="publication-featured">
            {{ t("publications.featured") }}
          </div>
          <h2>{{ t("publications.reportTitle") }}</h2>
          <h3>{{ t("publications.reportSubtitle") }}</h3>
          <p class="publication-description">
            {{ t("publications.description") }}
          </p>

          <div class="language-heading">
            {{ t("publications.chooseLanguage") }}
          </div>
          <div class="language-grid">
            <article class="language-option">
              <div class="language-option__badge language-option__badge--en">
                EN
              </div>
              <div class="language-option__copy">
                <strong>{{ t("publications.english") }}</strong>
                <span>{{ t("publications.original") }}</span>
              </div>
              <q-btn
                outline
                no-caps
                color="primary"
                :label="t('publications.pdf')"
                class="pdf-button"
                :href="pdfLinks.english"
                target="_blank"
                rel="noopener noreferrer"
              />
            </article>

            <article class="language-option">
              <div class="language-option__badge language-option__badge--ru">
                RU
              </div>
              <div class="language-option__copy">
                <strong>{{ t("publications.russian") }}</strong>
                <span>{{ t("publications.machineTranslated") }}</span>
              </div>
              <q-btn
                outline
                no-caps
                color="primary"
                :label="t('publications.pdf')"
                class="pdf-button"
                :href="pdfLinks.russian"
                target="_blank"
                rel="noopener noreferrer"
              />
            </article>
          </div>
        </div>
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
  color: #fff;
}

.publication-card {
  width: min(1130px, calc(100% - 72px));
  margin: 28px auto 0;
  padding: 46px 58px;
  display: grid;
  grid-template-columns: minmax(230px, 300px) minmax(0, 1fr);
  gap: 38px;
  border: 1px solid #c8c8c8;
  border-left: 8px solid #fdc300;
  border-radius: 4px;
  background: #fff;
}

.publication-cover {
  position: relative;
  width: 100%;
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
  padding-top: 18px;
}

.publication-featured {
  margin-bottom: 16px;
  color: #ff6d1f;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.publication-details h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  font-weight: 700;
  line-height: 1.08;
}

.publication-details h3 {
  margin: 18px 0 20px;
  color: #0784c8;
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  font-weight: 700;
  line-height: 1.25;
}

.publication-description {
  max-width: 760px;
  margin: 0 0 26px;
  color: #707070;
  font-size: 1rem;
  line-height: 1.35;
}

.language-heading {
  margin-bottom: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.language-option {
  min-width: 0;
  min-height: 86px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #d2d7dc;
  border-radius: 4px;
  background: #f8fafb;
}

.language-option__badge {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
}

.language-option__badge--en {
  background: #0c87c6;
}

.language-option__badge--ru {
  background: #f47b20;
}

.language-option__copy {
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.language-option__copy strong {
  font-size: 1.05rem;
  font-weight: 500;
}

.language-option__copy span {
  font-size: 0.75rem;
}

.pdf-button {
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .publication-card {
    width: calc(100% - 24px);
    padding: 34px;
    grid-template-columns: minmax(190px, 240px) minmax(0, 1fr);
    gap: 28px;
  }

  .language-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .publications-main {
    margin-bottom: 24px;
  }

  .publication-card {
    width: 100%;
    margin-top: 18px;
    padding: 24px 18px 28px;
    grid-template-columns: 1fr;
    gap: 24px;
    border-left-width: 5px;
  }

  .publication-cover {
    width: min(100%, 280px);
    margin: 0 auto;
  }

  .publication-details {
    padding-top: 0;
  }

  .publication-details h2 {
    font-size: 1.75rem;
  }

  .language-option {
    padding: 12px;
  }
}

@media (max-width: 380px) {
  .language-option {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .pdf-button {
    width: 100%;
  }
}
</style>
