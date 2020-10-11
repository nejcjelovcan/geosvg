import { SvgData } from "../svg.model";

export default function lowerPrecision(
  { viewBox, polygons }: SvgData,
  targetWidthRatio: number
): SvgData {
  const targetWidth = viewBox[2] * targetWidthRatio;
  const pointsPerPx = viewBox[2] / targetWidth;

  return {
    viewBox: [0, 0, targetWidth, (viewBox[3] / viewBox[2]) * targetWidth],
    polygons: polygons.map((polygon) =>
      polygon.map((coordinates) =>
        coordinates.map((coord) => [
          Math.round(coord[0] / pointsPerPx),
          Math.round(coord[1] / pointsPerPx),
        ])
      )
    ),
  };
}
