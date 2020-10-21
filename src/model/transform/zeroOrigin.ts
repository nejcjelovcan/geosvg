import { SvgData } from "../svg.model";
import { TransformZeroOrigin } from "../transform.model";

export default function zeroOrigin(
  { viewBox, polygons }: SvgData,
  transform: TransformZeroOrigin
): SvgData {
  const offsetOrigin = transform.zeroOrigin ? viewBox.slice(0, 2) : [0, 0];

  const zeroOriginPoint = (point: number[]) => [
    point[0] - offsetOrigin[0],
    point[1] - offsetOrigin[1],
  ];

  return {
    viewBox: [
      viewBox[0] - offsetOrigin[0],
      viewBox[1] - offsetOrigin[1],
      viewBox[2],
      viewBox[3],
    ],
    polygons: polygons.map((polygon) =>
      polygon.map((coordinates) => coordinates.map(zeroOriginPoint))
    ),
  };
}
