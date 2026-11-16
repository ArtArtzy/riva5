<template>
  <section class="devices-chains" aria-labelledby="devices-chains-title">
    <ValueChainHeading :chains="headingChains" title-id="devices-chains-title" />
    <div class="chain-cards" :class="{ 'chain-cards--many': chains.length >= 9 }" aria-label="Value chain summaries">
      <button v-for="chain in chains" :key="chain.code" type="button" class="value-chain-card" :class="[chain.risk, { selected: selectedChain === chain.code }]" :aria-pressed="selectedChain === chain.code" @click="emit('chain-change', chain.code)">
        <span class="hs-code">HS {{ chain.code }}</span>
        <span class="card-heading"><span class="chain-name">{{ chain.name }}</span></span>
        <strong class="chain-trade">{{ money(chain.trade) }}</strong>
        <span class="card-details"><span class="chain-risk"><i class="dot" :class="chain.risk"></i>{{ chain.riskLabel }}</span><span v-if="selectedChain === chain.code" class="viewing-badge"><HealthOutlineIcon name="check" />Currently viewing</span><span v-else class="view-analysis">View analysis<HealthOutlineIcon name="chevron_right" /></span></span>
      </button>
    </div>
    <p v-if="data.referenceValueChains" class="trade-note">Each value chain keeps its own level: the highest across the product and its mapped inputs, including inferred links. The heading has no level of its own. Trade: Thailand imports, 2021–2023 average. Values shown follow the supplied reference.</p>
    <p v-else class="trade-note">Fictional data for demonstration only. All trade, risk and sourcing figures are simulated.<span class="methodology" tabindex="0" aria-label="Mock data methodology"><HealthOutlineIcon name="info_outline" /><q-tooltip max-width="300px">Simulated Thailand imports, shown as a 2021–2023 annual average for layout preview. Risk includes the product and its indicative inputs. These are not actual trade statistics.</q-tooltip></span></p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import ValueChainHeading from './ValueChainHeading.vue';
const props = defineProps({ data: { type: Object, required: true }, productLabel: { type: String, default: 'Devices' }, selectedChain: { type: String, default: '' } });
const emit = defineEmits(['chain-change']);
const money = value => `US$${value}m`;
const chains = computed(() => Object.values(props.data.valueChains || props.data.chains).map(chain => ({ code: chain.product.code, name: chain.product.name, trade: chain.trade, risk: chain.risk, riskLabel: `${chain.riskLabel} risk` })));
const headingChains = computed(() => chains.value.map(chain => ({ ...chain, tradeValue: chain.trade })));
</script>

<style scoped src="./valueChainCards.css"></style>
