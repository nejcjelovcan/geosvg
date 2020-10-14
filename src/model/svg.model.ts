export type SvgData = {
  viewBox: number[];
  polygons: GeoJSON.Position[][][];
};

export const countVertices = ({ polygons }: SvgData) =>
  polygons
    .map((polygon) => polygon.map((coordinates) => coordinates.length))
    .reduce((counts1, counts2) => counts1.concat(counts2), [])
    .reduce((count1, count2) => count1 + count2, 0);

export const generateSvg = ({
  viewBox,
  polygons,
}: SvgData) => `<svg viewBox="${viewBox.join(" ")}">
${polygons.map(
  (polygon, i) =>
    `<polygon vector-effect="non-scaling-stroke" points="${polygon.map(
      (positions) => positions.map((coord) => coord.join(",")).join(" ")
    )}" />`
)}
</svg>`;
