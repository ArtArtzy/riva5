<template>
  <article ref="element" class="supplier-node" :class="[node.risk, { expanded: open, 'final-node': final }]">
    <button type="button" class="node-trigger" :aria-expanded="open" :aria-controls="`suppliers-${node.code}`" @click="open = !open">
      <HealthOutlineIcon :name="node.icon" class="product-icon" />
      <span class="node-copy" :title="node.description || node.name"><strong>{{ node.name }}</strong><span>HS {{ node.code }}</span></span>
      <span class="node-evidence"><span :title="node.description"><SupplyRiskSymbol :kind="symbolKind" />{{ open ? node.supplierEvidence || node.evidence : node.evidence }}</span><small>{{ node.riskLabel }}</small></span>
      <HealthOutlineIcon name="expand_more" class="expand-icon" />
    </button>
    <div v-if="open" :id="`suppliers-${node.code}`" class="supplier-rows">
      <p v-if="!rows.length" class="unavailable-sourcing">Supplier breakdown not provided in the reference.</p>
      <div v-for="(row, rowIndex) in rows" :key="row.region" class="supplier-row">
        <span class="region" tabindex="0" :aria-label="rowDescription(row)">
          <HealthOutlineIcon v-if="row.position" :name="row.position" /><span v-else class="position-placeholder"></span>{{ row.region }}
          <q-tooltip max-width="300px">{{ rowDescription(row) }}</q-tooltip>
        </span>
        <span v-if="row.unavailable" class="unavailable-sourcing">Not provided</span>
        <span v-else-if="row.small" class="small-trade" tabindex="0" :aria-label="rowDescription(row)">Under US$1m · too small to read<q-tooltip>{{ rowDescription(row) }}</q-tooltip></span>
        <div
          v-else
          class="supplier-bar"
          tabindex="0"
          :aria-label="`${row.region} supplier shares for ${node.name}`"
          :aria-describedby="`supplier-tooltip-${node.code}-${rowIndex}`"
          @focus="tooltipOpen[row.region] = true"
          @blur="tooltipOpen[row.region] = false"
          @keydown.esc.stop="tooltipOpen[row.region] = false"
        >
          <span v-for="(segment, index) in row.segments" :key="index" class="supplier-segment" :class="{ grouped: segment.grouped }" :style="{ width: `${segment.width}%`, backgroundColor: segment.color }">
            <span>{{ segment.label }}</span>
          </span>
          <q-tooltip
            :id="`supplier-tooltip-${node.code}-${rowIndex}`"
            v-model="tooltipOpen[row.region]"
            class="supplier-tooltip"
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 12]"
            :delay="120"
            max-width="320px"
          >
            <div class="supplier-tooltip-heading">
              <strong>{{ row.region }}</strong>
              <span>Supplier shares</span>
            </div>
            <p class="supplier-tooltip-product">{{ node.name }} &middot; HS {{ node.code }}</p>
            <div v-if="row.imports || row.exports" class="supplier-tooltip-trade">
              <div v-if="row.imports"><span>Annual imports</span><strong>{{ row.imports }}</strong></div>
              <div v-if="row.exports"><span>Annual exports</span><strong>{{ row.exports }}</strong></div>
            </div>
            <div class="supplier-tooltip-countries">
              <div v-for="(segment, index) in row.segments" :key="index" class="supplier-tooltip-country">
                <i :style="{ backgroundColor: segment.color }"></i>
                <span>{{ supplierLabel(segment) }}</span>
                <strong>{{ segment.width }}%</strong>
              </div>
            </div>
            <p class="supplier-tooltip-note">Illustrative supplier shares &middot; Total 100%</p>
          </q-tooltip>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { computed, ref } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import SupplyRiskSymbol from './SupplyRiskSymbol.vue';
