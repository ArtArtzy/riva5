<template>
  <section class="biologics-chains" aria-labelledby="biologics-chains-title">
    <ValueChainHeading :chains="headingChains" title-id="biologics-chains-title" />
    <div class="chain-cards" :class="{ 'chain-cards--many': chains.length >= 9 }" aria-label="Value chain summaries">
      <button v-for="chain in chains" :key="chain.code" type="button" class="value-chain-card" :class="[chain.risk, { selected: selectedChain === chain.code }]" :aria-pressed="selectedChain === chain.code" @click="emit('chain-change', chain.code)">
        <span class="hs-code">HS {{ chain.code }}</span>
        <span class="card-heading"><span class="chain-name">{{ chain.name }}</span></span>
        <strong class="chain-trade">{{ chain.trade }}</strong>
        <span class="card-details"><span class="chain-risk"><i class="dot" :class="chain.risk"></i>{{ chain.riskLabel }}</span><span v-if="selectedChain === chain.code" class="viewing-badge"><HealthOutlineIcon name="check" />Currently viewing</span><span v-else class="view-analysis">View analysis<HealthOutlineIcon name="chevron_right" /></span></span>
      </button>
    </div>
    <p class="trade-note"><span class="methodology" tabindex="0" aria-label="Methodology: trade represents Thailand imports, annual average for 2021–2023. Risk includes the product and its mapped inputs."><HealthOutlineIcon name="info_outline" /><q-tooltip max-width="300px">Trade represents Thailand imports, annual average for 2021–2023. Risk includes the product and its mapped inputs. Illustrative static data.</q-tooltip></span>Risk is assessed per value chain. Values are rounded.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import HealthOutlineIcon from './HealthOutlineIcon.vue';
import ValueChainHeading from './ValueChainHeading.vue';
import { biologicsValueChains } from './healthValueChains.js';

// Pass a static array to preview 1, 2, 3 or 12 informational cards.
const props = defineProps({
  chains: { type: Array, default: () => biologicsValueChains },
  selectedChain: { type: String, default: '' },
});
const emit = defineEmits(['chain-change']);
const tradeValue = chain => chain.tradeValue ?? Number(chain.trade.replace(/[^0-9.]/g, ''));
const headingChains = computed(() => props.chains.map(chain => ({ ...chain, tradeValue: tradeValue(chain) })));
</script>

<style scoped src="./valueChainCards.css"></style>
