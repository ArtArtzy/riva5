export function getRiskSupplierDetails(node, sourcing) {
  if (!node) return null;
  return {
    name: node.name,
    badges: [node.riskLabel, node.evidence, node.indicative && 'Indicative link', node.inferred && 'Inferred link'].filter(Boolean),
    rows: sourcing[node.code] || [],
  };
}
