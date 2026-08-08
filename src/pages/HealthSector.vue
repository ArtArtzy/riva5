<template>
  <div class="health-page">
    <HeaderMain />
    <main class="health-page__main">
      <section class="health-page__content" aria-labelledby="health-page-title">
        <div class="health-page__icon-shell" aria-hidden="true">
          <img src="/images/healthicon.svg" alt="" class="health-page__icon" />
        </div>

        <h1 id="health-page-title" class="health-page__title">
          {{ t("nav.health") }}
        </h1>

        <div class="health-page__divider" aria-hidden="true"></div>

        <div class="health-page__message">
          <p>{{ t("healthPage.lead") }}</p>
          <p>{{ t("healthPage.supporting") }}</p>
          <p>{{ t("healthPage.followUp") }}</p>
        </div>

        <button type="button" class="health-page__home-button" @click="goToHome">
          <span aria-hidden="true">←</span>
          <span>{{ t("healthPage.backHome") }}</span>
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>
import HeaderMain from "../components/Header.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n({ useScope: "global" });

const goToHome = () => router.push("/");
</script>

<style scoped>
.health-page {
  min-height: 100vh;
  background: #fff;
  color: #02253d;
}

.health-page__main {
  min-height: calc(100vh - 60px);
  padding: 48px 24px 72px;
  display: grid;
  place-items: center;
}

.health-page__content {
  width: min(100%, 820px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.health-page__icon-shell {
  position: relative;
  width: 140px;
  height: 140px;
  margin-bottom: 24px;
  display: grid;
  place-items: center;
  border: 1px solid #e3ebf3;
  border-radius: 50%;
}

.health-page__icon-shell::before {
  position: absolute;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #eef5fb;
  content: "";
}

.health-page__icon {
  position: relative;
  z-index: 1;
  width: 88px;
  height: 88px;
  object-fit: contain;
}

.health-page__title {
  margin: 0;
  color: #02253d;
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.08;
}

.health-page__divider {
  width: 38px;
  height: 3px;
  margin: 24px 0 18px;
  background: #087fc5;
}

.health-page__message {
  max-width: 760px;
  color: #5e6d7d;
  font-size: clamp(0.95rem, 1.45vw, 1.12rem);
  line-height: 1.55;
}

.health-page__message p {
  margin: 0;
}

.health-page__message p + p {
  margin-top: 2px;
}

.health-page__home-button {
  margin-top: 40px;
  padding: 13px 22px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 4px;
  background: #087fc5;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 93, 153, 0.2);
  cursor: pointer;
  font-size: 0.98rem;
  line-height: 1.2;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.health-page__home-button:hover {
  background: #056da9;
  box-shadow: 0 3px 8px rgba(0, 93, 153, 0.28);
}

.health-page__home-button:focus-visible {
  outline: 3px solid rgba(8, 127, 197, 0.3);
  outline-offset: 3px;
}

@media (max-width: 767px) {
  .health-page__main {
    min-height: calc(100vh - 56px);
    padding: 36px 18px 56px;
  }

  .health-page__icon-shell {
    width: 118px;
    height: 118px;
    margin-bottom: 22px;
  }

  .health-page__icon-shell::before {
    width: 88px;
    height: 88px;
  }

  .health-page__icon {
    width: 74px;
    height: 74px;
  }

  .health-page__title {
    font-size: clamp(2.25rem, 11vw, 3.2rem);
  }

  .health-page__divider {
    margin: 20px 0 16px;
  }

  .health-page__message {
    max-width: 34rem;
    font-size: 0.98rem;
    line-height: 1.55;
  }

  .health-page__home-button {
    margin-top: 32px;
    padding: 13px 20px;
    font-size: 0.95rem;
  }
}

@media (max-width: 420px) {
  .health-page__main {
    padding-right: 14px;
    padding-left: 14px;
  }

  .health-page__title {
    font-size: 2.2rem;
  }

  .health-page__message {
    font-size: 0.92rem;
  }
}
</style>
