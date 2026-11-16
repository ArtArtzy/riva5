// Stable country colors shared by the illustrative sourcing bars.
const countryColors = {
  CHN: '#427b52', USA: '#2978b6', FRA: '#7b60b3', SGP: '#b66b24',
  KOR: '#17827c', ITA: '#b34564', DNK: '#637e28', DEU: '#3757a1',
  IRL: '#9b4a96', CHE: '#956d35', JPN: '#b84236', MYS: '#536bac',
  VNM: '#637d46', TWN: '#348da2', NLD: '#a45d33', MEX: '#76519d',
  SAU: '#557b37', ARE: '#a04e48', TUR: '#687e9a', IDN: '#9d6624',
  AUT: '#7d5869', IND: '#466f79', THA: '#8a7533', BEL: '#5a6790',
};

const countryNames = {
  CHN: 'China', USA: 'United States', FRA: 'France', SGP: 'Singapore',
  KOR: 'South Korea', ITA: 'Italy', DNK: 'Denmark', DEU: 'Germany',
  IRL: 'Ireland', CHE: 'Switzerland', JPN: 'Japan', MYS: 'Malaysia',
  VNM: 'Viet Nam', TWN: 'Taiwan', NLD: 'Netherlands', MEX: 'Mexico',
  SAU: 'Saudi Arabia', ARE: 'United Arab Emirates', TUR: 'Turkey', IDN: 'Indonesia',
  AUT: 'Austria', IND: 'India', THA: 'Thailand', BEL: 'Belgium',
};

export function supplierSegments(countries) {
  const ranked = [...countries].sort((a, b) => b[1] - a[1]);
  const others = 100 - ranked.reduce((sum, [, share]) => sum + share, 0);
  return [
    ...ranked.map(([code, width]) => ({
      label: `${code} ${width}%`, name: countryNames[code] || code, width, color: countryColors[code],
      detail: `${countryNames[code] || code}: ${width}% (illustrative supplier share)`,
    })),
    { label: `Others ${others}%`, width: others, color: '#dce1e8', grouped: true,
      detail: `Other countries: ${others}% (illustrative supplier share)` },
  ];
}
