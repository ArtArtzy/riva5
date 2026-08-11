<template>
  <div class="relative inline-block text-left">
    <q-btn
      outline
      :label="t('va.resources')"
      color="white"
      icon-right="arrow_drop_down"
      class="rounded px-4"
    />
    <q-menu
      :key="locale"
      transition-show="jump-down"
      transition-hide="jump-up"
    >
      <q-list bordered class="w-[180px] bg-white text-gray-700">
        <q-item clickable v-ripple>
          <div class="flex" @click="goToTechnicalNotes">
            <div class="w-8">
              <img src="/images/icon-tech-notes.svg" class="h-5 w-5" alt="" />
            </div>
            <div>{{ t("va.technicalNotes") }}</div>
          </div>
        </q-item>
        <q-item v-close-popup clickable v-ripple @click="goToPublications">
          <div class="flex">
            <div class="w-8">
              <img src="/images/icon-publications.svg" class="h-5 w-5" alt="" />
            </div>
            <div>{{ t("va.publications") }}</div>
          </div>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { locale, t } = useI18n({ useScope: "global" });

const goToTechnicalNotes = () => {
  window.open(
    "https://riva.negotiatetrade.org/riva_docs/va_note/",
    "_blank",
    "noopener,noreferrer",
  );
};

const goToPublications = () => {
  router.push("/publications");
};
</script>
