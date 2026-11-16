<template>
  <svg class="q-icon health-outline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path :d="paths[name]" />
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } });

// Shared stroke geometry keeps every dashboard and dropdown icon outlined.
const paths = {
  chevron_right: 'm9 5 7 7-7 7',
  expand_more: 'm6 9 6 6 6-6',
  check: 'm5 12 4 4L19 6',
  link: 'm10 13 4-4 M8 16l-1 1a4.2 4.2 0 0 1-6-6l4-4a4.2 4.2 0 0 1 6 0 M13 17a4.2 4.2 0 0 0 6 0l4-4a4.2 4.2 0 0 0-6-6l-1 1',
  science: 'M9 3h6 M10 3v6l-6 10a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2L14 9V3 M7 15h10 M10 12h.01 M14 18h.01',
  layers: 'm12 3 10 5-10 5L2 8 12 3Z M2 12l10 5 10-5 M2 16l10 5 10-5',
  vaccines: 'm16 3 5 5 M18 5l-3 3 M13 6l5 5 M14 7 5 16v3h3l9-9 M7 14l3 3 M3 21l2-2',
  hub: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M19 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M12 7v5 M12 12l-6 5 M12 12l6 5',
  shield: 'm12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z',
  health_and_safety: 'm12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z M9 12h6 M12 9v6',
  hexagon: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z M10 12h4 M12 10v4',
  add_circle_outline: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M8 12h8 M12 8v8',
  inventory_2: 'M4 7h16v14H4V7Z M3 3h18v4H3V3Z M9 11h6 M12 11v5 m-3-3 3 3 3-3',
  cloud_download: 'M7 18H6a4 4 0 0 1-1-7.9 7 7 0 0 1 13-2A5 5 0 0 1 19 18h-2 M12 11v10 m-3-3 3 3 3-3',
  account_tree: 'M9 2h6v5H9V2Z M2 17h6v5H2v-5Z M16 17h6v5h-6v-5Z M12 7v5 M5 17v-5h14v5',
  north: 'M12 21V3 m-5 5 5-5 5 5',
  south: 'M12 3v18 m-5-5 5 5 5-5',
  swap_vert: 'M8 20V4 m-4 4 4-4 4 4 M16 4v16 m-4-4 4 4 4-4',
  bar_chart: 'M3 14h4v7H3v-7Z M10 8h4v13h-4V8Z M17 3h4v18h-4V3Z',
  info_outline: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M12 11v6 M12 7h.01',
  warning_amber: 'm12 3 10 18H2L12 3Z M12 9v5 M12 17h.01',
  share: 'M18 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z M5 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z M18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z M8 10l7-4 M8 14l7 4',
  deployed_code: 'm12 3 9 5v9l-9 5-9-5V8l9-5Z M3 8l9 5 9-5 M12 13v9 M7.5 5.5l9 5v4',
  check_circle_outline: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z m-5 10 3 3 7-7',
  biologics: 'M7 2c0 8 10 12 10 20 M17 2C17 10 7 14 7 22 M8 5h8 M10 9h4 M10 15h4 M8 19h8',
  blood: 'M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z M9 15h6 M12 12v6',
  culture: 'M3 11a9 9 0 0 1 18 0 M3 11h18v3a9 9 0 0 1-18 0v-3Z M3 14h18 M8 8h.01 M14 6h.01 M17 9h.01 M10 18h.01',
  xray: 'M4 3h16v18H4V3Z M12 6v12 M8 7l4 2 4-2 M7 11l5 2 5-2 M8 15l4 2 4-2',
  bone: 'M6 3a3 3 0 0 0-3 3c0 2 1 3 3 3l9 9c0 2 1 3 3 3a3 3 0 0 0 3-3c0-2-1-3-3-3L9 6c0-2-1-3-3-3Z',
  lungs: 'M12 3v9 M12 8l-4 4 M12 8l4 4 M9 8C7 4 3 11 3 17c0 3 3 4 6 2V8Z M15 8c2-4 6 3 6 9 0 3-3 4-6 2V8Z',
  bandage: 'm4 13 9-9a3 3 0 0 1 4 0l3 3a3 3 0 0 1 0 4l-9 9a3 3 0 0 1-4 0l-3-3a3 3 0 0 1 0-4Z m4-4 7 7 M9 8l7 7 M11 11h.01 M13 13h.01',
  vehicle: 'M3 6h12v11H3V6Z M15 10h3l3 4v3h-6 M6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M18 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M7 10h4 M9 8v4',
  sprayer: 'M6 9h9v12H6V9Z M8 9V5h5v4 M10 5V3h7v3 M17 4h2 M20 3h1 M20 6h1 M8 13h5',
  lamp: 'M8 16a7 7 0 1 1 8 0v3H8v-3Z M9 22h6 M9 19h6 M12 11v8 M9 10l3 3 3-3',
  thermometer: 'M10 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Z M13 8v10 M12 18h2 M18 6h3 M18 10h2',
  gauge: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 6v2 M6 12h2 M16 12h2 M12 12l4-4 M11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z',
  glasses: 'M2 12h7v6H2v-6Z M15 12h7v6h-7v-6Z M9 14h6 M2 12l2-7h3 M22 12l-2-7h-3',
  microscope: 'm9 3 4-1 4 9-4 2-4-10Z M12 12l-2 1 M15 13c7 0 7 8-1 8H4 M6 17h8 M9 17v4 M3 21h18',
  wheelchair: 'M10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M10 8v7h7l3 6 2-1 M10 11h6 M7 12a5 5 0 1 0 6 8',
  pump: 'M7 9h10v10H7V9Z M10 9V5h4v4 M12 5V2 M8 2h8 M17 13h4v4h-4 M3 21h18 M3 13h4 M10 14h4',
  meter: 'M4 3h16v18H4V3Z M7 6h10v6H7V6Z M12 12l3-4 M8 16h1 M12 16h1 M16 16h1',
  tooth: 'M12 5C4-2 1 6 5 14c1 3 1 8 4 8l3-8 3 8c3 0 3-5 4-8 4-8 1-16-7-9Z',
  electrical_meter: 'M5 3h14v18H5V3Z M8 6h8v5H8V6Z m5 7-3 4h4l-3 4',
  photo_plate: 'M3 3h18v18H3V3Z M6 16l4-5 3 3 2-2 3 4H6Z M15 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  photo_lab: 'M4 3h16v18H4V3Z M7 6h10v7H7V6Z M7 17h3 M14 17h3 M9 10l2-2 4 3',
  camera: 'M3 7h4l2-3h6l2 3h4v14H3V7Z M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M18 10h.01',
  film: 'M3 3h18v18H3V3Z M7 3v18 M17 3v18 M3 7h4 M3 12h4 M3 17h4 M17 7h4 M17 12h4 M17 17h4 M7 8h10 M7 16h10',
  textile: 'M4 3h16v18H4V3Z M8 3v18 M16 3v18 M4 8h16 M4 16h16 M11 11h2v2h-2v-2Z',
  glove: 'M7 21v-7l-3-4a1.5 1.5 0 0 1 2-2l2 2V5a1 1 0 0 1 2 0v4-6a1 1 0 0 1 2 0v6-5a1 1 0 0 1 2 0v5-3a1 1 0 0 1 2 0v3-1a1 1 0 0 1 2 0v6l-2 7H7Z M7 18h10',
  soap: 'M6 9h11v12H6V9Z M9 9V5h4v4 M11 5V2h7v2 M9 14h5 M11.5 11.5v5 M20 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z M3 11h.01',
  gown: 'm8 3-5 4 3 5 2-1-2 10h12l-2-10 2 1 3-5-5-4 M8 3l4 4 4-4 M12 7v14 M8 13h8',
  cap: 'M4 16v-3a8 8 0 0 1 16 0v3H4Z M3 16h18v4H3v-4Z M8 7l1 6 M16 7l-1 6 M7 18h.01 M12 18h.01 M17 18h.01',
  plastic: 'm5 3 3 1 4-1 4 1 3-1v18l-3-1-4 1-4-1-3 1V3Z M9 9h6v6H9V9Z M8 6h8 M8 18h8',
  knitted_glove: 'M7 21v-7l-3-4a1.5 1.5 0 0 1 2-2l2 2V5a1 1 0 0 1 2 0v4-6a1 1 0 0 1 2 0v6-5a1 1 0 0 1 2 0v5-3a1 1 0 0 1 2 0v3-1a1 1 0 0 1 2 0v6l-2 7H7Z M7 17h10 M10 18v3 M13 18v3',
  tissue: 'M3 11h18v10H3V11Z M8 11 6 5l5-3 6 3-2 6 M10 5l3 3 M8 15h8',
  hygiene: 'M5 4h6v5h5l4 4v8H5V4Z M5 9h6 M10 15h6 M13 12v6 M7 2h2',
  peroxide: 'M9 2h6v4H9V2Z M10 6v3l-4 3v9h12v-9l-4-3V6 M8 14h8 M10 17h4',
  furnishing: 'M3 4h18v15H3V4Z M3 8h18 M8 8v11 M16 8v11 M5 19v3 M9 19v3 M13 19v3 M17 19v3 M21 19v3',
  devices: 'M5 3H3v5a5 5 0 0 0 10 0V3h-2 M5 2v3 M11 2v3 M8 13v3a5 5 0 0 0 10 0v-2 M18 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  pharma: 'M9 4a6.36 6.36 0 0 1 9 9l-5 5a6.36 6.36 0 0 1-9-9l5-5Z M6.5 6.5l9 9',
  ppe: 'M5 8c4-3 10-3 14 0v7c-2 3-4 5-7 6-3-1-5-3-7-6V8Z M5 9H3a2 2 0 0 0-2 2v2a3 3 0 0 0 4 3 M19 9h2a2 2 0 0 1 2 2v2a3 3 0 0 1-4 3 M8 10h8 M8 13h8 M10 16h4',
};
</script>

<style scoped>
.health-outline-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  vertical-align: middle;
  /* Override Quasar's .q-icon { fill: currentColor } on the SVG root. */
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}

.health-outline-icon > path {
  fill: none;
}
</style>
