<template>
  <main class="health-dashboard">
    <div class="dashboard-container">
      <header class="dashboard-heading">
        <h1>Where can this product’s supply chain break, and who supplies each step?</h1>
      </header>

      <section class="filter-bar panel" aria-label="Supply chain filters">
        <div class="filter"><strong id="product-filter-label">Product</strong>
          <q-select
            v-model="selectedProduct"
            :options="productOptions"
            option-value="value"
            option-label="label"
            option-disable="disable"
            emit-value
            map-options
            outlined
            dense
            hide-dropdown-icon
            class="product-select"
            aria-labelledby="product-filter-label"
            popup-content-class="health-product-options"
          >
            <template #prepend><HealthOutlineIcon :name="selectedProductOption.icon" /></template>
            <template #append><HealthOutlineIcon name="expand_more" /></template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar><HealthOutlineIcon :name="scope.opt.icon" class="product-option-icon" /></q-item-section>
                <q-item-section>{{ scope.opt.label }}</q-item-section>
                <q-item-section v-if="scope.selected" side><HealthOutlineIcon name="check" class="product-option-check" /></q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="filter subproduct-filter"><strong id="subproduct-filter-label">Subproduct</strong>
          <q-select
            v-model="selectedSubproduct"
            :options="subproductOptions"
            option-value="code"
            option-label="label"
            emit-value
            map-options
            outlined
            dense
            hide-dropdown-icon
            class="product-select"
            aria-labelledby="subproduct-filter-label"
            popup-content-class="health-product-options"
            :popup-content-style="{ maxHeight: '360px' }"
          >
            <template #prepend><HealthOutlineIcon :name="subproduct.icon" /></template>
            <template #selected><span class="subproduct-selected" :title="subproduct.label">{{ subproduct.label }}</span></template>
            <template #append><HealthOutlineIcon name="expand_more" /></template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar><HealthOutlineIcon :name="scope.opt.icon" class="product-option-icon" /></q-item-section>
                <q-item-section>{{ scope.opt.label }}</q-item-section>
                <q-item-section v-if="scope.selected" side><HealthOutlineIcon name="check" class="product-option-check" /></q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="filter"><strong id="economy-filter-label">Economy</strong>
          <q-select model-value="Thailand" :options="['Thailand']" outlined dense hide-dropdown-icon class="product-select" aria-labelledby="economy-filter-label" popup-content-class="health-product-options">
            <template #prepend><span class="thai-flag" aria-hidden="true"></span></template>
            <template #append><HealthOutlineIcon name="expand_more" /></template>
          </q-select>
        </div>
      </section>

      <template v-if="isBiologicsHeading">
        <BiologicsValueChains :selected-chain="selectedBiologicsChain" @chain-change="selectedBiologicsChain = $event" />
        <BiologicsChainDetail :selected-chain="selectedBiologicsChain" @chain-change="selectedBiologicsChain = $event" />
        <BiologicsRiskExposure :chain-code="selectedBiologicsChain" />
      </template>
      <template v-else-if="productChainData">
        <DevicesValueChains :data="productChainData" :product-label="selectedProductOption.label" :selected-chain="selectedProductChain" @chain-change="selectedProductChain = $event" />
        <BiologicsChainDetail :key="`${selectedProduct}-${selectedSubproduct}`" :chains="productChainData.chains" :selected-chain="selectedProductChain" @chain-change="selectedProductChain = $event" data-note="Mock data · Thailand sourcing · 2021–2023 average" />
        <BiologicsRiskExposure :key="`risk-${selectedProduct}-${selectedSubproduct}`" :chains="productChainData.chains" :chain-code="selectedProductChain" :data-note="productChainData.referenceValueChains ? 'Supplied reference. Supplier shares include illustrative detail.' : 'Simulated trade and supplier shares for demonstration, shared with Supply chain.'" />
      </template>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import BiologicsValueChains from './BiologicsValueChains.vue';
