<template>
  <article class="digital-trade-block">
    <div class="digital-trade-copy">
      <h2 class="digital-trade-title">{{ t("home.digitalTradeTitle") }}</h2>
      <p class="digital-trade-description">
        {{ t("home.digitalTradeDescription") }}
      </p>
      <div class="digital-trade-action">
        <button class="digital-trade-button" type="button" @click="goToDigitalTrade">
          <span class="digital-trade-button-main">
            <img
              src="/images/digitalTradeIcon.svg"
              alt=""
              class="digital-trade-button-icon"
            />
            <span>{{ t("home.digitalTradeButton") }}</span>
          </span>
          <svg
            aria-hidden="true"
            class="digital-trade-chevron"
            viewBox="0 0 18 20"
            fill="none"
          >
            <path d="M6 4L12 10L6 16" />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const goToDigitalTrade = () => router.push("/regional-digital-trade-integration");
</script>

<style scoped>
.digital-trade-block {
  display: flex;
  align-items: stretch;
  overflow: hidden;
  min-width: 0;
  height: 100%;
  border: 1px solid rgba(102, 224, 232, 0.78);
  border-radius: 10px;
  padding: 2.5rem;
  background-image:
    linear-gradient(115deg, rgba(1, 48, 61, 0.94), rgba(0, 112, 128, 0.66)),
    url("/images/digitalTradeFeatureBg.webp");
  background-position: center;
  background-size: cover;
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 20, 52, 0.2);
}

.digital-trade-copy {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.digital-trade-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.15;
}

.digital-trade-description {
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 17px;
  line-height: 1.55;
}

.digital-trade-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  cursor: pointer;
  border: 1px solid #fdc300;
  border-radius: 6px;
  padding: 16px 18px;
  background: #fdc300;
  color: #252525;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  text-align: left;
  transition: filter 0.2s ease, transform 0.2s ease;
}

.digital-trade-action {
  width: min(100%, 390px);
  margin-top: auto;
  padding-top: 24px;
}

.digital-trade-button:hover {
  filter: brightness(0.96);
  transform: translateY(-1px);
}

.digital-trade-button-main {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.digital-trade-button-icon {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  object-fit: contain;
}

.digital-trade-chevron {
  flex: 0 0 auto;
  width: 18px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}

.digital-trade-button:hover .digital-trade-chevron {
  transform: translateX(3px);
}

.digital-trade-button:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.9);
  outline-offset: 3px;
}

@media (min-width: 1024px) {
  .digital-trade-block {
    padding: 2rem;
  }

  .digital-trade-title {
    font-size: 32px;
  }

  .digital-trade-description {
    font-size: 16px;
    line-height: 1.5;
  }

  .digital-trade-button {
    min-height: 52px;
    padding: 14px 16px;
  }

  .digital-trade-action {
    padding-top: 20px;
  }

  .digital-trade-button-icon {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .digital-trade-block {
    height: 100%;
    min-height: 0;
    padding: 1.25rem;
  }

  .digital-trade-title {
    font-size: 24px;
    line-height: 1.2;
  }

  .digital-trade-description {
    font-size: 14px;
    line-height: 1.45;
  }

  .digital-trade-button {
    width: 100%;
    min-height: 48px;
    padding: 12px;
    font-size: 14px;
  }

  .digital-trade-action {
    width: 100%;
    padding-top: 16px;
  }

  .digital-trade-button-icon {
    width: 26px;
    height: 26px;
    margin-right: 8px;
  }

  .digital-trade-chevron {
    width: 15px;
    height: 17px;
  }
}

@media (max-width: 599px) {
  .digital-trade-block {
    height: auto;
    min-height: 0;
    border-radius: 0;
    padding: 14px;
  }

  .digital-trade-title {
    font-size: 18px;
    line-height: 1.2;
  }

  .digital-trade-description {
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.4;
  }

  .digital-trade-button {
    width: 100%;
    min-height: 46px;
    padding: 10px 12px;
    font-size: 14px;
  }

  .digital-trade-action {
    width: 100%;
    margin-top: 14px;
    padding-top: 0;
  }

  .digital-trade-button-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .digital-trade-chevron {
    width: 14px;
    height: 16px;
  }
}
</style>
