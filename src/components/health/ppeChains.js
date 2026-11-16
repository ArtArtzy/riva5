import { supplierSegments } from './supplierSegments.js';
import { ppeSubproducts } from './healthSubproducts.js';
import { ppeReferenceChain } from './ppeReferenceChain.js';

// HS 6307 overview and supply chain follow the user-supplied reference.
// Other headings retain fictional trade, sourcing and illustrative input links.
const productsByHeading = {
  '6307': [['630790', 'Face masks & other textile articles', 180], ['630710', 'Cleaning cloths', 65]],
  '4015': [['401519', 'Other rubber gloves', 240], ['401590', 'Other rubber protective apparel', 80]],
  '3401': [['340111', 'Toilet soap', 95], ['340130', 'Liquid skin cleansers', 120]],
  '6210': [['621010', 'Nonwoven protective garments', 160], ['621040', 'Other protective garments for men', 55]],
  '6505': [['650500', 'Headwear & hairnets', 45]],
  '3926': [['392620', 'Plastic protective apparel', 90], ['392690', 'Other plastic articles', 135]],
  '6116': [['611610', 'Coated knitted gloves', 85], ['611693', 'Synthetic-fibre knitted gloves', 60]],
  '4818': [['481820', 'Paper tissues & towels', 70], ['481850', 'Paper apparel & accessories', 35]],
  '4014': [['401490', 'Other rubber hygiene articles', 55], ['401410', 'Rubber contraceptives', 40]],
  '2847': [['284700', 'Hydrogen peroxide', 65]],
  '6304': [['630491', 'Knitted textile furnishings', 35], ['630493', 'Synthetic-fibre textile furnishings', 50]],
};
const inputProfiles = {
  textile: [['5603', 'Nonwoven fabrics', 'textile'], ['5402', 'Synthetic filament yarn', 'knitted_glove'], ['5806', 'Narrow woven fabrics', 'textile']],
  rubber: [['4002', 'Synthetic rubber', 'glove'], ['4001', 'Natural rubber', 'hygiene'], ['3812', 'Rubber processing additives', 'science']],
  chemical: [['2905', 'Industrial alcohols', 'science'], ['3823', 'Industrial fatty acids', 'soap'], ['3923', 'Plastic packaging', 'plastic']],
  plastic: [['3901', 'Polyethylene resins', 'plastic'], ['3902', 'Polypropylene resins', 'plastic'], ['3923', 'Plastic packaging', 'inventory_2']],
  paper: [['4703', 'Chemical wood pulp', 'tissue'], ['4803', 'Hygiene paper stock', 'tissue'], ['4819', 'Paper packaging', 'inventory_2']],
};
function profileFor(code) {
  if (['4015', '4014'].includes(code)) return inputProfiles.rubber;
  if (['3401', '2847'].includes(code)) return inputProfiles.chemical;
  if (code === '3926') return inputProfiles.plastic;
  if (code === '4818') return inputProfiles.paper;
  return inputProfiles.textile;
}
const labels = { high: 'High', medium: 'Medium', low: 'Low' };
const shares = { high: [58, 20, 12, 4, 2], medium: [35, 25, 15, 8, 6], low: [22, 18, 15, 12, 10] };
const countries = ['CHN', 'MYS', 'VNM', 'IND', 'IDN'];
const makeNode = (code, name, icon, risk) => ({
  code, name, icon, risk, riskLabel: `${labels[risk]} risk`,
  evidence: `Top source: ${shares[risk][0]}%`, supplierEvidence: `China ${shares[risk][0]}%`,
  description: 'Fictional sourcing for design preview. Input relationships are illustrative.',
});
function makeSourcing(node, imports) {
  return ['World', 'Asia-Pacific', 'Thailand'].map((region, index) => ({
    region, imports: `US$${imports * [100, 20, 1][index]}m`,
    ...(region === 'Thailand' ? { position: 'south', positionLabel: 'Net importer', index: '−0.60', exports: `US$${imports / 4}m` } : {}),
    note: 'All values and supplier shares are fictional demonstration data.',
    segments: supplierSegments(shares[node.risk].map((share, index) => [countries[index], share])),
  }));
}

export const ppeMockData = Object.fromEntries(ppeSubproducts.map((heading, headingIndex) => {
  const chains = Object.fromEntries(productsByHeading[heading.code].map(([code, name, trade], index) => {
    const risk = ['high', 'medium', 'low'][(headingIndex + index) % 3];
    const product = makeNode(code, name, heading.icon, risk);
    const inputs = profileFor(heading.code).map(([inputCode, inputName, icon], inputIndex) => ({
      ...makeNode(inputCode, inputName, icon, inputIndex === 0 ? risk : 'low'), indicative: true,
    }));
    const highCount = inputs.filter(input => input.risk === 'high').length;
    const mediumCount = inputs.filter(input => input.risk === 'medium').length;
    const sourcing = Object.fromEntries([product, ...inputs].map((node, nodeIndex) => [node.code, makeSourcing(node, nodeIndex === 0 ? trade : 12 + headingIndex * 2 + nodeIndex * 8)]));
    return [code, {
      trade, risk, riskLabel: labels[risk], product, inputs, sourcing,
      summaryNote: highCount ? `${highCount} input from few sources` : 'No input from few sources',
      directSummary: highCount ? `${highCount} of ${inputs.length} high risk` : mediumCount ? `${mediumCount} of ${inputs.length} medium risk` : 'Many sources',
      productSummary: `China supplies ${shares[risk][0]}%`,
      methodology: 'Fictional trade and sourcing figures. Overall risk is the highest across the product and its illustrative direct inputs. No further upstream inputs are counted.',
    }];
  }));
  const referenceOverview = heading.code === '6307' ? {
    heading: {
      ...heading,
      name: 'Textiles; made up articles n.e.c. in chapter 63, including dress patterns',
      description: 'Textiles; made up articles n.e.c. in chapter 63, including dress patterns',
    },
    referenceValueChains: true,
    chains: { '630790': ppeReferenceChain },
    valueChains: {
      '630790': {
        trade: 158, risk: 'high', riskLabel: 'High',
        product: { code: '630790', name: 'Other made-up textile articles' },
      },
    },
  } : {};
  return [heading.code, { heading, chains, ...referenceOverview }];
}));
