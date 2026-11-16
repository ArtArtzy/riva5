import { supplierSegments } from './supplierSegments.js';

// Trade context follows the reference. Supplier shares include illustrative detail.
function row(region, imports, countries, trade = {}) {
  return { region, imports: `US$${imports}`, ...trade, segments: supplierSegments(countries) };
}
const position = (position, index, exports, note) => ({ position, index, exports: `US$${exports}`, positionLabel: { north: 'Net exporter', south: 'Net importer', swap_vert: 'Two-way trader' }[position], note });
const fewSources = 'Thailand buys from few sources although the world offers many.';
const node = (code, name, risk, evidence, supplierEvidence, extra = {}) => ({ code, name, risk, riskLabel: `${risk[0].toUpperCase()}${risk.slice(1)} risk`, evidence, supplierEvidence, icon: 'textile', ...extra });
export const ppeReferenceChain = {
  trade: 158, risk: 'high', riskLabel: 'High', referenceSupplyRisk: true,
  summaryNote: '2 inputs from few sources', upstreamSummary: '1 of 7 high risk', directSummary: '1 of 3 high risk', productSummary: 'China supplies 67%',
  methodology: 'Supplied reference: one high-risk direct input and one high-risk upstream input. Overall risk is the highest across the product and all mapped inputs, including inferred links. Supplier breakdowns include illustrative shares for five countries and Others.',
  product: node('630790', 'Other made-up textile articles', 'high', 'Top 2 hold 80%', 'China 67%', { description: 'Textiles; made up articles (including dress patterns), n.e.c. in chapter 63, n.e.c. in heading no. 6307' }),
  inputs: [
    node('540244', 'Elastomeric synthetic filament yarn', 'high', 'Top 3 hold 85%', 'Viet Nam 37%', { indicative: true, description: 'Yarn, synthetic, filament, monofilament (less than 67 decitex), other than high tenacity or textured yarn, elastomeric, single, untwisted or twisted 50 turns or less per metre, not for retail sale, not sewing thread' }),
    node('7606', 'Aluminium plates, sheets & strip', 'medium', 'Two-way trader', 'China 77%', { icon: 'inventory_2', generalPurpose: true, description: 'Aluminium; plates, sheets and strip, thickness exceeding 0.2mm' }),
    node('5603', 'Nonwoven fabrics', 'low', 'Net exporter', 'China 46%', { description: 'Nonwovens; whether or not impregnated, coated, covered or laminated' }),
  ],
  upstream: [
    node('2709', 'Crude petroleum oils', 'medium', 'Top 3 hold 61%', 'UAE 37%', { stage: '4 STEPS UP', generalPurpose: true, icon: 'inventory_2', description: 'Petroleum oils and oils obtained from bituminous minerals; crude' }),
    node('290122', 'Propene (propylene)', 'low', 'Net exporter', 'Malaysia 44%', { stage: '3 STEPS UP', generalPurpose: true, icon: 'science', description: 'Acyclic hydrocarbons; unsaturated, propene (propylene)' }),
    node('540234', 'Textured polypropylene yarn', 'high', 'Top country holds 87%', 'China 87%', { stage: '2 STEPS UP', description: 'Yarn, synthetic; filament, monofilament (less than 67 decitex), textured, of polypropylene, not for retail sale, not sewing thread' }),
    node('3908', 'Polyamides in primary forms', 'medium', 'Top 3 hold 78%', 'China 32%', { stage: '2 STEPS UP', icon: 'plastic' }),
    node('5504', 'Artificial staple fibres', 'low', 'Net exporter', 'India 47%', { stage: '2 STEPS UP', inferred: true, description: 'Artificial staple fibres, not carded, combed or otherwise processed for spinning' }),
    node('3907', 'Polyacetals & polycarbonates', 'low', 'Net exporter', 'China 32%', { stage: '2 STEPS UP', generalPurpose: true, icon: 'plastic', description: 'Polyacetals; polycarbonates … in primary forms' }),
    node('3902', 'Polymers of propylene', 'low', 'Net exporter', 'Singapore 17%', { stage: '2 STEPS UP', generalPurpose: true, icon: 'plastic', description: 'Polymers of propylene or of other olefins, in primary forms' }),
  ],
  links: [
    { from: '2709', to: '290122', indicative: true },
    { from: '290122', to: '3902' },
    { from: '540234', to: '5603' },
    { from: '3908', to: '540244' },
    { from: '5504', to: '5603', inferred: true },
    { from: '3907', to: '540244' },
    { from: '3902', to: '540244' },
    { from: '3902', to: '5603', inferred: true },
  ],
  sourcing: {
    '2709': [
      row('World', '1155.9 bn', [["SAU", 17], ["USA", 13], ["ARE", 11], ["CHN", 9], ["KOR", 5]]),
      row('Asia-Pacific', '760.2 bn', [["SAU", 22], ["ARE", 16], ["USA", 11], ["MYS", 9], ["IDN", 6]], position('south', '−0.7', '132.1 bn')),
      row('Thailand', '30.6 bn', [["ARE", 37], ["SAU", 15], ["USA", 9], ["MYS", 6], ["IDN", 4]], position('south', '−0.97', '461 m')),
    ],
    '290122': [
      row('World', '6.7 bn', [["KOR", 23], ["JPN", 14], ["USA", 9], ["SGP", 7], ["DEU", 5]]),
      row('Asia-Pacific', '3.3 bn', [["KOR", 48], ["JPN", 18], ["SGP", 12], ["CHN", 9], ["MYS", 6]], position('swap_vert', '−0.05', '3.0 bn', 'Asia-Pacific and Thailand buy from few sources although the world offers many.')),
      row('Thailand', '68 m', [["MYS", 44], ["KOR", 22], ["SGP", 12], ["JPN", 9], ["CHN", 6]], position('north', '+0.42', '169 m', fewSources)),
    ],
    '540234': [
      row('World', '173 m', [["TUR", 26], ["CHN", 17], ["IND", 10], ["VNM", 7], ["KOR", 5]]),
      row('Asia-Pacific', '45 m', [["CHN", 34], ["TUR", 21], ["IND", 9], ["KOR", 6], ["VNM", 5]], position('south', '+0.32', '88 m')),
      row('Thailand', '1.9 m', [["CHN", 87], ["TUR", 4], ["VNM", 3], ["KOR", 2], ["IND", 1]], position('south', '−0.32', '1.0 m', 'Thailand relies on China (87%) far more than the world does (14%). It could source this input from elsewhere.')),
    ],
    '3908': [
      row('World', '16.9 bn', [["DEU", 18], ["USA", 18], ["CHN", 9], ["JPN", 7], ["KOR", 5]]),
      row('Asia-Pacific', '7.2 bn', [["CHN", 23], ["USA", 20], ["JPN", 9], ["KOR", 6], ["DEU", 5]], position('south', '−0.2', '4.8 bn')),
      row('Thailand', '481 m', [["CHN", 32], ["USA", 29], ["JPN", 14], ["KOR", 9], ["DEU", 6]], position('south', '−0.28', '270 m', 'Thailand makes some (RCA 1.3).')),
    ],
    '5504': [
      row('World', '2.4 bn', [["IDN", 30], ["CHN", 25], ["AUT", 18], ["IND", 12], ["DEU", 7]]),
      row('Asia-Pacific', '2.3 bn', [["IDN", 28], ["AUT", 26], ["CHN", 20], ["IND", 12], ["DEU", 7]], position('swap_vert', '−0.04', '2.1 bn')),
      row('Thailand', '6.9 m', [["IDN", 47], ["AUT", 30], ["CHN", 10], ["IND", 5], ["DEU", 3]], position('north', '+0.96', '300 m', fewSources)),
    ],
    '3907': [
      row('World', '71.3 bn', [["CHN", 16], ["DEU", 11], ["USA", 9], ["KOR", 7], ["JPN", 5]]),
      row('Asia-Pacific', '28.8 bn', [["CHN", 19], ["KOR", 16], ["JPN", 12], ["USA", 10], ["DEU", 7]], position('north', '+0.11', '35.6 bn')),
      row('Thailand', '1.2 bn', [["CHN", 32], ["KOR", 15], ["JPN", 10], ["USA", 9], ["DEU", 7]], position('north', '+0.39', '2.7 bn')),
    ],
    '3902': [
      row('World', '48.9 bn', [["SAU", 18], ["KOR", 12], ["USA", 10], ["SGP", 8], ["ARE", 7]]),
      row('Asia-Pacific', '20.9 bn', [["SAU", 17], ["KOR", 14], ["SGP", 12], ["ARE", 9], ["MYS", 7]], position('south', '−0.12', '16.4 bn')),
      row('Thailand', '512 m', [["SGP", 17], ["SAU", 16], ["KOR", 15], ["MYS", 14], ["ARE", 11]], position('north', '+0.43', '1.3 bn')),
    ],
    '540244': [
      row('World', '1.9 bn', [["CHN", 29], ["VNM", 26], ["KOR", 10], ["JPN", 7], ["USA", 6]]),
      row('Asia-Pacific', '1.1 bn', [["VNM", 30], ["CHN", 28], ["KOR", 16], ["JPN", 10], ["USA", 7]], position('north', '+0.17', '1.6 bn')),
      row('Thailand', '13 m', [["VNM", 37], ["CHN", 35], ["KOR", 12], ["JPN", 7], ["USA", 4]], position('south', '−0.99', '0.1 m')),
    ],
    '7606': [
      row('World', '41.9 bn', [["CHN", 25], ["DEU", 11], ["USA", 9], ["KOR", 7], ["JPN", 5]]),
      row('Asia-Pacific', '9.6 bn', [["CHN", 51], ["KOR", 16], ["JPN", 11], ["USA", 8], ["DEU", 5]], position('north', '+0.26', '16.4 bn', 'Asia-Pacific buys from few sources although the world offers many.')),
      row('Thailand', '728 m', [["CHN", 77], ["KOR", 8], ["JPN", 5], ["USA", 4], ["DEU", 2]], position('swap_vert', '+0.05', '799 m', fewSources)),
    ],
    '5603': [
      row('World', '18.5 bn', [["CHN", 22], ["DEU", 13], ["USA", 10], ["JPN", 7], ["KOR", 5]]),
      row('Asia-Pacific', '4.9 bn', [["CHN", 40], ["JPN", 13], ["KOR", 8], ["USA", 5], ["DEU", 4]], position('north', '+0.21', '7.5 bn')),
      row('Thailand', '177 m', [["CHN", 46], ["JPN", 20], ["KOR", 12], ["USA", 9], ["DEU", 6]], position('north', '+0.22', '277 m', fewSources)),
    ],
    '630790': [
      row('World', '18.4 bn', [["CHN", 51], ["VNM", 7], ["IND", 5], ["USA", 3], ["DEU", 3]]),
      row('Asia-Pacific', '4.3 bn', [["CHN", 68], ["VNM", 12], ["IND", 8], ["USA", 5], ["DEU", 3]], position('north', '+0.46', '11.8 bn')),
      row('Thailand', '158 m', [["CHN", 67], ["VNM", 13], ["IND", 8], ["USA", 5], ["DEU", 3]], position('south', '−0.29', '86 m')),
    ],
  },
};
