import { supplierSegments } from './supplierSegments.js';

export const pharmaSubproducts = [
  { code: '3004', name: 'Packaged medicines', label: 'Packaged medicines HS 3004', icon: 'pharma' },
];

// Fictional scenarios for the dashboard, not actual trade statistics or recipes.
const products = [
  ['300410', 'Penicillins', 185, '2941', 'Antibiotics', 'high', 0.16],
  ['300420', 'Other antibiotics', 310, '2941', 'Antibiotics', 'high', 0.22],
  ['300431', 'Insulin', 74, '2937', 'Hormones & derivatives', 'medium', 0.03],
  ['300432', 'Corticosteroids', 96, '2937', 'Hormones & derivatives', 'medium', 0.31],
  ['300439', 'Other hormones', 165, '2937', 'Hormones & derivatives', 'medium', 0.18],
  ['300441', 'Ephedrine medicines', 12, '2939', 'Alkaloids & derivatives', 'high', 0.08],
  ['300442', 'Pseudoephedrine medicines', 19, '2939', 'Alkaloids & derivatives', 'high', 0.12],
  ['300443', 'Norephedrine medicines', 8, '2939', 'Alkaloids & derivatives', 'medium', 0.24],
  ['300449', 'Other alkaloid medicines', 42, '2939', 'Alkaloids & derivatives', 'medium', 0.45],
  ['300450', 'Vitamins', 128, '2936', 'Vitamins & provitamins', 'low', 1.35],
  ['300460', 'Antimalarials', 28, '2933', 'Nitrogen heterocyclic compounds', 'high', 0.36],
  ['300490', 'Other medicines', 860, '2942', 'Other organic compounds', 'low', 0.72],
];
const levels = { low: 0, medium: 1, high: 2 };
const riskLabel = risk => risk[0].toUpperCase() + risk.slice(1);
const shares = { high: [58, 19, 10, 5, 3], medium: [36, 23, 16, 9, 6], low: [22, 18, 15, 12, 10] };
const money = value => `US$${value.toFixed(1)} m`;
const countries = ['IND', 'CHN', 'DEU', 'CHE', 'USA', 'FRA', 'IRL', 'JPN', 'ITA'];
function makeNode(code, name, risk, lead, extra = {}) {
  return {
    code, name, icon: 'science', risk, riskLabel: `${riskLabel(risk)} risk`,
    evidence: `Top source: ${shares[risk][0]}%`,
    supplierEvidence: `${lead} ${shares[risk][0]}%`,
    description: `${name}. Simulated sourcing; input relationships are indicative for demonstration.`,
    ...extra,
  };
}
function makeSourcing(node, imports, exportRatio, seed) {
  const lead = node.supplierEvidence.split(' ')[0];
  const suppliers = [lead, ...countries.filter(country => country !== lead)];
  return ['World', 'Asia-Pacific', 'Thailand'].map((region, index) => {
    const regionalImports = Number((imports * [140 + seed * 3, 28 + seed, 1][index]).toFixed(1));
    const regionalExports = Number((regionalImports * [0.92, 0.55 + (seed % 5) * 0.22, exportRatio][index]).toFixed(1));
    const net = (regionalExports - regionalImports) / (regionalExports + regionalImports);
    const position = Math.abs(net) < 0.1 ? 'swap_vert' : net > 0 ? 'north' : 'south';
    const widths = index === 2 ? shares[node.risk] : index === 1 ? [30, 23, 17, 11, 7] : [22, 18, 15, 12, 10];
    return {
      region, imports: money(regionalImports), exports: money(regionalExports),
      index: `${net >= 0 ? '+' : ''}${net.toFixed(2)}`, position,
      positionLabel: { north: 'Net exporter', south: 'Net importer', swap_vert: 'Two-way trader' }[position],
      note: 'Simulated trade and supplier shares for demonstration only.',
      segments: supplierSegments(widths.map((width, i) => [suppliers[i], width])),
    };
  });
}

export const pharmaMockData = {
  '3004': {
    heading: pharmaSubproducts[0],
    chains: Object.fromEntries(products.map(([code, name, trade, apiCode, apiName, risk, exportRatio], index) => {
      const product = makeNode(code, name, risk, ['DEU', 'CHE', 'USA', 'FRA'][index % 4], { icon: 'pharma' });
      const inputs = [
        makeNode(apiCode, apiName, risk, risk === 'high' ? 'IND' : 'CHN', { indicative: true }),
        makeNode('170211', 'Lactose excipient', 'low', 'DEU', { icon: 'inventory_2', indicative: true }),
        makeNode('3912', 'Cellulose derivatives', index % 3 === 0 ? 'medium' : 'low', 'JPN', { icon: 'plastic', indicative: true }),
      ];
      const upstream = [
        makeNode('2905', 'Industrial alcohols', index % 4 === 0 ? 'medium' : 'low', 'CHN', { stage: '2 STEPS UP', indicative: true }),
        makeNode('2926', 'Nitrile compounds', risk === 'high' ? 'high' : 'medium', 'CHN', { stage: '2 STEPS UP', indicative: true }),
      ];
      const sourcing = Object.fromEntries([product, ...inputs, ...upstream].map((node, nodeIndex) => [node.code,
        makeSourcing(node, nodeIndex === 0 ? trade : 15 + index * 3 + nodeIndex * 12,
          nodeIndex === 0 ? exportRatio : [0.2, 0.35, 1.5, 0.8, 1.8, 0.45][nodeIndex], index + nodeIndex),
      ]));
      const highest = nodes => nodes.reduce((highest, node) => levels[node.risk] > levels[highest] ? node.risk : highest, 'low');
      const summary = nodes => {
        const level = highest(nodes);
        return level === 'low' ? 'Many sources' : `${nodes.filter(node => node.risk === level).length} of ${nodes.length} ${level} risk`;
      };
      const overall = highest([product, ...inputs, ...upstream]);
      return [code, {
        trade, risk: overall, riskLabel: riskLabel(overall), product, inputs, upstream, sourcing,
        upstreamSummary: summary(upstream), directSummary: summary(inputs), productSummary: product.supplierEvidence,
        links: [{ from: '2905', to: apiCode, indicative: true }, { from: '2926', to: apiCode, indicative: true }],
        methodology: 'Fictional Thailand trade and sourcing. Overall risk is the highest across the product and all mapped inputs. Links illustrate possible input categories, not a verified manufacturing recipe.',
      }];
    })),
  },
};
