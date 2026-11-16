import { supplierSegments } from './supplierSegments.js';

// Supplier shares are illustrative, with five ranked countries and Others.
export const biologicsSourcing = {
  '382100': [],
  '300249': [
    { region: 'World', unavailable: true },
    { region: 'Asia-Pacific', unavailable: true },
    { region: 'Thailand', position: 'south', positionLabel: 'Net importer', index: '−0.74', exports: 'US$4.6 m', imports: 'US$30 m', note: 'Ireland supplies 60%; the top two suppliers hold 80%.', segments: supplierSegments([["IRL", 60], ["USA", 20], ["DEU", 7], ["CHE", 5], ["FRA", 3]]) },
  ],
  '3001': [
    { region: 'World', imports: 'US$5.9 bn', segments: supplierSegments([["CHN", 27], ["USA", 19], ["FRA", 14], ["SGP", 10], ["DEU", 8]]) },
    { region: 'Asia-Pacific', position: 'north', positionLabel: 'Net exporter', index: '+0.26', exports: 'US$2.6 bn', imports: 'US$1.5 bn', segments: supplierSegments([["FRA", 41], ["CHN", 23], ["USA", 13], ["SGP", 8], ["DEU", 6]]) },
    { region: 'Thailand', position: 'south', positionLabel: 'Net importer', index: '−0.73', exports: 'US$0.9 m', imports: 'US$5.5 m', segments: supplierSegments([["KOR", 35], ["FRA", 21], ["ITA", 18], ["DNK", 10], ["DEU", 6]]) },
  ],
  '300214': [
    { region: 'World', imports: 'US$222.7 bn', segments: supplierSegments([["IRL", 43], ["USA", 19], ["KOR", 12], ["DEU", 9], ["CHE", 6]]) },
    { region: 'Asia-Pacific', position: 'north', positionLabel: 'Net exporter', index: '+0.41', exports: 'US$3.3 bn', imports: 'US$1.4 bn', segments: supplierSegments([["USA", 41], ["KOR", 18], ["IRL", 13], ["CHE", 9], ["DEU", 7]]) },
    { region: 'Thailand', position: 'north', positionLabel: 'Net exporter', index: '+0.90', exports: 'US$0.2 m', imports: 'US$0.0 m', small: true },
  ],
  '300213': [
    { region: 'World', imports: 'US$5.8 bn', segments: supplierSegments([["SGP", 21], ["CHE", 19], ["IRL", 18], ["USA", 16], ["DEU", 9]]) },
    { region: 'Asia-Pacific', position: 'north', positionLabel: 'Net exporter', index: '+0.47', exports: 'US$1.8 bn', imports: 'US$643 m', note: 'Buys from few sources although the world offers many.', segments: supplierSegments([["KOR", 51], ["SGP", 18], ["USA", 12], ["CHE", 8], ["IRL", 5]]) },
    { region: 'Thailand', position: 'south', positionLabel: 'Net importer', index: '−0.95', exports: 'US$0.0 m', imports: 'US$0.0 m', small: true },
  ],
  '300215': [
    { region: 'World', imports: 'US$15.3 bn', segments: supplierSegments([["CHE", 27], ["DEU", 18], ["IRL", 16], ["USA", 15], ["FRA", 9]]) },
    { region: 'Asia-Pacific', position: 'south', positionLabel: 'Net importer', index: '−0.50', exports: 'US$8.7 bn', imports: 'US$26.4 bn', segments: supplierSegments([["USA", 24], ["DEU", 21], ["IRL", 18], ["CHE", 14], ["FRA", 8]]) },
    { region: 'Thailand', position: 'south', positionLabel: 'Net importer', index: '−0.99', exports: 'US$0.7 m', imports: 'US$247 m', segments: supplierSegments([["DEU", 27], ["CHE", 20], ["USA", 18], ["IRL", 12], ["FRA", 8]]) },
  ],
};
