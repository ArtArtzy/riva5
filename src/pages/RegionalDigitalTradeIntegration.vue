<template>
  <div class="rdti-page">
    <HeaderMain />

    <main class="rdti-page__main">
      <div class="rdti-page__container">
        <section class="rdti-page__intro" aria-labelledby="rdti-page-title">
          <div class="rdti-page__eyebrow">ESCAP</div>
          <h1 id="rdti-page-title">{{ t("digitalTradeIntegration.title") }}</h1>
        </section>

        <aside class="rdti-device-notice" role="note">
          {{ t("digitalTradeIntegration.desktopNotice") }}
        </aside>

        <section class="rdti-section" aria-labelledby="rdtii-dashboard-title">
          <h2 id="rdtii-dashboard-title">{{ t("digitalTradeIntegration.dashboardTitle") }}</h2>
          <p>
            {{ t("digitalTradeIntegration.dashboardDescription") }}
          </p>
          <p>
            {{ t("digitalTradeIntegration.fullScreenDescription") }}
          </p>

          <div class="rdti-dashboard-card rdti-dashboard-card--tableau-one">
            <div class="rdti-dashboard-card__frame-wrap">
              <iframe
                title="RCDTRA Tableau Dashboard 1"
                src="https://public.tableau.com/shared/QZS8KTY7M?:embed=y&:showVizHome=no&:toolbar=yes"
                allow="fullscreen"
                allowfullscreen
                scrolling="no"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <section class="rdti-section" aria-labelledby="regulatory-database-title">
          <h2 id="regulatory-database-title">{{ t("digitalTradeIntegration.regulatoryDatabaseTitle") }}</h2>
          <p>
            {{ t("digitalTradeIntegration.regulatoryDatabaseDescription") }}
          </p>

          <div class="rdti-dashboard-card rdti-dashboard-card--powerbi">
            <div class="rdti-dashboard-card__frame-wrap">
              <iframe
                title="RDTII 2.1 Regulatory Database"
                src="https://app.powerbi.com/view?r=eyJrIjoiZTkyYTJjMzktYTBjOS00OTc4LTg1YjMtYjc3NWIxNDJmN2M0IiwidCI6IjBmOWUzNWRiLTU0NGYtNGY2MC1iZGNjLTVlYTQxNmU2ZGM3MCIsImMiOjh9"
                allow="fullscreen"
                allowfullscreen
                scrolling="no"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>

        <section class="rdti-section" aria-labelledby="dtrs-title">
          <h2 id="dtrs-title">{{ t("digitalTradeIntegration.dtrsTitle") }}</h2>
          <p>
            {{ t("digitalTradeIntegration.dtrsDescription") }}
          </p>

          <div class="rdti-dashboard-card rdti-dashboard-card--tableau-two">
            <div class="rdti-dashboard-card__frame-wrap">
              <iframe
                title="RCDTRA Tableau Dashboard 2"
                src="https://public.tableau.com/shared/FFPBZTTX4?:embed=y&:showVizHome=no&:toolbar=yes"
                allow="fullscreen"
                allowfullscreen
                scrolling="no"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </main>

    <FooterMain />
  </div>
</template>

<script setup>
import HeaderMain from "../components/Header.vue";
import FooterMain from "../components/Footer.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<style scoped>
.rdti-page {
  min-height: 100vh;
  background: #f4f6f8;
  color: #02253d;
}

.rdti-page__main {
  padding: 40px 20px 72px;
}

.rdti-page__container {
  width: min(100%, 1400px);
  margin: 0 auto;
}

.rdti-page__intro,
.rdti-section {
  border: 1px solid #dce5ec;
  background: #fff;
  box-shadow: 0 8px 24px rgba(2, 37, 61, 0.06);
}

.rdti-page__intro {
  padding: 34px 40px 30px;
  border-top: 5px solid #fdc300;
}

.rdti-device-notice {
  display: none;
  margin-top: 18px;
  padding: 16px 20px;
  border: 1px solid #f0c36d;
  border-left: 5px solid #fdc300;
  border-radius: 6px;
  background: #fff8e6;
  color: #5b4513;
  font-size: 0.98rem;
  line-height: 1.6;
}

.rdti-page__eyebrow {
  margin-bottom: 10px;
  color: #0784c8;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.rdti-page__intro h1 {
  margin: 0;
  color: #02253d;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.12;
}

.rdti-section {
  margin-top: 24px;
  padding: 34px 40px 40px;
  border-left: 5px solid #0784c8;
}

.rdti-section h2 {
  margin: 0 0 14px;
  color: #02253d;
  font-size: clamp(1.45rem, 2.5vw, 2rem);
  font-weight: 700;
  line-height: 1.25;
}

.rdti-section p {
  max-width: 1160px;
  margin: 0;
  color: #3f5363;
  font-size: 1.05rem;
  line-height: 1.75;
}

.rdti-section p + p {
  margin-top: 14px;
}

.rdti-dashboard-card {
  margin-top: 28px;
  overflow: hidden;
  border: 1px solid #dce5ec;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.rdti-dashboard-card__frame-wrap {
  width: 100%;
  height: clamp(560px, 56.25vw, 760px);
  overflow: hidden;
  background: #e5e7eb;
}

.rdti-dashboard-card--tableau-one .rdti-dashboard-card__frame-wrap {
  height: 1150px;
}

.rdti-dashboard-card--powerbi .rdti-dashboard-card__frame-wrap {
  height: 850px;
}

.rdti-dashboard-card--tableau-two .rdti-dashboard-card__frame-wrap {
  height: 1150px;
}

.rdti-dashboard-card iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .rdti-page__main {
    padding: 24px 12px 48px;
  }

  .rdti-page__intro,
  .rdti-section {
    padding-right: 22px;
    padding-left: 22px;
  }

  .rdti-page__intro {
    padding-top: 28px;
    padding-bottom: 26px;
  }

  .rdti-section {
    padding-top: 28px;
    padding-bottom: 30px;
  }

  .rdti-section p {
    font-size: 1rem;
    line-height: 1.65;
  }

}

@media (max-width: 1024px) {
  .rdti-device-notice {
    display: block;
  }
}

@media (max-width: 420px) {
  .rdti-page__main {
    padding-right: 12px;
    padding-left: 12px;
  }

  .rdti-page__intro,
  .rdti-section {
    padding-right: 18px;
    padding-left: 18px;
  }
}
</style>
