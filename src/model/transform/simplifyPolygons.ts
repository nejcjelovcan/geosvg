import simplify from "simplify-js";
import { SvgData } from "../svg.model";

export default function simplifyPolygons(
  { viewBox, polygons }: SvgData,
  tolerance: number
): SvgData {
  return {
    viewBox,
    polygons: polygons.map((polygon) =>
      polygon.map((coordinates) =>
        simplify(
          coordinates.map((coord) => ({ x: coord[0], y: coord[1] })),
          tolerance,
          true
        ).map((coord) => [coord.x, coord.y])
      )
    ),
  };
}
