import { ref } from 'vue';
import { supplierSegments } from './supplierSegments.js';

export const supplierCountryOptions = [
  { label: 'China', value: 'CHN' },
  { label: 'United States', value: 'USA' },
  { label: 'Germany', value: 'DEU' },
  { label: 'Switzerland', value: 'CHE' },
  { label: 'Ireland', value: 'IRL' },
  { label: 'France', value: 'FRA' },
  { label: 'Singapore', value: 'SGP' },
  { label: 'South Korea', value: 'KOR' },
  { label: 'Japan', value: 'JPN' },
  { label: 'India', value: 'IND' },
  { label: 'Australia', value: 'AUS' },
  { label: 'Malaysia', value: 'MYS' },
  { label: 'Indonesia', value: 'IDN' },
  { label: 'Viet Nam', value: 'VNM' },
  { label: 'United Kingdom', value: 'GBR' },
];

// Shared across all supplier dialogs for this app session.
const selectedCountries = ref([]);
export const selectedSupplierCountries = () => [...selectedCountries.value];
export function setSupplierCountries(values) {
  const valid = new Set(supplierCountryOptions.map(option => option.value));
  selectedCountries.value = [...new Set(values)].filter(code => valid.has(code)).slice(0, 3);
}

export function mockSupplierRow(productCode, countryCode) {
  const country = supplierCountryOptions.find(option => option.value === countryCode);
  if (!country) return null;
  // Stable fictional data: changing dialogs does not randomly change the figures.
  const seed = [...`${productCode}-${countryCode}`].reduce((n, char) => (n * 31 + char.charCodeAt(0)) >>> 0, 7);
  const suppliers = ['USA', 'DEU', 'CHE', 'IRL', 'FRA', 'SGP', 'KOR', 'CHN', 'JPN', 'IND'].filter(code => code !== countryCode);
  const offset = seed % suppliers.length;
  const shares = [25 + seed % 10, 19 + seed % 4, 14 + seed % 3, 9, 6];
  return {
    region: country.label,
    countryCode,
    mock: true,
    imports: `US$${(5 + (seed % 25000) / 10).toFixed(1)} m`,
    segments: supplierSegments(shares.map((share, index) => [suppliers[(offset + index) % suppliers.length], share])),
  };
}
