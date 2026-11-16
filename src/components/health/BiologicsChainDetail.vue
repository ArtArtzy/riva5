<template>
  <section class="chain-detail" aria-labelledby="biologics-detail-title">
    <header class="detail-heading">
      <h2 id="biologics-detail-title"><HealthOutlineIcon name="account_tree" /> Supply chain</h2>
      <span class="selected-product"><HealthOutlineIcon name="check" />{{ product.name }} &middot; HS {{ product.code }}</span>
    </header>

    <div class="risk-summary" :class="chain.risk" aria-label="Supply risk for Thailand sourcing">
      <div class="summary-item overall-risk">
        <HealthOutlineIcon name="shield" />
        <div class="summary-copy">
          <span class="summary-label">Supply risk</span>
          <strong>{{ chain.riskLabel }}</strong>
        </div>
      </div>
      <div class="summary-item">
        <HealthOutlineIcon name="account_tree" />
        <div class="summary-copy">
          <span class="summary-label">Further upstream</span>
          <strong :class="{ unavailable: !chain.upstreamSummary }">{{ chain.upstreamSummary || 'Not counted' }}</strong>
        </div>
      </div>
      <div class="summary-item">
        <HealthOutlineIcon name="hub" />
        <div class="summary-copy">
          <span class="summary-label">Direct inputs</span>
          <strong>{{ chain.directSummary }}</strong>
        </div>
      </div>
      <div class="summary-item product-summary" :class="product.risk">
        <HealthOutlineIcon :name="product.icon" />
        <div class="summary-copy">
          <span class="summary-label">The product</span>
          <strong>{{ chain.productSummary }}</strong>
        </div>
      </div>
    </div>

    <div class="chain-figure" :class="{ 'has-upstream': upstreamGroups.length }" role="group" :aria-label="`${chain.upstream?.length || 0} upstream inputs and ${inputs.length} direct inputs for ${product.name}, HS ${product.code}`">
      <p class="interaction-hint">Click a block to see who supplies it.</p>
      <div class="chain-scroll" tabindex="0" aria-label="Supply chain stages">
      <div class="stage-headings" :style="stageStyle"><span v-for="group in upstreamGroups" :key="group.label">{{ group.label }} <small>({{ group.nodes.length }})</small></span><span>DIRECT INPUTS <small>({{ inputs.length }})</small></span><span>THE PRODUCT</span></div>
      <div ref="flowRoot" class="flow-diagram" :style="stageStyle">
        <svg class="flow-lines" :viewBox="`0 0 ${flowSize.width} ${flowSize.height}`" preserveAspectRatio="none" aria-hidden="true"><path v-for="(connection, index) in connections" :key="index" :class="{ indicative: connection.indicative, inferred: connection.inferred }" :d="connection.d" /></svg>
        <div v-for="group in upstreamGroups" :key="group.label" class="input-stack upstream-stack"><SupplierChainNode v-for="node in group.nodes" :key="`${selectedChainCode}-${node.code}`" ref="upstreamNodes" :node="node" :rows="sourcingRows[node.code] || []" /></div>
        <div class="input-stack">
          <SupplierChainNode v-for="input in inputs" :key="`${selectedChainCode}-${input.code}`" ref="inputNodes" :node="input" :rows="sourcingRows[input.code] || []" />
        </div>
        <div class="mobile-connector" aria-hidden="true"><HealthOutlineIcon name="south" /></div>
        <div class="product-column"><SupplierChainNode :key="selectedChainCode" ref="productNode" :node="product" :rows="sourcingRows[product.code] || []" final /></div>
      </div>
      </div>
    </div>
    <footer class="detail-footer">
      <div class="symbol-kit" aria-label="Supply chain legend">
        <div class="flow-legend"><span><SupplyRiskSymbol kind="weak" />Few sources</span><span><SupplyRiskSymbol kind="strained" />Strained</span><span><SupplyRiskSymbol kind="sound" />Many sources</span><span><SupplyRiskSymbol kind="unreadable" />No readable data</span></div>
        <div class="flow-legend"><span><HealthOutlineIcon name="north" />Net exporter</span><span><HealthOutlineIcon name="south" />Net importer</span><span><HealthOutlineIcon name="swap_vert" />Two-way trade</span><span><i class="line-key"></i>Listed</span><span><i class="line-key indicative"></i>Indicative</span><span><i class="line-key inferred"></i>Inferred</span></div>
      </div>
      <p>{{ chain.referenceSupplyRisk ? 'Supplied reference · Thailand sourcing · 2021–2023 average' : dataNote }}<span class="methodology" tabindex="0" aria-label="Supply risk methodology"><HealthOutlineIcon name="info_outline" /><q-tooltip max-width="320px">Overall risk is the highest level across the product and its mapped inputs. {{ chain.methodology }}</q-tooltip></span></p>
    </footer>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import SupplierChainNode from './SupplierChainNode.vue';
