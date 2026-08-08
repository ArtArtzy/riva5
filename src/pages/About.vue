<template>
  <div class="about-page">
    <HeaderMain />

    <main class="about-page__main">
      <div class="about-page__container">
        <section class="about-page__intro" aria-labelledby="about-page-title">
          <div class="about-page__eyebrow">RIVA</div>
          <h1 id="about-page-title">{{ t("aboutPage.title") }}</h1>
          <p class="about-page__lead">{{ t("aboutPage.intro") }}</p>
        </section>

        <article class="about-page__content">
          <p>{{ t("aboutPage.description") }}</p>

          <section class="about-page__section">
            <h2>{{ t("aboutPage.whyTitle") }}</h2>
            <p>{{ t("aboutPage.whyDescription") }}</p>
            <p>{{ t("aboutPage.whyDetails") }}</p>
          </section>

          <section class="about-page__section">
            <h2>{{ t("aboutPage.developedTitle") }}</h2>
            <p>{{ t("aboutPage.developedDescription") }}</p>
            <p>{{ t("aboutPage.partnerDescription") }}</p>
          </section>
        </article>
      </div>
    </main>

    <FooterMain />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import HeaderMain from "../components/Header.vue";
import FooterMain from "../components/Footer.vue";

const { t } = useI18n({ useScope: "global" });
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f7fafc;
  color: #02253d;
}

.about-page__main {
  padding: 56px 24px 72px;
}

.about-page__container {
  width: min(100%, 980px);
  margin: 0 auto;
}

.about-page__intro,
.about-page__content {
  border: 1px solid #dce5ec;
  background: #fff;
  box-shadow: 0 8px 24px rgba(2, 37, 61, 0.05);
}

.about-page__intro {
  padding: 42px 52px 38px;
  border-top: 5px solid #fdc300;
}

.about-page__eyebrow {
  margin-bottom: 12px;
  color: #0784c8;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.about-page__intro h1 {
  margin: 0;
  color: #02253d;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.12;
}

.about-page__lead {
  max-width: 820px;
  margin: 22px 0 0;
  color: #173d58;
  font-size: clamp(1.08rem, 1.8vw, 1.3rem);
  font-weight: 600;
  line-height: 1.65;
}

.about-page__content {
  margin-top: 24px;
  padding: 40px 52px 46px;
  border-left: 5px solid #0784c8;
}

.about-page__content > p,
.about-page__section p {
  max-width: 820px;
  margin: 0;
  color: #3f5363;
  font-size: 1.05rem;
  line-height: 1.75;
}

.about-page__section {
  margin-top: 34px;
}

.about-page__section h2 {
  margin: 0 0 12px;
  color: #02253d;
  font-size: clamp(1.45rem, 2.5vw, 1.85rem);
  font-weight: 700;
  line-height: 1.25;
}

.about-page__section p + p {
  margin-top: 18px;
}

@media (max-width: 767px) {
  .about-page__main {
    padding: 32px 16px 48px;
  }

  .about-page__intro,
  .about-page__content {
    padding-right: 24px;
    padding-left: 24px;
  }

  .about-page__intro {
    padding-top: 30px;
    padding-bottom: 28px;
  }

  .about-page__content {
    padding-top: 30px;
    padding-bottom: 34px;
  }

  .about-page__lead,
  .about-page__content > p,
  .about-page__section p {
    font-size: 1rem;
    line-height: 1.65;
  }
}

@media (max-width: 420px) {
  .about-page__main {
    padding-right: 12px;
    padding-left: 12px;
  }

  .about-page__intro,
  .about-page__content {
    padding-right: 18px;
    padding-left: 18px;
  }
}
</style>
