<template>
  <section class="risk-exposure" aria-labelledby="biologics-exposure-title">
    <header>
      <h2 id="biologics-exposure-title"><HealthOutlineIcon name="bar_chart" />Risk exposure</h2>
      <p class="exposure-subtitle">Supply risk across the chain · Thailand</p>
    </header>
    <div class="exposure-visual" :style="{ maxWidth: `${exposure.width}px` }">
    <div class="chart-scroll" tabindex="0" aria-label="Thailand risk exposure chart">
      <svg class="exposure-chart" :viewBox="`0 0 ${exposure.width} 470`" :style="{ minWidth: `${exposure.width}px` }" role="group" aria-labelledby="exposure-chart-title exposure-chart-description">
        <title id="exposure-chart-title">Thailand risk exposure for HS {{ chainCode }}</title>
        <desc id="exposure-chart-description">{{ points.map(pointDescription).join(' ') }}</desc>
        <g class="stage-labels"><text v-for="stage in exposure.stages" :key="stage.label" :x="stage.x" y="19">{{ stage.label }}</text></g>
        <rect x="60" y="196" :width="exposure.width - 80" height="32" fill="#f1f3f5" />
        <g v-for="tick in ticks" :key="tick.value" class="grid-tick"><path :d="`M60 ${y(tick.value)}H${exposure.width - 20}`" /><text x="50" :y="y(tick.value) + 4" text-anchor="end">{{ tick.label }}</text></g>
        <path v-for="stage in exposure.stages.slice(0, -1)" :key="stage.label" class="stage-divider" :d="`M${stage.divider} 40V392`" />
        <text :x="exposure.width - 24" y="216" text-anchor="end" class="balanced-label">BALANCED</text>
        <text class="axis-label" :transform="`translate(18 ${y(1) + 14}) rotate(-90)`" text-anchor="end">Net exporter of the item</text>
        <text class="axis-label" :transform="`translate(14 ${y(1)}) rotate(-90)`" text-anchor="middle" dominant-baseline="central">▶</text>
        <text class="axis-label" :transform="`translate(18 ${y(-1) - 14}) rotate(-90)`">Net importer of the item</text>
        <text class="axis-label" :transform="`translate(14 ${y(-1)}) rotate(-90)`" text-anchor="middle" dominant-baseline="central">◀</text>
        <path v-for="(link, index) in exposure.links" :key="index" class="exposure-link" :class="{ indicative: link.indicative, unreadable: link.inferred }" :d="linkPath(link)" />
        <path v-if="product.position !== null" class="product-baseline" :d="`M60 ${y(product.position)}H${exposure.width - 20}`" />
        <text v-if="product.position !== null" x="65" y="444" class="baseline-label">Thailand on the product: {{ positionText(product) }}</text>
        <g v-for="point in points" :key="point.code" class="exposure-point" :class="{ clickable: hasSupplierDetails(point) }" :tabindex="hasSupplierDetails(point) ? 0 : null" :role="hasSupplierDetails(point) ? 'button' : undefined" :aria-haspopup="hasSupplierDetails(point) ? 'dialog' : undefined" :aria-label="hasSupplierDetails(point) ? `HS ${point.code}: Who supplies it. ${pointDescription(point)}` : pointDescription(point)" @click="openSupplierDetails(point)" @keydown.enter.prevent="openSupplierDetails(point)" @keydown.space.prevent="openSupplierDetails(point)">
          <circle :cx="point.x" :cy="y(point.position)" :r="point.radius" :fill="colors[point.risk]" :stroke="point.code === product.code ? '#493618' : 'white'" :stroke-width="point.code === product.code ? 2 : 1" />
          <text :x="(point.x) + point.radius + 5" :y="y(point.position) + 4">{{ point.code }}</text>
          <title>{{ pointDescription(point) }}</title>
          <q-tooltip max-width="320px">{{ pointDescription(point) }}</q-tooltip>
        </g>
        <path class="chart-bottom" :d="`M60 405H${exposure.width - 20}`" />
        <g class="stage-labels"><text v-for="stage in exposure.stages" :key="stage.label" :x="stage.x" y="425">{{ stage.label }}</text></g>
      </svg>
    </div>
    <div class="risk-legend" aria-label="Risk exposure legend">
      <span><i class="high"></i>Imported from few sources</span><span><i class="medium"></i>Medium</span><span><i class="low"></i>Many sources, or a net exporter</span><span><i class="no-data"></i>No readable sourcing</span><span>Dot size = trade in the item</span>
    </div>
    </div>
    <p class="exposure-data-note">{{ dataNote }}</p>
    <ol class="reading-guide" aria-label="How to read the risk exposure chart">
      <li><span class="guide-symbol" aria-hidden="true">→</span><p>Left to right: the chain step, from the earliest input to the product.</p></li>
      <li><span class="guide-symbol" aria-hidden="true">↕</span><p>Up and down: Thailand’s net trade in the item. Above the grey band it exports, below it imports.</p></li>
      <li><span class="guide-symbol colour-key" aria-hidden="true"><i class="high"></i><i class="medium"></i><i class="low"></i><i class="no-data"></i></span><p>Colour: exposure. Red depends on few sources, amber medium, green low or a net exporter, grey no readable sourcing.</p></li>
      <li><span class="guide-symbol size-key" aria-hidden="true"><i></i><i></i></span><p>Dot size: Thailand’s trade in the item (exports plus imports). The product is outlined.</p></li>
      <li><span class="guide-symbol line-key" aria-hidden="true"><b></b><b></b><b></b></span><p>Line style: the link. Solid listed, dashed indicative, dotted inferred (K-H, weaker evidence).</p></li>
      <li><span class="guide-symbol baseline-key" aria-hidden="true"></span><p>Dashed line across the chart: Thailand’s net trade in the product itself.</p></li>
    </ol>
    <RiskSupplierDialog v-model="supplierDialogOpen" :code="selectedSupplierCode" :detail="selectedSupplierDetail" :risk-color="selectedSupplierColor" />
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import RiskSupplierDialog from './RiskSupplierDialog.vue';
import { getRiskSupplierDetails } from './riskSupplierDetails.js';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import { biologicsChains } from './biologicsChains.js';
import { biologicsSourcing } from './biologicsSourcing.js';
import { getBiologicsRiskExposure } from './biologicsRiskExposure.js';

