<template>
  <section
    ref="heroElement"
    :style="heroStyle"
    class="hero-banner h-[calc(100dvh-60px)] text-white"
  >
    <div
      class="hero-content relative mx-auto flex h-full w-full max-w-[1400px] items-end justify-end px-4 py-12 lg:px-8 lg:pb-16"
    >
      <div class="home-resources-dropdown">
        <ResourcesDropdown />
      </div>
      <div class="hero-feature-grid">
        <div class="hero-copy">
          <div class="hero-copy-content">
            <h1 class="hero-title">
              {{ t('home.heroTitle') }}
            </h1>
            <p class="hero-description">
              {{ t('home.heroDescription') }}
            </p>
            <div class="hero-actions">
            <q-btn
              no-caps
              unelevated
              class="hero-primary"
              aria-label="Value Chains Analyzer"
              @click="goToVA"
            >
              <span class="hero-button-main">
                <img src="/images/vaLogo.svg" alt="" class="hero-button-icon" />
                <span class="hero-button-copy">
                  <span class="hero-button-title">{{ t('nav.valueChains') }}</span>
                </span>
              </span>
              <svg
                aria-hidden="true"
                class="hero-button-chevron"
                viewBox="0 0 18 20"
                fill="none"
              >
                <path d="M6 4L12 10L6 16" />
              </svg>
            </q-btn>
            <q-btn
              no-caps
              outline
              class="hero-secondary"
              aria-label="Sectoral GVC Analysis"
              @click="goToHealthSector"
            >
              <span class="hero-button-main">
                <img
                  src="/images/sectoralanalysis.svg"
                  alt=""
                  class="hero-button-icon"
                />
                <span class="hero-button-copy">
                  <span class="hero-button-title">{{ t('nav.sectoral') }}</span>
                </span>
              </span>
              <svg
                aria-hidden="true"
                class="hero-button-chevron"
                viewBox="0 0 18 20"
                fill="none"
              >
                <path d="M6 4L12 10L6 16" />
              </svg>
            </q-btn>
            </div>
          </div>
        </div>
        <DigitalTradeIntegration />
      </div>
      <div class="scroll-cue" aria-label="Scroll down to explore more content">
        <span>{{ t('home.scroll') }}</span>
        <q-icon name="keyboard_arrow_down" />
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import ResourcesDropdown from "../ResourcesDropdown.vue";
import DigitalTradeIntegration from "./DigitalTradeIntegration.vue";

const router = useRouter();
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const heroElement = ref(null);
const parallaxOffset = ref(0);
const heroStyle = computed(() => ({
  backgroundPosition: `center calc(50% + ${parallaxOffset.value}px)`,
}));

const updateParallax = () => {
  if (window.innerWidth < 1024 || !heroElement.value) {
    parallaxOffset.value = 0;
    return;
  }

  const heroTop = heroElement.value.getBoundingClientRect().top;
  parallaxOffset.value = Math.max(-80, Math.min(80, -heroTop * 0.15));
};

onMounted(() => {
  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateParallax);
  window.removeEventListener("resize", updateParallax);
});

const goToVA = () => {
  proxy.$gtag.event("value_chain_analyzer_click", {
    button_name: "Value Chains Analyzer",
    page_title: "Welcome Page",
    page_path: "/",
  });
  router.push("/va");
};

const goToHealthSector = () => router.push("/sectoral-analysis/health");
</script>

<style scoped>
.hero-banner {
  background-image:
    linear-gradient(90deg, rgba(0, 25, 67, 0.32) 0%, rgba(0, 25, 67, 0.06) 65%),
    url("/images/indexBG.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero-copy {
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  min-width: 0;
  height: 100%;
  width: 100%;
  max-width: none;
  border: 1px solid rgba(112, 202, 255, 0.78);
  border-radius: 10px;
  padding: 2.5rem;
  background-image:
    linear-gradient(115deg, rgba(0, 53, 99, 0.94), rgba(0, 101, 171, 0.82)),
    url("/images/heroFeatureBg.webp");
  background-position: center;
  background-size: cover;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 20, 52, 0.2);
}

.hero-copy-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.hero-feature-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.home-resources-dropdown {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  z-index: 5;
}

.scroll-cue {
  position: absolute;
  right: 1rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  letter-spacing: 0.04em;
}

