<template>
  <div class="health-page">
    <HeaderMain />
    <HealthChainDashboard />
    <FooterMain />
  </div>
</template>

<script setup>
import HeaderMain from "../components/Header.vue";
import FooterMain from "../components/Footer.vue";
import HealthChainDashboard from "../components/health/HealthChainDashboard.vue";
</script>

<style scoped>
.health-page {
  min-height: 100vh;
  background: #fff;
  color: #02253d;
}

</style>
