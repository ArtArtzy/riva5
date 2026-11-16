import { supplierSegments } from './supplierSegments.js';

// Trade context follows the reference. Supplier shares include illustrative detail.
const row = (region, imports, countries) => ({ region, imports, segments: supplierSegments(countries) });
export const devicesReferenceChain = {
  trade: 772, risk: 'high', riskLabel: 'High', referenceSupplyRisk: true,
  summaryNote: '1 input bought from few sources', directSummary: '1 of 2 high risk',
  productSummary: 'United States 20% · China 18% · Germany 11%',
  methodology: 'Values follow the supplied reference. Overall risk is the highest across the product and its mapped inputs. No further upstream inputs are counted. Supplier breakdowns include illustrative shares for five countries and Others.',
  product: {
    code: '9018', name: 'Medical & surgical instruments', icon: 'devices', risk: 'low', riskLabel: 'Low risk',
    description: 'Instruments and appliances used in medical, surgical, dental or veterinary sciences, including scintigraphic apparatus, other electro-medical apparatus and sight testing instruments',
    evidence: 'Two-way trader', supplierEvidence: 'United States 20%',
    meaning: ["Asia-Pacific’s trade position: net importer (−0.12) · exports US$31.3 bn · imports US$39.6 bn a year.", "Thailand’s trade position: two-way trader (−0.01) · exports US$752 m · imports US$772 m a year."],
  },
  inputs: [
    { code: '3926', name: 'Other articles of plastics', description: 'Articles of plastics and articles of other materials of heading no. 3901 to 3914 … n.e.c. in chapter 39', icon: 'plastic', risk: 'high', riskLabel: 'High risk', evidence: 'Top 3 hold 70%', supplierEvidence: 'China 45%', generalPurpose: true, nearThreshold: true,
      meaning: ["Asia-Pacific’s trade position: net exporter (+0.3) · exports US$47.5 bn · imports US$25.4 bn a year.", "Thailand’s trade position: net importer (−0.31) · exports US$1.0 bn · imports US$2.0 bn a year."],
    },
    { code: '9002', name: 'Lenses', icon: 'glasses', risk: 'low', riskLabel: 'Low risk', evidence: 'Net exporter', supplierEvidence: 'China 63%', indicative: true,
      meaning: ['Thailand buys from few sources although the world offers many.', "Asia-Pacific’s trade position: two-way trader (+0.02) · exports US$10.8 bn · imports US$10.4 bn a year.", "Thailand’s trade position: net exporter (+0.43) · exports US$550 m · imports US$218 m a year."],
    },
  ],
  sourcing: {
    '3926': [
      row('World', 'US$101.1 bn', [["CHN", 33], ["DEU", 12], ["USA", 9], ["JPN", 7], ["ITA", 6]]),
      row('Asia-Pacific', 'US$25.4 bn', [["CHN", 43], ["JPN", 13], ["USA", 9], ["DEU", 7], ["KOR", 6]]),
      row('Thailand', 'US$2.0 bn', [["CHN", 45], ["JPN", 19], ["USA", 6], ["DEU", 5], ["MYS", 3]]),
    ],
    '9002': [
      row('World', 'US$17.1 bn', [["DEU", 21], ["CHN", 19], ["TWN", 16], ["JPN", 10], ["USA", 6]]),
      row('Asia-Pacific', 'US$10.4 bn', [["CHN", 27], ["TWN", 27], ["JPN", 12], ["DEU", 7], ["KOR", 6]]),
      row('Thailand', 'US$218 m', [["CHN", 63], ["JPN", 12], ["TWN", 8], ["DEU", 5], ["USA", 4]]),
    ],
    '9018': [
      row('World', 'US$158.6 bn', [["USA", 21], ["DEU", 14], ["NLD", 9], ["CHN", 7], ["JPN", 5]]),
      row('Asia-Pacific', 'US$39.6 bn', [["USA", 26], ["DEU", 14], ["CHN", 10], ["MEX", 8], ["JPN", 6]]),
      row('Thailand', 'US$772 m', [["USA", 20], ["CHN", 18], ["DEU", 11], ["JPN", 9], ["MEX", 6]]),
    ],
  },
};

// The shared Biologics-style cards expose trade context through row tooltips.
// Structured values from the same reference context also drive risk exposure.
const tradeContext = {
  '3926': {
    'Asia-Pacific': { index: '+0.30', exports: 'US$47.5 bn', position: 'north', positionLabel: 'Net exporter' },
    Thailand: { index: '−0.31', exports: 'US$1.0 bn', position: 'south', positionLabel: 'Net importer' },
  },
  '9002': {
    'Asia-Pacific': { index: '+0.02', exports: 'US$10.8 bn', position: 'swap_vert', positionLabel: 'Two-way trader' },
    Thailand: { index: '+0.43', exports: 'US$550 m', position: 'north', positionLabel: 'Net exporter' },
  },
  '9018': {
    'Asia-Pacific': { index: '−0.12', exports: 'US$31.3 bn', position: 'south', positionLabel: 'Net importer' },
    Thailand: { index: '−0.01', exports: 'US$752 m', position: 'swap_vert', positionLabel: 'Two-way trader' },
  },
};
for (const node of [devicesReferenceChain.product, ...devicesReferenceChain.inputs]) {
  for (const sourcingRow of devicesReferenceChain.sourcing[node.code]) {
    Object.assign(sourcingRow, tradeContext[node.code]?.[sourcingRow.region]);
    const regionNote = node.meaning.find(text => text.startsWith(`${sourcingRow.region}’s trade position`));
    const sourcingNote = sourcingRow.region === 'Thailand'
      ? node.meaning.filter(text => text.startsWith('Thailand buys')).join(' ')
      : '';
    sourcingRow.note = [regionNote, sourcingNote].filter(Boolean).join(' ');
  }
}