import SupplyRiskSymbol from './SupplyRiskSymbol.vue';
import { biologicsSourcing } from './biologicsSourcing.js';
import { biologicsChains } from './biologicsChains.js';

const props = defineProps({
  initialChain: { type: String, default: '300249' },
  selectedChain: { type: String, default: '' },
  chains: { type: Object, default: () => biologicsChains },
  sourcing: { type: Object, default: () => biologicsSourcing },
  dataNote: { type: String, default: 'Thailand sourcing · 2021–2023 average' },
});
const selectedChainCode = ref(props.selectedChain || props.initialChain);
watch(() => props.selectedChain, code => {
  if (props.chains[code]) selectedChainCode.value = code;
});
const emit = defineEmits(['chain-change']);
watch(selectedChainCode, code => emit('chain-change', code), { immediate: true });
const chain = computed(() => props.chains[selectedChainCode.value] || Object.values(props.chains)[0]);
const sourcingRows = computed(() => chain.value.sourcing || props.sourcing);
const inputs = computed(() => chain.value.inputs);
const product = computed(() => chain.value.product);
const upstreamGroups = computed(() => {
  const groups = new Map();
  for (const node of chain.value.upstream || []) {
    if (!groups.has(node.stage)) groups.set(node.stage, []);
    groups.get(node.stage).push(node);
  }
  return [...groups].map(([label, nodes]) => ({ label, nodes }));
});
const stageStyle = computed(() => upstreamGroups.value.length ? {
  gridTemplateColumns: `repeat(${upstreamGroups.value.length + 2}, minmax(var(--stage-min-width), var(--stage-max-width, 1fr)))`,
  gap: '40px', minWidth: `calc(${upstreamGroups.value.length + 2} * var(--stage-min-width) + ${(upstreamGroups.value.length + 1) * 40}px)`,
} : undefined);

// Only geometry follows the expanded cards; sourcing values remain static.
const flowRoot = ref(null);
const inputNodes = ref([]);
const upstreamNodes = ref([]);
const productNode = ref(null);
const flowSize = ref({ width: 1000, height: 204 });
const connections = ref([]);
let observer;
let frame;
function updateConnections() {
  const root = flowRoot.value?.getBoundingClientRect();
  const target = productNode.value?.element?.getBoundingClientRect();
  if (!root?.width || !target) return;
  flowSize.value = { width: root.width, height: root.height };
  const nodes = [...upstreamNodes.value, ...inputNodes.value, productNode.value].filter(Boolean);
  const links = [
    ...inputs.value.map(input => ({ from: input.code, to: product.value.code, indicative: input.indicative })),
    ...(chain.value.links || []),
  ];
  connections.value = links.flatMap(link => {
    const component = nodes.find(item => item.code === link.from);
    const destination = nodes.find(item => item.code === link.to)?.element?.getBoundingClientRect();
    if (!component?.element || !destination) return [];
    const rect = component.element.getBoundingClientRect();
    const x = rect.right - root.left;
    const y = rect.top + rect.height / 2 - root.top;
    const targetX = destination.left - root.left;
    const targetY = destination.top + destination.height / 2 - root.top;
    const middle = (x + targetX) / 2;
    return [{ d: `M${x} ${y}C${middle} ${y} ${middle} ${targetY} ${targetX} ${targetY}`, indicative: link.indicative === true, inferred: link.inferred === true }];
  });
}
async function observeNodes() {
  await nextTick();
  observer?.disconnect();
  [flowRoot.value, ...upstreamNodes.value.map(component => component.element), ...inputNodes.value.map(component => component.element), productNode.value?.element].filter(Boolean).forEach(element => observer?.observe(element));
  updateConnections();
}
onMounted(() => {
  observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateConnections);
  });
  observeNodes();
});
watch(selectedChainCode, () => {
  connections.value = [];
  observeNodes();
}, { flush: 'post' });
onBeforeUnmount(() => { observer?.disconnect(); cancelAnimationFrame(frame); });
</script>