import DevicesValueChains from './DevicesValueChains.vue';
import { devicesMockData } from './devicesChains.js';
import { ppeMockData } from './ppeChains.js';
import { pharmaMockData, pharmaSubproducts } from './pharmaChains.js';
import BiologicsChainDetail from './BiologicsChainDetail.vue';
import BiologicsRiskExposure from './BiologicsRiskExposure.vue';
import { deviceSubproducts, ppeSubproducts } from './healthSubproducts.js';

const productOptions = [
  { label: 'Biologics', value: 'biologics', icon: 'biologics' },
  { label: 'Devices', value: 'devices', icon: 'devices' },
  { label: 'Pharma', value: 'pharma', icon: 'pharma' },
  { label: 'PPE', value: 'ppe', icon: 'ppe' },
];
const selectedProduct = ref('biologics');
const selectedBiologicsChain = ref('300215');
const selectedProductOption = computed(() => productOptions.find(option => option.value === selectedProduct.value));
const subproductOptions = computed(() => {
  if (selectedProduct.value === 'devices') return deviceSubproducts;
  if (selectedProduct.value === 'ppe') return ppeSubproducts;
  if (selectedProduct.value === 'pharma') return pharmaSubproducts;
  return selectedProduct.value === 'biologics'
  ? [{
      code: '3002',
      label: 'Blood & immune products HS 3002',
      description: 'Human and animal blood; antisera, immunological products, vaccines, toxins and cultures of micro-organisms (HS 3002)',
      icon: 'blood',
    }]
  : [{
      code: '3004',
      label: 'Packaged medicines HS 3004',
      description: 'Medicaments for therapeutic or prophylactic uses, in measured doses or retail packaging (HS 3004)',
      icon: 'pharma',
    }];
});
const selectedSubproduct = ref(subproductOptions.value[0].code);
const productChainData = computed(() => ({ devices: devicesMockData, ppe: ppeMockData, pharma: pharmaMockData }[selectedProduct.value] || {})[selectedSubproduct.value]);
const selectedProductChain = ref('');
watch(productChainData, data => {
  selectedProductChain.value = data ? Object.keys(data.chains)[0] : '';
}, { immediate: true, flush: 'sync' });
const isBiologicsHeading = computed(() => selectedProduct.value === 'biologics' && selectedSubproduct.value === '3002');
const subproduct = computed(() => subproductOptions.value.find(option => option.code === selectedSubproduct.value) || subproductOptions.value[0]);
watch(selectedProduct, () => {
  selectedSubproduct.value = subproductOptions.value[0].code;
}, { flush: 'sync' });

</script>

