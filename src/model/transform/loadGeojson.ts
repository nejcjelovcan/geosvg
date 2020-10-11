import bbox from "@turf/bbox";
import { toMercator } from "@turf/projection";
import { MapUnitFeature } from "../mapUnit.model";
import { SvgData } from "../svg.model";

// toMercator with Y axis flip
const pointToMercator = (lonlat: number[]): number[] => {
  const coord = toMercator(lonlat);
  return [coord[0], -coord[1]];
};

// feature bbox with Y axis flip
const getViewBox = (feature: MapUnitFeature): number[] => {
  const box = bbox(feature);
  const topLeft = pointToMercator([box[0], box[3]]);
  const bottomRight = pointToMercator([box[2], box[1]]);

  return topLeft.concat([
    bottomRight[0] - topLeft[0],
    bottomRight[1] - topLeft[1],
  ]);
};

export function loadGeojson(feature: MapUnitFeature): SvgData {
  // Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;
  const viewBox = getViewBox(feature);
  const { geometry } = feature;

  switch (geometry.type) {
    case "Polygon":
      return {
        viewBox,
        polygons: [
          geometry.coordinates.map((positions) =>
            positions.map(pointToMercator)
          ),
        ],
      };
    case "MultiPolygon":
      return {
        viewBox,
        polygons: geometry.coordinates.map((polygon) =>
          polygon.map((positions) => positions.map(pointToMercator))
        ),
      };
    default:
      throw new Error(`Unrecognized geometry: ${geometry.type}`);
  }
}
