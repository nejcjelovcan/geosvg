import { SvgData } from "../svg.model";

export default function truncateViewBox({
  viewBox,
  polygons,
}: SvgData): SvgData {
  return {
    viewBox: [0, 0, viewBox[2], viewBox[3]],
    polygons: polygons.map((polygon) =>
      polygon.map((coordinates) =>
        coordinates.map((coord) => [
          coord[0] - viewBox[0],
          coord[1] - viewBox[1],
        ])
      )
    ),
  };
}