const props = defineProps({ node: { type: Object, required: true }, rows: { type: Array, required: true }, final: Boolean });
const open = ref(false);
const tooltipOpen = ref({});
const supplierLabel = segment => segment.name || segment.label.replace(/\s+\d+(?:\.\d+)?%$/, '');
const element = ref(null);
const symbolKind = computed(() => ({ high: 'weak', medium: 'strained', low: 'sound', 'no-data': 'unreadable' })[props.node.risk]);
const rowDescription = row => [row.region, row.unavailable && 'Supplier breakdown not provided in the reference', row.positionLabel && `${row.positionLabel} (${row.index})`, row.imports && `Imports: ${row.imports} a year`, row.exports && `Exports: ${row.exports} a year`, row.note].filter(Boolean).join('. ');
defineExpose({ element, code: computed(() => props.node.code) });
</script>
<style scoped>
.supplier-node { --risk-color: #ab7b25; --risk-background: #fbf4e9; --risk-hover: #f5ead8; position: relative; min-width: 0; background: var(--risk-background); border: 1px solid #dbe4ee; border-left: 3px solid var(--risk-color); border-radius: 7px; }
.high { --risk-color: #b95660; --risk-background: #fcf0f1; --risk-hover: #f8e3e6; }
.unavailable-sourcing { margin: 0; color: #7c8799; font-size: 9px; line-height: 1.5; }
.low { --risk-color: #648766; --risk-background: #f1f8ef; --risk-hover: #e6f1e2; }.no-data { --risk-color: #a9b1bc; --risk-background: #f6f7f9; --risk-hover: #eceff3; }.expanded { border-top-color: #becddd; border-right-color: #becddd; border-bottom-color: #becddd; }
.node-trigger { display: flex; align-items: center; gap: 9px; width: 100%; min-height: 60px; padding: 10px 11px; border: 0; border-radius: 5px; background: transparent; color: #142b4b; text-align: left; font: inherit; cursor: pointer; }.node-trigger:hover { background: var(--risk-hover); }.node-trigger:focus-visible { outline: 2px solid #397ec5; outline-offset: 2px; }
.product-icon { font-size: 23px; color: #355071; }.node-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 3px; }.node-copy strong { font-size: 12px; font-weight: 600; line-height: 1.35; }.node-copy > span { font-size: 10px; color: #60728a; }
.node-evidence { display: flex; flex-shrink: 0; flex-direction: column; align-items: flex-end; gap: 3px; font-size: 10px; }.node-evidence > span { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }.node-evidence small { font-size: 9px; color: var(--risk-color); }.node-evidence .risk-symbol { width: 20px; height: 15px; }.expand-icon { color: #71829a; font-size: 16px; transition: transform .15s; }.expanded .expand-icon { transform: rotate(180deg); }
.supplier-rows { padding: 0 10px 11px; display: flex; flex-direction: column; gap: 7px; }.supplier-row { display: flex; align-items: center; gap: 7px; min-width: 0; }.region { display: inline-flex; align-items: center; gap: 3px; width: 83px; flex-shrink: 0; font-size: 9px; color: #354d6d; cursor: help; }.region > .q-icon, .position-placeholder { display: inline-block; flex-shrink: 0; width: 13px; height: 13px; font-size: 13px; }
.supplier-bar { display: flex; flex: 1; height: 19px; min-width: 0; border-radius: 3px; overflow: hidden; background: #e8ecf1; }.supplier-segment { display: flex; align-items: center; justify-content: center; min-width: 0; color: #fff; font-size: 8px; font-weight: 600; border-right: 1px solid #ffffffb0; cursor: help; }.supplier-segment:last-child { border-right: 0; }.supplier-segment > span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 2px; }.supplier-segment.grouped { color: #485a70; font-weight: 400; }.small-trade { color: #7c8799; font-size: 9px; font-style: italic; cursor: help; }
.region:focus-visible, .supplier-bar:focus-visible, .small-trade:focus-visible { outline: 2px solid #397ec5; outline-offset: -2px; }
:global(.supplier-tooltip) {
  width: 292px;
  max-width: calc(100vw - 32px);
  padding: 16px;
  border: 1px solid #dce5f1;
  border-radius: 12px;
  background: #fff;
  color: #142b4b;
  box-shadow: 0 8px 32px #142b4b24, 0 2px 6px #142b4b0d;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.45;
}
.supplier-tooltip-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.supplier-tooltip-heading > strong { font-size: 16px; font-weight: 750; }
.supplier-tooltip-heading > span { color: #60728a; font-size: 11px; }
.supplier-tooltip-product { margin: 4px 0 12px; color: #60728a; font-size: 11px; }
.supplier-tooltip-trade { display: flex; flex-wrap: wrap; gap: 10px 20px; padding: 10px 12px; border-radius: 7px; background: #f1f6fc; }
.supplier-tooltip-trade > div { display: flex; flex-direction: column; gap: 2px; }
.supplier-tooltip-trade span { color: #60728a; font-size: 10px; }
.supplier-tooltip-trade strong { font-size: 13px; font-variant-numeric: tabular-nums; }
.supplier-tooltip-countries { display: flex; flex-direction: column; gap: 9px; padding-top: 13px; }
.supplier-tooltip-country { display: grid; grid-template-columns: 9px minmax(0, 1fr) auto; align-items: center; gap: 9px; }
.supplier-tooltip-country > i { width: 9px; height: 9px; border-radius: 3px; }
.supplier-tooltip-country > strong { font-variant-numeric: tabular-nums; font-weight: 700; }
.supplier-tooltip-country:last-child { margin-top: 2px; padding-top: 9px; border-top: 1px solid #e7edf5; }
.supplier-tooltip-note { margin: 12px 0 0; color: #71829a; font-size: 10px; }
@media (max-width: 959px) { .node-trigger { gap: 6px; padding: 9px; }.product-icon { font-size: 20px; }.node-copy strong { font-size: 11px; }.node-evidence { font-size: 9px; }.node-evidence .risk-symbol { width: 17px; }.supplier-rows { padding-left: 7px; padding-right: 7px; }.region { width: 73px; font-size: 8px; }.supplier-row { gap: 4px; }.supplier-segment { font-size: 7px; } }
@media (max-width: 639px) { .node-copy strong { font-size: 12px; }.supplier-segment { font-size: 8px; }.region { width: 78px; font-size: 9px; }.node-evidence { font-size: 9px; } }
</style>
