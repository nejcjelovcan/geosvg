export type TransformPayload = { featureUrl: string; transforms: Transform[] };
export type TransformResult = {
  transformIndex: number;
  error: string | null;
  svg: string | null;
  viewBox: number[];
  vertexCount: number | null;
};

export type Transform =
  | TransformLoadGeojson
  | TransformTruncateViewBox
  | TransformSimplify
  | TransformLowerPrecision;

export type TransformLoadGeojson = { operation: "loadGeojson" };
export type TransformTruncateViewBox = { operation: "truncateViewBox" };
export type TransformSimplify = {
  operation: "simplify";
  toleranceNormalized: number; // 0 to 1 (1 being 100th of viewbox width)
};
export type TransformLowerPrecision = {
  operation: "lowerPrecision";
  targetWidthRatio: number; // 0 to 1 (1 being full viewBox width of input svg)
};

export const TRANSFORMS_PRESET: Transform[] = [
  { operation: "loadGeojson" },
  { operation: "truncateViewBox" },
  { operation: "simplify", toleranceNormalized: 0.25 },
  { operation: "lowerPrecision", targetWidthRatio: 0.5 },
];

export const TRANSFORM_DISPLAY = {
  loadGeojson: "Load GeoJSON",
  truncateViewBox: "Truncate viewbox",
  simplify: "Simplify polygons",
  lowerPrecision: "Lower precision",
};

export const TRANSFORM_INFO = {
  loadGeojson: "Generate SVG from NaturalEarthData GeoJSON Feature",
  truncateViewBox: "Set view box origin to 0,0 and subtract all the vertices",
  simplify:
    "Simplify polygons with SimplifyJS, which uses a combination of Douglas-Peucker and Radial Distance algorithms",
  lowerPrecision:
    "Round vertices to target width (as a ratio of view box width)",
};