.scroll-cue :deep(.q-icon) {
  font-size: 1.5rem;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.15;
  white-space: pre-line;
}

.hero-description {
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 17px;
  line-height: 1.55;
}

.hero-actions {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  width: min(100%, 390px);
  margin-top: auto;
  padding-top: 24px;
}

@media (max-width: 599px) {
  .hero-banner {
    height: calc(100dvh - 120px);
  }

  .hero-content {
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .hero-copy {
    width: 100%;
    max-width: none;
    padding: 1rem;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-description {
    font-size: 16px;
    line-height: 1.45;
  }

  .hero-actions {
    width: 100%;
    margin-top: 18px;
    padding-top: 0;
  }

  .scroll-cue {
    display: none;
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .hero-banner {
    height: calc(100dvh - 60px);
    min-height: 560px;
  }

  .hero-content {
    padding: 4.5rem 12px 2.5rem;
  }

  .scroll-cue {
    right: auto;
    bottom: 0.75rem;
    left: 50%;
    display: inline-flex;
    transform: translateX(-50%);
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 32px !important;
  }
  .hero-copy {
    width: 100%;
    max-width: none;
    padding: 2.5rem;
  }
  .scroll-cue {
    right: auto;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .home-resources-dropdown {
    right: 1rem;
  }
  .hero-primary,
  .hero-secondary {
    min-height: 54px !important;
    border-radius: 6px;
    padding: 0 18px;
  }
  .hero-primary :deep(.q-btn__content),
  .hero-secondary :deep(.q-btn__content) {
    justify-content: space-between;
    width: 100%;
  }
  .hero-button-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

@media (max-width: 599px) {
  .hero-feature-grid {
    display: block;
  }
}

.hero-primary,
.hero-secondary {
  width: 100%;
  min-height: 54px;
  padding: 0 18px;
  border-radius: 6px;
  text-align: left;
}
.hero-primary :deep(.q-btn__content),
.hero-secondary :deep(.q-btn__content) {
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;
}
.hero-primary {
  background: #fdc300;
  color: #111827;
}
.hero-secondary {
  border-color: #fff;
  color: #fff;
}
.hero-button-icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
  object-fit: contain;
}
.hero-button-main {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}
.hero-button-chevron {
  flex: 0 0 auto;
  width: 18px;
  height: 20px;
  margin-left: 12px;
  stroke: currentColor;
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}
.hero-primary:hover .hero-button-chevron,
.hero-secondary:hover .hero-button-chevron {
  transform: translateX(3px);
}
.hero-button-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.2;
}
.hero-button-title {
  font-size: 16px;
  font-weight: 700;
  white-space: normal;
}

@media (min-width: 600px) and (max-width: 1023px) {
  .hero-feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: 12px;
  }

  .hero-copy {
    height: 100%;
    padding: 1.25rem;
  }

  .hero-title {
    font-size: 24px;
    line-height: 1.2;
  }

  .hero-description {
    font-size: 14px;
    line-height: 1.45;
  }

  .hero-actions {
    gap: 8px;
    width: 100%;
    margin-top: auto;
    padding-top: 16px;
  }

  .hero-primary,
  .hero-secondary {
    min-height: 48px;
    padding: 0 12px;
  }

  .hero-button-icon {
    width: 26px;
    height: 26px;
    margin-right: 8px;
  }

  .hero-button-title {
    font-size: 14px;
  }

  .hero-button-chevron {
    width: 15px;
    height: 17px;
    margin-left: 8px;
  }
}

@media (min-width: 1024px) {
  .hero-feature-grid {
    max-width: 1240px;
    margin-right: auto;
    margin-left: auto;
    gap: 16px;
  }

  .hero-copy {
    padding: 2rem;
  }

  .hero-description {
    font-size: 16px;
    line-height: 1.5;
  }

  .hero-actions {
    flex-direction: row;
    gap: 10px;
    width: 100%;
    max-width: 570px;
    margin-top: auto;
    padding-top: 20px;
  }

  .hero-primary,
  .hero-secondary {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
    min-height: 52px !important;
    padding: 0 14px;
  }

  .hero-button-icon {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }

  .hero-button-title {
    font-size: 14px;
  }
}
</style>
