import { biologicsChains } from './biologicsChains.js';
import { biologicsSourcing } from './biologicsSourcing.js';

export const tradeMillions = value => {
  if (!value) return null;
  const amount = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(amount) ? amount * (/bn/i.test(value) ? 1000 : 1) : null;
};

export function getBiologicsRiskExposure(chainCode, chains = biologicsChains, sourcing = biologicsSourcing) {
  const chain = chains[chainCode] || Object.values(chains)[0];
  const rows = chain.sourcing || sourcing;
  const groups = new Map();
  for (const node of chain.upstream || []) {
    if (!groups.has(node.stage)) groups.set(node.stage, []);
    groups.get(node.stage).push(node);
  }
  const stages = [...groups].map(([label, nodes]) => ({ label, nodes }));
  stages.push({ label: 'DIRECT INPUTS', nodes: chain.inputs }, { label: 'THE PRODUCT', nodes: [chain.product] });
  const points = stages.flatMap((stage, stageIndex) => stage.nodes.map(node => {
    const row = rows[node.code]?.find(row => row.region === 'Thailand') || {};
    const imports = tradeMillions(row.imports);
    const exports = tradeMillions(row.exports);
    const index = row.index ? Number(row.index.replace(/\u2212|\u2013/g, '-').replace('\u2248', '')) : NaN;
    const trade = imports !== null && exports !== null ? imports + exports : null;
    const position = Number.isFinite(index) ? index : trade > 0 ? (exports - imports) / trade : null;
    const approximate = position === null && node.code === '382100';
    return { ...node, row, stageIndex, trade, position: approximate ? -0.94 : position, approximate };
  }));
  const maximumTrade = Math.max(1, ...points.map(point => point.trade || 0));
  let left = 60;
  for (const [index, stage] of stages.entries()) {
    const nodes = points.filter(point => point.stageIndex === index);
    const crowded = nodes.filter(point => nodes.some(other => other !== point && Math.abs((other.position ?? 0) - (point.position ?? 0)) < 0.25));
    stage.width = Math.max(340, crowded.length * 110 + 60);
    stage.x = left + stage.width / 2;
    stage.divider = left + stage.width;
    for (const point of nodes) {
      point.radius = point.approximate ? 18 : point.trade === null ? 5 : Math.max(4, 19 * Math.sqrt(point.trade / maximumTrade));
      point.x = stage.x;
    }
    const lanes = [];
    for (const point of [...nodes].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))) {
      const lane = lanes.find(group => group.some(other => Math.abs((other.position ?? 0) - (point.position ?? 0)) < 0.25));
      if (lane) lane.push(point); else lanes.push([point]);
    }
    for (const lane of lanes) lane.forEach((point, i) => { point.x += (i - (lane.length - 1) / 2) * 110; });
    left += stage.width;
  }
  const links = [...chain.inputs.map(input => ({ from: input.code, to: chain.product.code, indicative: input.indicative, inferred: input.inferred })), ...(chain.links || [])]
    .map(link => ({ ...link, source: points.find(point => point.code === link.from), target: points.find(point => point.code === link.to) }))
    .filter(link => link.source && link.target && link.source.position !== null && link.target.position !== null);
  return { chain, sourcing: rows, points, stages, links, width: left + 20, product: points.find(point => point.code === chain.product.code), inputs: points.filter(point => point.code !== chain.product.code) };
}
