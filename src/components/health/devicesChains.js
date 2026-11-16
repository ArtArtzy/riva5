import { supplierSegments } from './supplierSegments.js';
import { deviceSubproducts } from './healthSubproducts.js';
import { devicesReferenceChain } from './devicesReferenceChain.js';

// HS 9018 value-chain trade, supply risk and sourcing follow the supplied reference.
// Other trade figures, supplier details and input links are fictional previews.
const productsByHeading = {
  '9018': [['9018', 'Medical & surgical instruments', 772]],
  '9022': [['902212', 'Computed tomography scanners', 210], ['902214', 'Medical X-ray apparatus', 160]],
  '9021': [['902131', 'Artificial joints', 95], ['902140', 'Hearing aids', 65]],
  '9019': [['901920', 'Therapeutic breathing apparatus', 140], ['901910', 'Therapy & massage apparatus', 85]],
  '3005': [['300510', 'Adhesive dressings', 60], ['300590', 'Other dressings & bandages', 45]],
  '8705': [['870590', 'Other special-purpose vehicles', 75]],
  '9027': [['902720', 'Chromatographs', 110], ['902730', 'Spectrometers', 90]],
  '8424': [['842410', 'Fire extinguishers', 35], ['842489', 'Other spraying appliances', 55]],
  '8539': [['853941', 'Arc lamps', 25], ['853949', 'Ultraviolet & infrared lamps', 40]],
  '3006': [['300610', 'Sterile surgical sutures', 70], ['300640', 'Dental cements & fillings', 45]],
  '9025': [['902511', 'Liquid-filled thermometers', 20], ['902519', 'Other thermometers', 50]],
  '9026': [['902610', 'Liquid flow & level meters', 65], ['902620', 'Pressure instruments', 80]],
  '9004': [['900490', 'Protective spectacles & goggles', 55], ['900410', 'Sunglasses', 30]],
  '9011': [['901110', 'Stereoscopic microscopes', 40], ['901180', 'Other optical microscopes', 60]],
  '8713': [['871310', 'Manual wheelchairs', 35], ['871390', 'Other wheelchairs', 50]],
  '9020': [['902000', 'Breathing appliances & gas masks', 85]],
  '8413': [['841350', 'Reciprocating positive-displacement pumps', 65], ['841381', 'Other liquid pumps', 45]],
  '9028': [['902820', 'Liquid meters', 35], ['902830', 'Electricity meters', 55]],
  '3407': [['340700', 'Dental waxes & modelling pastes', 30]],
  '9030': [['903010', 'Radiation measuring instruments', 75], ['903031', 'Multimeters without recording', 40]],
  '3701': [['370110', 'X-ray plates & flat film', 45], ['370199', 'Other photo plates & flat film', 20]],
  '9010': [['901010', 'Film developing equipment', 35], ['901050', 'Other photographic lab equipment', 25]],
  '9006': [['900630', 'Special-purpose cameras', 50], ['900661', 'Discharge-lamp flash units', 20]],
  '3702': [['370210', 'X-ray film rolls', 40], ['370239', 'Other unperforated film rolls', 25]],
};

const inputProfiles = {
  electronic: [['8542', 'Integrated circuits', 'electrical_meter'], ['9013', 'Optical devices & components', 'microscope'], ['3926', 'Plastic housings & parts', 'plastic']],
  material: [['3901', 'Polyethylene resins', 'plastic'], ['4002', 'Synthetic rubber', 'inventory_2'], ['5208', 'Woven cotton fabrics', 'textile']],
  mechanical: [['8501', 'Electric motors', 'electrical_meter'], ['8482', 'Ball & roller bearings', 'gauge'], ['3926', 'Plastic components', 'plastic']],
  chemical: [['2905', 'Industrial alcohols', 'science'], ['3906', 'Acrylic polymers', 'plastic'], ['3923', 'Plastic packaging', 'inventory_2']],
};
const familyFor = code => {
  if (['3005', '9004', '9020'].includes(code)) return 'material';
  if (['3006', '3407', '3701', '3702'].includes(code)) return 'chemical';
  if (['8705', '8424', '8713', '8413', '9028', '9021'].includes(code)) return 'mechanical';
  return 'electronic';
};
const riskLabels = { high: 'High risk', medium: 'Medium risk', low: 'Low risk' };
const shares = { high: [60, 20, 10, 4, 2], medium: [35, 25, 15, 8, 6], low: [22, 18, 15, 12, 10] };
const supplierNames = ['China', 'Germany', 'Japan'];
const supplierCodes = ['CHN', 'DEU', 'JPN', 'USA', 'KOR'];
const money = value => `US$${value}m`;

function makeNode(code, name, icon, risk) {
  const top = shares[risk][0];
  return { code, name, icon, risk, riskLabel: riskLabels[risk], evidence: `Top source: ${top}%`, supplierEvidence: `${supplierNames[0]} ${top}%`, indicative: true, description: 'Fictional sourcing and indicative input relationship for interface demonstration only.' };
}

function sourcingRows(node, imports) {
  return [{
    region: 'Thailand', position: 'south', positionLabel: 'Net importer',
    index: '−0.60', imports: money(imports), exports: money(imports / 4),
    note: 'Fictional values and supplier shares for design preview only.',
    segments: supplierSegments(shares[node.risk].map((share, index) => [supplierCodes[index], share])),
  }];
}

export const devicesMockData = Object.fromEntries(deviceSubproducts.map((heading, headingIndex) => {
  const chains = Object.fromEntries(productsByHeading[heading.code].map(([code, name, trade], index) => {
    const sourcing = {};
    const risk = ['high', 'medium', 'low'][(headingIndex + index) % 3];
    const product = makeNode(code, name, heading.icon, risk);
    const inputs = inputProfiles[familyFor(heading.code)].map(([inputCode, inputName, icon], inputIndex) => {
      // Inputs are illustrative HS headings, not an asserted bill of materials.
      const inputRisk = risk === 'high' && inputIndex === 0 ? 'high' : inputIndex === 2 ? 'low' : 'medium';
      const input = makeNode(inputCode, inputName, icon, inputRisk);
      sourcing[inputCode] = sourcingRows(input, 12 + headingIndex * 2 + inputIndex * 8);
      return input;
    });
    sourcing[code] = sourcingRows(product, trade);
    const overallRisk = inputs.some(input => input.risk === 'high') || risk === 'high' ? 'high' : 'medium';
    const highCount = inputs.filter(input => input.risk === 'high').length;
    return [code, {
      trade, risk: overallRisk, riskLabel: overallRisk === 'high' ? 'High' : 'Medium',
      summaryNote: highCount ? `${highCount} input from few sources` : 'No input from few sources',
      directSummary: highCount ? `${highCount} of ${inputs.length} high risk` : `${inputs.filter(input => input.risk === 'medium').length} of ${inputs.length} medium risk`,
      productSummary: `${supplierNames[0]} supplies ${shares[risk][0]}%`,
      methodology: 'Fictional trade and sourcing data. All input links are indicative. Further upstream inputs are not counted.',
      product, inputs, sourcing,
    }];
  }));
  return [heading.code, {
    heading, chains: heading.code === '9018' ? { '9018': devicesReferenceChain } : chains,
    referenceValueChains: heading.code === '9018',
  }];
}));