const props = defineProps({
  chainCode: { type: String, default: '300215' },
  chains: { type: Object, default: () => biologicsChains },
  sourcing: { type: Object, default: () => biologicsSourcing },
  dataNote: { type: String, default: 'Thailand sourcing - 2021-2023 average. Supplier shares are illustrative.' },
});

const colors = { high: '#d5222c', medium: '#a56500', low: '#337d2e', 'no-data': '#bfc1c5' };
const supplierDialogOpen = ref(false);
const selectedSupplierCode = ref('');
const selectedSupplierColor = ref(colors.medium);
const hasSupplierDetails = point => Boolean(point);
const selectedSupplierDetail = computed(() => getRiskSupplierDetails(points.value.find(point => point.code === selectedSupplierCode.value), exposure.value.sourcing));
const openSupplierDetails = point => {
  if (!hasSupplierDetails(point)) return;
  selectedSupplierCode.value = point.code;
  selectedSupplierColor.value = colors[point.risk];
  supplierDialogOpen.value = true;
};
watch([() => props.chainCode, () => props.chains], () => { supplierDialogOpen.value = false; });
const exposure = computed(() => getBiologicsRiskExposure(props.chainCode, props.chains, props.sourcing));
const points = computed(() => exposure.value.points);
const product = computed(() => exposure.value.product);
const y = position => position === null ? 462 : 212 - position * 166;
const linkPath = link => {
  const mid = (link.source.x + link.target.x) / 2;
  return `M${link.source.x} ${y(link.source.position)}C${mid} ${y(link.source.position)} ${mid} ${y(link.target.position)} ${link.target.x} ${y(link.target.position)}`;
};
const positionText = point => point.position === null ? "Trade position unavailable" : `${point.row.index || point.position.toFixed(2)} (${Math.abs(point.position) < 0.1 ? "two-way trader" : point.position > 0 ? "net exporter" : "net importer"})`;
const ticks = [{ value: 1, label: '+1' }, { value: .5, label: '+0.5' }, { value: 0, label: '0' }, { value: -.5, label: '−0.5' }, { value: -1, label: '−1' }];
const pointDescription = point => `HS ${point.code}: ${point.name}. ${point.riskLabel}. ${positionText(point)}. ${point.approximate ? 'Approximate position and size from the reference chart.' : `Imports ${point.row.imports || 'unavailable'}; exports ${point.row.exports || 'unavailable'} a year.`}`;
</script>

