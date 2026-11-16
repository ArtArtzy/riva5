<template>
  <header class="value-chain-heading">
    <div class="heading-intro">
      <HealthOutlineIcon name="layers" class="heading-icon" />
      <h2 :id="titleId">Choose a value chain</h2>
    </div>
    <div class="chain-counts" aria-label="Value chain counts by risk">
      <strong>{{ chains.length }} {{ chains.length === 1 ? 'value chain' : 'value chains' }}</strong>
      <span v-for="item in breakdown" :key="item.key"><i :class="item.key"></i>{{ item.count }} {{ item.label }}</span>
    </div>
    <div class="heading-trade" aria-label="Annual trade by value chain risk">
      <div class="trade-total">
        <span>Total trade <strong>{{ money(total) }}</strong><span class="trade-unit">/year</span></span>
        <span class="reporting-period">2021&ndash;2023 average</span>
      </div>
      <div class="trade-bar" role="img" :aria-label="breakdown.map(item => `${item.label}: ${money(item.trade)} (${item.share}%)`).join('; ')">
        <span v-for="item in breakdown" :key="item.key" :class="item.key" :style="{ width: `${item.exactShare}%` }"></span>
      </div>
      <div class="trade-breakdown">
        <span v-for="item in breakdown" :key="item.key"><i :class="item.key"></i>{{ item.label }} <strong>{{ money(item.trade) }} ({{ item.share }}%)</strong></span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
const props = defineProps({ chains: { type: Array, required: true }, titleId: { type: String, required: true } });
const riskLevels = [{ key: 'high', label: 'High risk' }, { key: 'medium', label: 'Medium risk' }, { key: 'low', label: 'Low risk' }];
const total = computed(() => props.chains.reduce((sum, chain) => sum + chain.tradeValue, 0));
const breakdown = computed(() => riskLevels.map(risk => {
  const matching = props.chains.filter(chain => chain.risk === risk.key);
  const trade = matching.reduce((sum, chain) => sum + chain.tradeValue, 0);
  const exactShare = total.value ? trade / total.value * 100 : 0;
  return { ...risk, trade, count: matching.length, exactShare, share: Math.round(exactShare) };
}).filter(item => item.count));
const money = value => `US$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}m`;
</script>

<style scoped>
.value-chain-heading {
  --heading-high: #d51e40;
  --heading-medium: #ce9200;
  --heading-low: #22983a;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  column-gap: 32px;
  row-gap: 12px;
  align-items: start;
  margin-bottom: 20px;
  color: #0b153d;
}
.heading-intro { display: flex; align-items: center; gap: 18px; min-width: 0; }
.heading-icon { font-size: 28px; color: #0061f5; }
h2 { margin: 0; font-size: 22px; font-weight: 750; line-height: 1.3; letter-spacing: -.5px; }
.trade-breakdown > span { display: inline-flex; align-items: center; gap: 7px; }
i { display: inline-block; width: 14px; height: 14px; flex-shrink: 0; border-radius: 50%; }
.high { background: var(--heading-high); }
.medium { background: var(--heading-medium); }
.low { background: var(--heading-low); }
.chain-counts { grid-column: 1; grid-row: 2; display: inline-flex; flex-wrap: wrap; align-items: center; justify-self: start; gap: 8px 0; margin-left: 46px; padding: 10px 14px; border-radius: 8px; background: #edf3fc; font-size: 14px; line-height: 1.3; }
.chain-counts i { width: 11px; height: 11px; }
.chain-counts strong { font-weight: 750; }
.chain-counts > span { display: inline-flex; align-items: center; gap: 6px; border-left: 1px solid #c5d4ea; padding-left: 14px; margin-left: 14px; }
.heading-trade { grid-column: 2; grid-row: 1 / span 2; min-width: 0; padding-left: 24px; border-left: 1px solid #cbd7e7; }
.trade-total { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 5px 12px; font-size: 15px; color: #344b6e; }
.trade-total > span:first-child { display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 3px; }
.trade-total strong { color: #0b153d; font-size: 30px; line-height: 1.2; margin-left: 9px; font-weight: 750; }
.trade-unit { color: #142b4b; }
.reporting-period { white-space: nowrap; }
.trade-bar { display: flex; height: 16px; border-radius: 20px; overflow: hidden; margin: 13px 0 10px; }
.trade-breakdown { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 12px; font-size: 15px; color: #23395b; }
.trade-breakdown strong { color: #0b153d; font-weight: 700; }
@media (max-width: 1199px) {
  .value-chain-heading { column-gap: 20px; }
  h2 { font-size: 21px; }
  .chain-counts { font-size: 13px; padding: 10px 12px; }
  .chain-counts > span { padding-left: 12px; margin-left: 12px; }
  .heading-trade { padding-left: 18px; }
  .trade-total, .trade-breakdown { font-size: 13px; }
  .trade-total strong { font-size: 27px; }
}
@media (max-width: 767px) {
  .value-chain-heading { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .heading-intro { gap: 12px; }
  .heading-icon { font-size: 26px; }
  h2 { font-size: 20px; }
  .chain-counts { grid-row: 2; margin-left: 0; font-size: 13px; }
  .heading-trade { grid-column: 1; grid-row: 3; padding: 16px 0 0; border-left: 0; border-top: 1px solid #cbd7e7; }
}
</style>
