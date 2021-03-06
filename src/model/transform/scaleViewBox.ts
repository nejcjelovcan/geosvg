import { SvgData } from "../svg.model";
import { TransformScaleViewBox } from "../transform.model";

export default function scaleViewBox(
  { viewBox, polygons }: SvgData,
  transform: TransformScaleViewBox
): SvgData {
  const targetSize = Math.pow(10, transform.targetSizeDigits) - 1;
  const scale = transform.scale
    ? targetSize / Math.max(viewBox[2], viewBox[3])
    : 1;

  const scalePoint = (point: number[]) => point.map((c) => c * scale);
  const roundPoint = (point: number[]) =>
    transform.round ? point.map(Math.round) : point;
  const transformPoint = (point: number[]) => roundPoint(scalePoint(point));

  return {
    viewBox: transformPoint(viewBox.slice(0, 2)).concat(
      transformPoint(viewBox.slice(2))
    ),
    polygons: polygons.map((polygon) =>
      polygon.map((coordinates) => coordinates.map(transformPoint))
    ),
  };
}
