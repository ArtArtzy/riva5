<template>
  <svg class="risk-symbol" :class="kind" viewBox="0 0 28 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false">
    <template v-if="kind === 'weak'"><path d="M11 6 8 5a4.3 4.3 0 0 0-3 8l3 1 M17 6l3-1a4.3 4.3 0 0 1 3 8l-3 1 M12 3l-1-2 M16 3l1-2 M12 17l-1 2 M16 17l1 2" /></template>
    <template v-else><ellipse cx="9" cy="10" rx="6" ry="4" :stroke-dasharray="kind === 'unreadable' ? '2 2' : undefined" /><ellipse cx="19" cy="10" rx="6" ry="4" :stroke-dasharray="kind === 'unreadable' ? '2 2' : undefined" /></template>
  </svg>
</template>
<script setup>
defineProps({ kind: { type: String, default: 'strained' } });
</script>
<style scoped>
.risk-symbol { display: inline-block; flex-shrink: 0; width: 24px; height: 18px; vertical-align: middle; fill: none; }
.weak { color: #b95660; }.strained { color: #ab7b25; }.sound { color: #648766; }.unreadable { color: #9aa4b1; }
</style>
