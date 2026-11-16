const glands = { code: '3001', name: 'Glands, organs & heparin', supplierEvidence: 'Korea 35%', icon: 'science', risk: 'medium', riskLabel: 'Medium risk', evidence: 'Top 3: 73%', indicative: true, description: 'Glands and other organs; heparin and its salts; other human or animal substances for therapeutic or prophylactic uses. Indicative link; near a risk threshold.' };

export const biologicsChains = {
  '300215': {
    risk: 'medium', riskLabel: 'Medium', directSummary: '1 of 3 medium risk', productSummary: 'Top 3 sources: 65%',
    directNote: 'One input has medium supply risk', productNote: 'Top 3 suppliers provide 65% of imports',
    methodology: 'The product and HS 3001 are near a risk threshold. No further upstream inputs are counted in this example.',
    product: { code: '300215', name: 'Blood & immune products', icon: 'blood', risk: 'medium', riskLabel: 'Medium risk', evidence: 'Top 3: 65%', supplierEvidence: 'Germany 27%' },
    inputs: [
      glands,
      { code: '300214', name: 'Immune products, mixed', icon: 'blood', risk: 'low', riskLabel: 'Low risk', evidence: 'Net exporter', description: 'Mixed immunological products, in measured doses or retail packaging. Thailand is a net exporter.' },
      { code: '300213', name: 'Immune products, unmixed', icon: 'blood', risk: 'no-data', riskLabel: 'No readable sourcing', evidence: 'Transit: SGP', description: 'Unmixed immunological products, not in measured doses or retail packaging. No readable sourcing for Thailand; transit through Singapore.' },
    ],
  },
  '300249': {
    risk: 'high', riskLabel: 'High', directSummary: '2 of 2 medium risk', productSummary: 'Ireland supplies 60%',
    directNote: 'Both inputs have medium supply risk', productNote: 'Ireland provides 60% of imports',
    methodology: 'The product is high risk: Ireland supplies 60%, and the top two suppliers hold 80%. Both direct inputs are medium risk. HS 3001 is near a risk threshold. No further upstream inputs are counted.',
    product: { code: '300249', name: 'Toxins & cultures', icon: 'science', risk: 'high', riskLabel: 'High risk', evidence: 'Top 2: 80%', supplierEvidence: 'Ireland 60%', description: 'Toxins, cultures of micro-organisms (excluding yeasts) and similar products; n.e.c. in item 3002.3.' },
    inputs: [
      glands,
      { code: '382100', name: 'Prepared culture media', icon: 'culture', risk: 'medium', riskLabel: 'Medium risk', evidence: 'Top 3: 55%', description: 'Prepared culture media for the development or maintenance of micro-organisms (including viruses and the like) or of plant, human or animal cells.' },
    ],
  },
};
