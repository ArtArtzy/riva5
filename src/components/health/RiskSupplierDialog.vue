<template>
  <q-dialog v-model="open">
    <q-card v-if="detail" class="supplier-popup" :style="{ borderLeftColor: riskColor }" aria-labelledby="supplier-popup-title">
      <q-card-section>
        <div class="popup-heading">
          <h2 id="supplier-popup-title">Who supplies it</h2>
          <q-btn flat round dense icon="close" aria-label="Close supplier details" @click="open = false" />
        </div>
        <h3>{{ detail.name }}</h3>
        <p class="hs-code">HS {{ code }}</p>
        <div class="supplier-badges"><span v-for="badge in detail.badges" :key="badge">{{ badge }}</span></div>
        <div class="country-picker">
          <q-select v-model="countries" :options="supplierCountryOptions" multiple emit-value map-options use-chips outlined dense :max-values="3" label="Add countries" :hint="`${countries.length}/3 countries · Shared across all products`" />
        </div>
        <p v-if="!detail.rows.length" class="small-trade">Supplier breakdown not provided for this item.</p>
        <div v-for="row in displayRows" :key="row.region" class="supply-row">
          <div class="supply-label"><strong>{{ row.region }} buys from <small v-if="row.mock" class="mock-badge">Simulated</small></strong><span v-if="row.imports">{{ row.imports }} a year</span><q-btn v-if="row.mock" flat round dense size="xs" icon="close" :aria-label="`Remove ${row.region}`" @click="removeCountry(row.countryCode)" /></div>
          <p v-if="row.unavailable" class="small-trade">Supplier breakdown not provided.</p>
          <p v-else-if="row.small" class="small-trade">Under US$1 m a year: too small to read.</p>
          <div v-else class="supplier-bar" :aria-label="`${row.region} supplier shares`">
            <div v-for="(segment, index) in row.segments" :key="index" class="supplier-share" :class="{ others: segment.grouped }" :style="{ width: `${segment.width}%`, background: segment.color }" :title="segment.detail">
              <span>{{ segment.label }}</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
import { supplierCountryOptions, selectedSupplierCountries, setSupplierCountries, mockSupplierRow } from './riskSupplierCountries.js';

const open = defineModel({ type: Boolean, default: false });
const props = defineProps({ detail: { type: Object, default: null }, code: { type: String, default: '' }, riskColor: { type: String, default: '#a56500' } });
const detail = computed(() => props.detail);
const countries = computed({ get: selectedSupplierCountries, set: setSupplierCountries });
const displayRows = computed(() => [
  ...(detail.value?.rows || []),
  ...countries.value.map(country => mockSupplierRow(props.code, country)).filter(Boolean),
]);
const removeCountry = code => { countries.value = countries.value.filter(country => country !== code); };
</script>

<style scoped>
.supplier-popup { width: 430px; max-width: calc(100vw - 32px); border-left: 5px solid; color: #142b4b; border-radius: 8px; }
.popup-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
h2, h3, p { margin: 0; }
h2 { font-size: 20px; font-weight: 700; line-height: 1.3; }
h3 { font-size: 14px; line-height: 1.4; font-weight: 600; }
.hs-code { font: 12px monospace; color: #60728a; margin-top: 6px; }
.supplier-badges { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0 16px; }
.supplier-badges span { font-size: 11px; color: #925400; background: #fff0d8; border: 1px solid #e6c796; border-radius: 5px; padding: 2px 6px; }
.supply-row { margin-top: 12px; }
.country-picker { margin: 16px 0 20px; }
.mock-badge { display: inline-block; margin-left: 4px; padding: 1px 5px; border-radius: 4px; background: #eef3fa; color: #60728a; font-size: 10px; font-weight: 400; }
.supply-label { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; font-size: 12px; margin-bottom: 4px; }
.supplier-bar { display: flex; width: 100%; height: 25px; border-radius: 4px; overflow: hidden; }
.supplier-share { display: flex; align-items: center; justify-content: center; min-width: 0; color: #fff; border-right: 1px solid white; font-size: 10px; font-weight: 600; overflow: hidden; white-space: nowrap; }
.supplier-share > span { overflow: hidden; text-overflow: ellipsis; padding: 0 2px; }
.supplier-share.others { color: #42526b; }
.small-trade { font-size: 12px; font-style: italic; color: #60728a; }
</style>