<style scoped>
.subproduct-selected { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.product-select { flex: 1; min-width: 0; font-size: 13px; }
.product-select :deep(.q-field__control) { min-height: 38px; height: 38px; border-radius: 6px; background: #fff; color: #14264c; }
.product-select :deep(.q-field__control::before) { border-color: #ccdaed; }
.product-select :deep(.q-field__marginal) { height: 38px; color: #14264c; }
.product-select :deep(.q-field__native) { min-height: 38px; padding: 0; color: #14264c; min-width: 0; flex-wrap: nowrap; }
.product-select :deep(.q-field__prepend) { padding-right: 12px; font-size: 23px; }
.product-select :deep(.q-field__append) { font-size: 18px; }

.health-dashboard { background: #f7f9fc; color: #101e45; padding: 24px 16px 32px; font-family: Arial, sans-serif; }
.dashboard-container { max-width: 1400px; margin: 0 auto; }
.dashboard-heading { position: relative; padding: 0 16px 18px; isolation: isolate; }
h1 { font-size: clamp(22px, 2.05vw, 30px); line-height: 1.3; font-weight: 700; letter-spacing: -.4px; margin: 0; max-width: 1050px; }
h2, h3, h4, p { margin: 0; }
.panel { border: 1px solid #ceddf2; border-radius: 11px; background: #ffffff80; box-shadow: 0 1px 2px #16397b08; }
.filter-bar { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr) minmax(0, 1fr); padding: 12px 16px; margin-bottom: 14px; gap: 20px; background: #fff; box-shadow: none; }
.filter { display: flex; gap: 18px; align-items: center; min-width: 0; font-size: 13px; }
.filter + .filter { border-left: 1px solid #e0e7ef; padding-left: 20px; }
.select-wrap { display: flex; align-items: center; flex: 1; position: relative; border: 1px solid #ccdaed; border-radius: 7px; background: linear-gradient(#fff, #f3f7fc); box-shadow: 0 2px 2px #1a3c7910; min-width: 0; height: 35px; }
.select-wrap > .q-icon, .thai-flag { flex-shrink: 0; margin-left: 13px; font-size: 23px; }
.select-wrap select { width: 100%; min-width: 0; border: 0; background: transparent; color: #14264c; font: inherit; cursor: pointer; height: 100%; padding: 0 12px; border-radius: 7px; }
.select-wrap:focus-within { outline: 2px solid #3988ff; outline-offset: 2px; }
.select-wrap select:focus { outline: none; }
.thai-flag { width: 23px; height: 17px; background: linear-gradient(#e62838 0 17%, white 17% 32%, #173a84 32% 68%, white 68% 83%, #e62838 83%); box-shadow: 0 0 0 1px #ddd; }
.products-panel { padding: 13px 14px; margin-bottom: 16px; }
.section-heading { display: flex; align-items: center; gap: 20px; margin-bottom: 13px; }
.section-heading h2 { font-size: 17px; line-height: 1.3; font-weight: 700; display: flex; align-items: center; gap: 11px; white-space: nowrap; }
.section-heading h2 > .q-icon { color: #2084ff; font-size: 25px; }
.section-caption { font-size: 11px; }
.risk-legend { margin-left: auto; display: flex; gap: 23px; font-size: 11px; white-space: nowrap; }
.risk-legend span, .chart-legend span { display: flex; align-items: center; gap: 7px; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.dot.high { background: #e23243; }.dot.medium { background: #e29709; }.dot.low { background: #469f3a; }.dot.no-data { background: #bfc0c5; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 10px; }
.product-card { position: relative; display: flex; align-items: center; gap: 20px; min-height: 45px; padding: 8px 17px 8px 37px; background: linear-gradient(#fff, #f5f7fc); border: 1px solid #d8e1ef; border-radius: 10px; box-shadow: 0 2px 2px #153f7510; font-size: 15px; color: #131b31; }
.product-card::before, .flow-node::before { content: ''; position: absolute; left: 12px; top: 6px; bottom: 6px; border-radius: 4px; width: 7px; background: var(--risk-color); }
.high { --risk-color: #f23647; }.medium { --risk-color: #ffb617; }.low { --risk-color: #59b447; }
.product-card > .q-icon { font-size: 25px; }.product-card.selected { border-color: #418cff; background: linear-gradient(110deg, #f2f9ff, #e4f0ff); color: #082c87; font-weight: 700; box-shadow: 0 0 0 1px #a3cbff40; }
.product-card .selected-check { margin-left: auto; color: #0877ff; font-size: 22px; }
.chain-panel { padding: 14px; margin-bottom: 16px; }
.product-summary { display: grid; grid-template-columns: 1.65fr 1.05fr 1.05fr 1.05fr auto; align-items: center; gap: 22px; padding: 0 14px 16px; }
.product-identity { display: flex; align-items: center; gap: 18px; border-right: 1px solid #8e9db9; }
.identity-icon { display: grid; place-items: center; width: 62px; height: 62px; border-radius: 10px; background: linear-gradient(130deg, #dcecff, #cde2fc); font-size: 39px; color: #17437b; }
.eyebrow { font-size: 11px; margin-bottom: 4px; }.product-identity h2 { font-size: 30px; line-height: 1; font-weight: 750; letter-spacing: -.7px; }
.trade-total { display: flex; flex-direction: column; font-size: 13px; padding-left: 18px; }.trade-total strong { font-size: 27px; line-height: 1.1; color: #0a163a; }
.summary-metric { display: flex; align-items: center; justify-content: center; gap: 17px; border-radius: 9px; padding: 10px; background: #fce7e9; }
.summary-metric > .q-icon { font-size: 30px; }.summary-metric div { display: flex; flex-direction: column; font-size: 12px; color: #192746; }.summary-metric strong { font-size: 21px; line-height: 1.2; color: #bc1f32; white-space: nowrap; }
.weak { color: #f32c43; }.strained { color: #e79600; }.many { color: #279e23; }.summary-metric.many { background: #eaf5e9; }.summary-metric.many strong { color: #121a24; }
.importer-badge { font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; border: 1px solid #cad5e8; border-radius: 8px; padding: 9px 10px; white-space: nowrap; box-shadow: 0 2px 2px #193a6e15; }.importer-badge .q-icon { font-size: 21px; }
.risk-summary { display: grid; grid-template-columns: repeat(4, 1fr); border-radius: 9px; padding: 14px 0; background: linear-gradient(100deg, #fcecef, #fbf0f1 65%, #e9f6eb); margin-bottom: 16px; }
.risk-summary > div { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 14px; line-height: 1.3; }
.risk-summary > div + div::before { content: ''; position: absolute; left: 0; height: 72px; width: 1px; background: #bdc1ce; }
.risk-summary .q-icon { font-size: 27px; color: #ff3148; }.risk-summary strong { color: #ce2639; font-size: 20px; }.risk-summary .many strong, .risk-summary .many .q-icon { color: #229a25; }.risk-summary .many { color: #192d4c; }
.risk-summary .overall-risk { flex-direction: row; align-items: flex-start; gap: 24px; }.overall-risk > .q-icon { font-size: 37px; }.overall-risk > div { display: flex; flex-direction: column; }.overall-risk strong { font-size: 31px; line-height: 1.2; }
.chain-canvas { border: 1px solid #dce5f1; border-radius: 10px; padding: 10px 14px; background: linear-gradient(#f7faff90, #ffffff70); }
.chain-canvas h2 { display: flex; align-items: center; gap: 9px; font-size: 22px; line-height: 1.2; font-weight: 700; margin-bottom: 12px; }.chain-canvas h2 > .q-icon { font-size: 34px; color: #244474; }mark { background: #d2e6ff; color: #0061ff; border-radius: 7px; padding: 3px 12px; }
.chain-columns { display: grid; grid-template-columns: 23% 26% 29% 22%; gap: 0; }.chain-columns span { background: #dceafa; border-radius: 30px; text-align: center; font-size: 12px; font-weight: 750; color: #12357e; margin: 0 15px; padding: 3px; }
.flow-diagram { position: relative; height: 235px; display: grid; grid-template-columns: 23% 26% 29% 22%; }
.flow-lines { position: absolute; inset: 9px 0; width: 100%; height: 218px; pointer-events: none; }.flow-lines path { fill: none; stroke: #9eafcc; stroke-width: 1.4; }
.flow-column { z-index: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 18px; gap: 5px; min-width: 0; }.first-column { padding-left: 10px; padding-right: 25px; }.final-column { padding-right: 0; padding-left: 18px; }
.flow-node { position: relative; border: 1px solid #b9c8df; border-radius: 13px; background: linear-gradient(#fff, #f2f6fc); box-shadow: 0 2px 3px #102c6320; display: flex; align-items: center; gap: 10px; padding: 4px 10px 4px 20px; min-height: 28px; font-size: 11px; line-height: 1.05; color: #18223c; }
.flow-node::before { left: -1px; top: -1px; bottom: -1px; width: 7px; border-radius: 13px 0 0 13px; }.flow-node > .q-icon { font-size: 18px; flex-shrink: 0; }.flow-node strong { flex: 1; }.flow-node span { white-space: nowrap; font-size: 11px; }.flow-node .node-status { color: var(--risk-color); font-size: 22px; }.flow-node .trade-icon { margin-left: auto; }.flow-node .node-status { line-height: .8; }.first-column .flow-node { min-height: 38px; }.final-column .flow-node { min-height: 57px; }.upstream-column .flow-node { min-height: 29px; }.direct-column { gap: 2px; }.direct-column .flow-node { min-height: 25px; padding-top: 2px; padding-bottom: 2px; }
.chain-legend { display: grid; grid-template-columns: 1.5fr 1.1fr .9fr; gap: 20px; padding-top: 10px; border-top: 1px solid #e0e7f1; font-size: 10px; }.chain-legend > div + div { border-left: 1px solid #95a6c1; padding-left: 20px; }.chain-legend strong { display: block; margin-bottom: 6px; }.legend-items { display: flex; align-items: center; justify-content: space-between; gap: 10px; }.legend-items span { display: flex; align-items: center; gap: 5px; white-space: nowrap; color: #203458; }.legend-items .q-icon { font-size: 21px; }.legend-items .weak .q-icon { color: #f32c43; }.legend-items .strained .q-icon { color: #ffaa00; }.legend-items .many .q-icon { color: #29a629; }.dotted { letter-spacing: 3px; color: #6680a1; }.line-key { width: 25px; height: 0; border-top: 1px solid #34517b; }.line-key.dashed { border-top-style: dashed; }.line-key.dotted-line { border-top: 2px dotted #91a2bf; }
.exposure-panel { padding: 13px 14px; }.exposure-heading { margin: 0 6px 9px; }.exposure-heading h2 { font-size: 21px; }.exposure-subtitle { border-left: 1px solid #95a6c1; padding-left: 20px; font-size: 12px; }
.exposure-filter { display: flex; align-items: center; gap: 28px; border: 1px solid #e1e8f3; border-radius: 8px; background: #eff3f9b0; padding: 4px 24px; margin-bottom: 12px; font-size: 12px; }.exposure-filter label { display: flex; align-items: center; gap: 35px; }.exposure-filter .select-wrap { width: 220px; height: 28px; border-color: #609cff; }.exposure-filter select { color: #0063ff; font-weight: 600; }.world-unavailable { border-left: 1px solid #91a1ba; padding-left: 28px; display: flex; align-items: center; gap: 10px; color: #526684; }.world-unavailable .q-icon { font-size: 18px; }
.exposure-grid { display: grid; grid-template-columns: 1.66fr .8fr 1.05fr; gap: 12px; }.inset-panel { border: 1px solid #d7e1f0; border-radius: 10px; background: #ffffff70; box-shadow: 0 1px 2px #15376a0a; }.chart-card { padding: 10px 12px 3px; min-width: 0; }.chart-card h3 { font-size: 15px; line-height: 1.2; font-weight: 700; }.chart-card p { font-size: 11px; }.chart-legend { display: flex; align-items: center; justify-content: flex-end; gap: 16px; font-size: 10px; margin: 7px 0 0; }.chart-legend .dot { width: 10px; height: 10px; }.exposure-chart { width: 100%; display: block; margin-top: 4px; }.chart-axis { text-anchor: end; fill: #263958; font-size: 11px; }.point-label { fill: #171a23; font-size: 11px; font-weight: 700; }.balanced-label { font-size: 9px; fill: #344c6b; }.chart-stage { fill: #15366a; font-size: 12px; font-weight: 700; text-anchor: middle; }.vertical-label { font-size: 10px; fill: #283f61; }
.supplier-card { padding: 8px 10px; }.supplier-title { position: relative; padding: 0 0 9px 15px; border-bottom: 1px solid #dce4ef; margin-bottom: 8px; }.supplier-title::before { content: ''; position: absolute; left: -4px; width: 6px; top: -2px; bottom: 5px; background: #3d9f30; border-radius: 3px; }.supplier-title h3 { font-size: 14px; font-weight: 700; line-height: 1.2; color: #17212e; }.hs-code { background: #d9e9fc; display: inline-block; border-radius: 4px; padding: 2px 7px; font-size: 11px; margin-top: 5px; }h4 { font-size: 11px; font-weight: 750; line-height: 1.3; }.supplier-row { margin: 4px 0; }.supplier-row > div:first-child { display: flex; justify-content: space-between; font-size: 11px; }.supplier-bar { height: 15px; border-radius: 3px; overflow: hidden; background: linear-gradient(90deg, #9a9fa8 0 43%, #b4bbc6 43% 48%, #eb8a0b 48% 52%, #d0d5df 52%); }.supplier-bar span { display: block; background: #df2d40; color: white; font-size: 10px; font-weight: 600; text-align: center; line-height: 15px; }.asia-bar { background: linear-gradient(90deg, #9399a5 0 40%, #f58400 40% 48%, #d0d5df 48%); }.asia-bar span { background: #0578ff; }.malaysia-bar { background: linear-gradient(90deg, #9299a6 0 58%, #008dff 58% 65%, #d0d5df 65%); }.malaysia-bar span { background: #8811aa; }.meaning { background: #fff3e2; border-radius: 7px; padding: 6px 10px; margin-top: 11px; }.meaning h4 { color: #a45c00; }.meaning ul { padding-left: 15px; margin: 3px 0 0; font-size: 11px; line-height: 1.35; }.meaning li::marker { color: #b4790c; }
.exposure-insights { display: flex; flex-direction: column; gap: 9px; min-width: 0; }.insight-row { display: flex; align-items: center; gap: 8px; border: 1px solid #dce4ef; border-radius: 10px; background: #fff9; padding: 6px; box-shadow: 0 2px 2px #15376a08; flex: 1; }.insight-label { display: flex; align-items: center; gap: 7px; border-radius: 7px; padding: 7px 6px; flex: 1; font-size: 11px; white-space: nowrap; }.insight-label .q-icon { font-size: 23px; }.upstream-label { background: #fff1f1; }.upstream-label .q-icon { color: #fd394e; }.direct-label { background: #fff5e7; }.direct-label .q-icon { color: #e59000; }.product-label { background: #eaf5e9; }.product-label .q-icon { color: #269d25; }.count { display: flex; flex-direction: column; align-items: center; white-space: nowrap; }.count strong { font-size: 14px; line-height: 1.2; color: #202327; }.count span { font-size: 8px; }.risk-badge { display: flex; align-items: center; justify-content: center; gap: 4px; border-radius: 20px; font-size: 10px; font-weight: 600; padding: 7px; white-space: nowrap; background: #ffebed; }.risk-badge .q-icon { font-size: 17px; }.risk-badge.strained { background: #fff0db; color: #c57800; }.risk-badge.many { background: #e8f5e7; }.takeaway { display: flex; gap: 16px; padding: 13px; background: linear-gradient(120deg, #edf6ff, #fff); flex: 1.4; }.takeaway > .q-icon { font-size: 29px; color: #0877ff; background: #d9eaff; border-radius: 50%; align-self: flex-start; }.takeaway h3 { font-size: 14px; font-weight: 700; color: #0a358c; line-height: 1.4; margin-bottom: 8px; }.takeaway p { font-size: 13px; line-height: 1.25; }.data-note { color: #71819b; font-size: 10px; text-align: right; margin-top: 10px; }
.medicine-art { position: absolute; right: 12px; top: -13px; width: 185px; height: 74px; z-index: -1; }.capsule { position: absolute; left: 8px; top: 10px; width: 101px; height: 38px; border-radius: 30px; transform: rotate(-24deg); background: linear-gradient(90deg, #a8e0ff 0 48%, #6ec6f4 49%); box-shadow: inset 0 4px 5px #ffffffdf, inset 0 -5px 6px #148bcc65, 2px 8px 8px #3d9fd530; }.capsule::after { content: ''; position: absolute; left: 49%; height: 100%; border-left: 1px solid #a8e6ff; }.tablet { position: absolute; width: 57px; height: 23px; border-radius: 50%; background: #c9e8ff; box-shadow: 0 7px 0 #93cdec, 2px 10px 5px #6aadeb45; }.tablet-one { right: 4px; top: 24px; }.tablet-two { right: 32px; top: 44px; }
@media (max-width: 1199px) {
  .health-dashboard { padding: 20px 16px; }h1 { font-size: 24px; }.medicine-art { transform: scale(.8); transform-origin: right top; }.filter-bar { padding: 11px 16px; gap: 18px; }.filter { gap: 12px; }.filter + .filter { padding-left: 18px; }.section-caption { font-size: 10px; }.risk-legend { gap: 18px; font-size: 10px; }.product-summary { gap: 16px; padding-left: 10px; padding-right: 0; }.product-identity { gap: 14px; }.identity-icon { width: 52px; height: 56px; }.eyebrow { font-size: 10px; }.product-identity h2 { font-size: 27px; }.trade-total { padding-left: 10px; }.trade-total strong { font-size: 24px; }.summary-metric { gap: 12px; }.summary-metric strong { font-size: 18px; }.importer-badge { font-size: 10px; padding: 8px; }.chain-legend { gap: 14px; font-size: 9px; }.chain-legend > div + div { padding-left: 14px; }.legend-items { gap: 6px; }.legend-items .q-icon { font-size: 18px; }.flow-column { padding-left: 14px; padding-right: 14px; }.first-column { padding-left: 5px; }.final-column { padding-right: 0; }.flow-node { gap: 7px; padding-left: 17px; padding-right: 8px; font-size: 10px; }.flow-node span { font-size: 10px; }.flow-node .node-status { font-size: 19px; }.exposure-grid { grid-template-columns: 1.6fr .78fr 1.02fr; gap: 10px; }.chart-card { padding: 9px 10px 3px; }.chart-legend { gap: 10px; font-size: 9px; }.insight-row { gap: 6px; padding: 5px; }.insight-label { gap: 5px; padding: 6px 4px; font-size: 10px; }.insight-label .q-icon { font-size: 21px; }.count strong { font-size: 12px; }.count span { font-size: 7px; }.risk-badge { font-size: 9px; padding: 6px; gap: 3px; }.risk-badge .q-icon { font-size: 15px; }.supplier-title h3 { font-size: 12px; }.supplier-card { padding: 8px; }.meaning { padding: 6px; }.meaning ul { font-size: 10px; }.takeaway { padding: 10px; gap: 13px; }.takeaway p { font-size: 12px; }
}
.product-select .thai-flag { margin-left: 0; }
@media (max-width: 1023px) {
  .filter-bar { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding: 14px; }
  .filter { flex-direction: column; align-items: stretch; gap: 6px; }
  .filter > strong { font-size: 11px; color: #60728a; font-weight: 600; }
  .filter + .filter { padding-left: 0; border-left: 0; }
  .product-select { width: 100%; }
}
@media (max-width: 599px) {
  .health-dashboard { padding: 18px 12px 24px; }
  .dashboard-heading { padding: 0 2px 16px; }
  h1 { font-size: 21px; letter-spacing: -.3px; }
  .filter-bar { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .data-note { text-align: left; }
}

</style>

<style>
.health-product-options { border: 1px solid #ccdaed; border-radius: 8px; color: #14264c; }
.health-product-options .q-item { min-height: 43px; font-size: 13px; }
.health-product-options .q-item__section--avatar { min-width: 36px; }
.health-product-options .product-option-icon { font-size: 23px; }
.health-product-options .product-option-check { font-size: 20px; color: #0877ff; }
</style>