<style scoped>
.chain-detail { --stage-min-width: 280px; --navy: #142b4b; --muted: #60728a; --medium: #ab7b25; --low: #648766; --no-data: #a9b1bc; --border: #dbe4ee; padding: 18px; margin-bottom: 16px; border: 1px solid var(--border); border-radius: 10px; background: #fff; color: var(--navy); }
h2, h3, p { margin: 0; }
.detail-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 16px; }
h2 { display: flex; gap: 18px; align-items: center; font-size: 22px; font-weight: 750; line-height: 1.3; letter-spacing: -.5px; }
h2 > .q-icon { font-size: 28px; color: #397ec5; }
.chain-picker { display: flex; align-items: center; gap: 12px; min-width: 0; }.chain-picker label { font-size: 11px; color: var(--muted); white-space: nowrap; }.detail-select { width: 360px; min-width: 0; font-size: 12px; }
.detail-select :deep(.q-field__control) { min-height: 38px; height: 38px; border-radius: 6px; background: #fff; }.detail-select :deep(.q-field__control::before) { border-color: var(--border); }.detail-select :deep(.q-field__marginal) { height: 38px; color: var(--navy); font-size: 21px; }.detail-select :deep(.q-field__native) { color: var(--navy); min-height: 38px; flex-wrap: nowrap; padding: 0; }.detail-select :deep(.q-field__native > span) { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.selected-product { display: inline-flex; align-items: center; gap: 8px; max-width: 100%; padding: 6px 14px 6px 8px; border-radius: 24px; background: #e7effb; color: #142b4b; font-size: 12px; font-weight: 700; }
.selected-product > .q-icon { width: 20px; height: 20px; padding: 4px; border-radius: 50%; background: #0061ff; color: #fff; }
.risk-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid #eee2c9; border-radius: 12px; background: #fdf9f1; padding: 14px 0; }
.risk-summary > div { padding: 0 24px; min-width: 0; }
.risk-summary > div + div { border-left: 1px solid #eee2c9; }
.summary-item { display: grid; grid-template-columns: 34px minmax(0, 1fr); align-items: start; gap: 16px; }
.summary-item > .q-icon { margin-top: 6px; color: #bb8000; font-size: 34px; }
.summary-copy { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.summary-label { color: #142b4b; font-size: 12px; font-weight: 700; line-height: 1.3; }
.summary-item strong { color: #a86f00; font-size: 18px; font-weight: 700; line-height: 1.25; overflow-wrap: anywhere; }
.overall-risk strong { font-size: 22px; }
.summary-item .unavailable { color: #101e45; }
.chain-figure { width: 100%; min-width: 0; margin: 18px 0 12px; }
.chain-scroll { min-width: 0; }
.has-upstream .chain-scroll { overflow-x: auto; padding: 3px 3px 12px; }
.has-upstream .upstream-stack { align-self: center; }
.stage-headings { display: grid; grid-template-columns: 44% 40%; justify-content: space-between; gap: 16%; margin-bottom: 8px; }.stage-headings > span { border-radius: 4px; background: #f0f5fb; color: #48617f; text-align: center; padding: 5px; font-size: 10px; font-weight: 700; letter-spacing: .5px; }.stage-headings small { font-size: inherit; font-weight: 400; }
.flow-diagram { position: relative; display: grid; grid-template-columns: 44% 40%; justify-content: space-between; min-height: 204px; }.flow-lines { position: absolute; inset: 0; height: 100%; width: 100%; pointer-events: none; }.flow-lines path { fill: none; stroke: #aab9cd; stroke-width: 1.4; }.flow-lines .indicative { stroke-dasharray: 4 4; }
.input-stack { display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 4px 0; z-index: 1; min-width: 0; }
.product-column { display: flex; align-items: center; z-index: 1; min-width: 0; }.product-column > * { width: 100%; }
.mobile-connector { display: none; }.detail-footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px 18px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 10px; color: var(--muted); }.flow-legend { display: flex; flex-wrap: wrap; gap: 10px 16px; }.flow-legend > span { display: inline-flex; align-items: center; gap: 5px; }.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--risk-color); }.line-key { width: 21px; border-top: 1px solid #aab9cd; }.line-key.indicative { border-top-style: dashed; }.detail-footer p { display: flex; align-items: center; gap: 6px; }.methodology { display: inline-flex; font-size: 14px; cursor: help; border-radius: 50%; }.methodology:focus-visible { outline: 2px solid #397ec5; outline-offset: 2px; }
.interaction-hint { color: #60728a; font-size: 13px; line-height: 1.5; margin-bottom: 12px; }
.symbol-kit { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 24px; }
.flow-legend .risk-symbol { width: 23px; height: 17px; }
.flow-legend .q-icon { font-size: 16px; }
.line-key.inferred { border-top-style: dotted; }
.flow-lines .inferred { stroke-dasharray: 1 4; stroke-linecap: round; }

.risk-summary.high { background: #fdf5f5; border-color: #eedbdd; }
.risk-summary.high .overall-risk > .q-icon, .risk-summary.high .overall-risk strong, .product-summary.high > .q-icon, .product-summary.high strong { color: #b95660; }
.product-summary.low > .q-icon, .product-summary.low strong { color: var(--low); }
.product-summary.no-data > .q-icon, .product-summary.no-data strong { color: var(--no-data); }
.risk-summary.low { background: #f1f8f0; border-color: #d4e5d2; }
.risk-summary.low .overall-risk > .q-icon, .risk-summary.low .overall-risk strong, .risk-summary.low .summary-item > .q-icon, .risk-summary.low .summary-item strong:not(.unavailable) { color: var(--low); }

@media (min-width: 1024px) {
  .chain-detail { --stage-min-width: 340px; --stage-max-width: 480px; }
  .chain-scroll { overflow-x: auto; padding: 3px 3px 12px; }
  .chain-figure:not(.has-upstream) .stage-headings,
  .chain-figure:not(.has-upstream) .flow-diagram {
    grid-template-columns: minmax(var(--stage-min-width), min(44%, var(--stage-max-width))) minmax(var(--stage-min-width), min(40%, var(--stage-max-width)));
    min-width: 840px;
  }
}
@media (max-width: 1199px) { h2 { font-size: 21px; } .risk-summary > div { padding-left: 16px; padding-right: 16px; } .summary-item { grid-template-columns: 28px minmax(0, 1fr); gap: 12px; } .summary-item > .q-icon { font-size: 28px; } .summary-item strong { font-size: 16px; } .overall-risk strong { font-size: 20px; } }
@media (max-width: 767px) { h2 { gap: 12px; font-size: 20px; } h2 > .q-icon { font-size: 26px; } }
@media (max-width: 959px) { .risk-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 16px; }.risk-summary > div:nth-child(3) { border-left: 0; }.risk-summary > div:nth-child(n+3) { padding-top: 12px; border-top: 1px solid #e6dfd1; }.detail-heading { align-items: flex-start; }.chain-picker { flex-direction: column; align-items: flex-start; gap: 5px; }.detail-select { width: 320px; } }
@media (max-width: 639px) { .chain-detail { padding: 14px; }.detail-heading { flex-direction: column; gap: 12px; }.chain-picker, .detail-select { width: 100%; }.risk-summary > div { padding-left: 10px; padding-right: 10px; }.summary-item strong { font-size: 16px; }.summary-item { grid-template-columns: 24px minmax(0, 1fr); gap: 10px; }.summary-item > .q-icon { font-size: 24px; }.overall-risk strong { font-size: 20px; }.summary-note { line-height: 1.5; }.stage-headings { grid-template-columns: 1fr; gap: 0; }.stage-headings > span:last-child { display: none; }.flow-diagram { grid-template-columns: minmax(0, 1fr); }.flow-lines { display: none; }.mobile-connector { display: flex; align-items: center; justify-content: center; color: #9aacbf; height: 40px; font-size: 24px; }.product-column { flex-direction: column; align-items: stretch; gap: 8px; }.product-column::before { content: 'THE PRODUCT'; border-radius: 4px; background: #f0f5fb; color: #48617f; text-align: center; padding: 5px; font-size: 10px; font-weight: 700; letter-spacing: .5px; }.detail-footer { font-size: 9px; } }
@media (max-width: 599px) {
  .risk-summary { grid-template-columns: minmax(0, 1fr); row-gap: 0; }
  .risk-summary > div { padding: 12px 16px; }
  .risk-summary > div + div { border-left: 0; border-top: 1px solid #eee2c9; }
}
@media (max-width: 639px) {
  .has-upstream .stage-headings > span { display: block; }
  .has-upstream .flow-lines { display: block; }
  .has-upstream .mobile-connector, .has-upstream .product-column::before { display: none; }
  .has-upstream .product-column { justify-content: center; }
}
</style>
