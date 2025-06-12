export const POP_DENSITY = 11515;

export function calculateLaneMiles(
  paths: NodeListOf<SVGPathElement>
): Record<string, number> {
  const totals: Record<string, number> = {};
  paths.forEach((path) => {
    const sw = path.getAttribute("stroke-width");
    if (!sw) return;
    const rawLen = path.getTotalLength?.() || 0;
    const miles = rawLen * 0.0008955 * parseFloat(sw);
    totals[sw] = (totals[sw] || 0) + miles;
  });
  return totals;
}

export function calculateSvgArea(svg: SVGSVGElement): number {
  const width = svg.viewBox.baseVal.width;
  const height = svg.viewBox.baseVal.height;
  return width * height * 8.019025e-7;
}

export function estimatePopulation(
  area: number,
  density: number = POP_DENSITY
): number {
  return Math.floor((area * density) / 500) * 500;
}