<style scoped>
.exposure-data-note { margin-top: 12px; font-size: 11px; color: #60728a; line-height: 1.5; }
.risk-exposure { --muted: #60728a; padding: 18px; border: 1px solid #dbe4ee; border-radius: 10px; background: #fff; color: #142b4b; margin-bottom: 16px; }
h2, p { margin: 0; }
h2 { display: flex; gap: 18px; align-items: center; font-size: 22px; font-weight: 750; line-height: 1.3; letter-spacing: -.5px; }
h2 > .q-icon { font-size: 28px; color: #397ec5; }
.exposure-subtitle { margin-top: 8px; color: var(--muted); font-size: 16px; line-height: 1.5; }
.exposure-visual { width: 100%; min-width: 0; margin: 16px auto 0; }
.risk-legend { display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: 10px; color: var(--muted); margin: 10px 0 4px; }.risk-legend span { display: inline-flex; align-items: center; gap: 5px; } i { display: inline-block; flex-shrink: 0; width: 9px; height: 9px; border-radius: 50%; }.high { background: #d5222c; }.medium { background: #a56500; }.low { background: #337d2e; }.no-data { background: #bfc1c5; }
.chart-scroll { overflow-x: auto; }.exposure-chart { display: block; width: 100%; min-width: 540px; }.stage-labels { text-anchor: middle; font-size: 10px; fill: #48617f; }.grid-tick path, .stage-divider { fill: none; stroke: #dfe5ed; stroke-dasharray: 2 3; }.grid-tick text { font-size: 11px; fill: #48617f; }.balanced-label, .axis-label { fill: #48617f; font-size: 10px; }.exposure-link { fill: none; stroke: #bfc9d5; stroke-width: 1.3; }.exposure-link.indicative { stroke-dasharray: 4 4; }.exposure-link.unreadable { stroke-dasharray: 1 4; }.product-baseline { fill: none; stroke: #626c79; stroke-dasharray: 4 4; }.baseline-label, .exposure-point text { font-size: 10px; fill: #142b4b; }.exposure-point { cursor: help; }.exposure-point.clickable { cursor: pointer; }.exposure-point.clickable:hover circle { stroke: #0876ff; stroke-width: 3; }.exposure-point:focus { outline: none; }.exposure-point:focus-visible circle { stroke: #0876ff; stroke-width: 3; }.chart-bottom { fill: none; stroke: #dbe4ee; }
.reading-guide { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px 24px; counter-reset: guide-step; list-style: none; margin: 20px 0 0; padding: 16px 0 0; border-top: 1px solid #e3e9f0; }
.reading-guide li { display: flex; align-items: center; gap: 8px; counter-increment: guide-step; min-width: 0; }
.reading-guide li::before { content: counter(guide-step); display: grid; place-items: center; flex-shrink: 0; width: 19px; height: 19px; border-radius: 50%; background: #f1f4f7; color: #142b4b; font-size: 10px; font-weight: 600; }
.reading-guide p { color: #48617f; font-size: 12px; line-height: 1.5; }
.guide-symbol { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; gap: 3px; color: #555; font-size: 18px; }
.colour-key i { width: 8px; height: 8px; }.size-key i { width: 6px; height: 6px; background: #555; }.size-key i + i { width: 12px; height: 12px; }
.line-key { gap: 2px; }.line-key b { width: 17px; border-top: 2px solid #555; }.line-key b:nth-child(2) { border-top-style: dashed; }.line-key b:nth-child(3) { border-top-style: dotted; }.baseline-key { width: 20px; border-top: 2px dashed #555; }
@media (max-width: 1023px) { .reading-guide { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .risk-exposure { padding: 14px; } h2 { font-size: 17px; }.reading-guide { grid-template-columns: minmax(0, 1fr); gap: 14px; } }
@media (max-width: 1199px) { h2 { font-size: 21px; } }
@media (max-width: 767px) { h2 { gap: 12px; font-size: 20px; } h2 > .q-icon { font-size: 26px; } }
</style>
