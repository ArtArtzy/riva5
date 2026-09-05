<template>
  <router-view />
</template>

<script setup>
import { computed } from "vue";
import { useMeta } from "quasar";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const route = useRoute();
const { locale, t } = useI18n({ useScope: "global" });

const siteUrl = "https://riva.negotiatetrade.org";

const basePath = (path) => {
  const knownPaths = [
    "/participationingvcs",
    "/gvcoverview",
    "/backwardlinkages",
    "/backwardlinkagessource",
    "/forwardlinkages",
    "/forwardlinkagesimport",
    "/directindirect",
    "/countrybriefs",
  ];

  return knownPaths.find((knownPath) => path === knownPath || path.startsWith(`${knownPath}/`)) || path;
};

const pageSeo = computed(() => {
  const path = route.path;

  if (path === "/") {
    return {
      title: `RIVA | ${t("nav.valueChains")}`,
      description: t("home.heroDescription"),
    };
  }

  if (path === "/va") {
    return { title: `${t("va.title")} | RIVA`, description: t("va.intro") };
  }

  if (path === "/publications") {
    return { title: `${t("publications.heroTitle")} | RIVA`, description: t("publications.heroSubtitle") };
  }

  if (path === "/sectoral-analysis/health") {
    return {
      title: `${t("nav.health")} | RIVA`,
      description: `${t("healthPage.lead")} ${t("healthPage.supporting")}`,
    };
  }

  if (path === "/regional-digital-trade-integration") {
    return {
      title: `${t("digitalTradeIntegration.title")} | RIVA`,
      description: t("digitalTradeIntegration.dashboardDescription"),
    };
  }

  if (path === "/about") {
    return { title: `${t("aboutPage.title")} | RIVA`, description: t("aboutPage.description") };
  }

  if (path.startsWith("/participationingvcs") || path === "/directindirect") {
    return { title: `${t("participation.title")} | RIVA`, description: t("participation.policyOne") };
  }

  if (path.startsWith("/gvcoverview")) {
    return { title: `${t("gvc.title")} | RIVA`, description: t("gvc.policyOne") };
  }

  if (path.startsWith("/backwardlinkages")) {
    return { title: `${t("backward.title")} | RIVA`, description: t("backward.policyQuestionOne") };
  }

  if (path.startsWith("/forwardlinkages")) {
    return { title: `${t("forward.title")} | RIVA`, description: t("forward.sectorPolicyOne") };
  }

  if (path.startsWith("/countrybriefs")) {
    return { title: `${t("nav.briefs")} | RIVA`, description: t("economyBrief.guideHtml").replace(/<[^>]*>/g, " ").slice(0, 300) };
  }

  return {
    title: `ESCAP RIVA | ${t("nav.valueChains")}`,
    description: t("home.heroDescription"),
  };
});

const canonicalUrl = computed(() => {
  const path = basePath(route.path).replace(/\/$/, "");
  return `${siteUrl}${path || "/"}`;
});

useMeta(() => ({
  title: pageSeo.value.title,
  meta: {
    description: { name: "description", content: pageSeo.value.description },
    robots: { name: "robots", content: "index, follow" },
    ogType: { property: "og:type", content: "website" },
    ogSiteName: { property: "og:site_name", content: "ESCAP RIVA" },
    ogTitle: { property: "og:title", content: pageSeo.value.title },
    ogDescription: { property: "og:description", content: pageSeo.value.description },
    ogUrl: { property: "og:url", content: canonicalUrl.value },
    twitterCard: { name: "twitter:card", content: "summary" },
    twitterTitle: { name: "twitter:title", content: pageSeo.value.title },
    twitterDescription: { name: "twitter:description", content: pageSeo.value.description },
  },
  link: {
    canonical: { rel: "canonical", href: canonicalUrl.value },
  },
  htmlAttr: {
    lang: locale.value,
  },
  script: {
    structuredData: {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageSeo.value.title,
        description: pageSeo.value.description,
        url: canonicalUrl.value,
        inLanguage: locale.value,
        isPartOf: {
          "@type": "WebSite",
          name: "ESCAP RIVA",
          url: siteUrl,
        },
      }),
    },
  },
}));
</script>
