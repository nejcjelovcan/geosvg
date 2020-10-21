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
  | TransformSimplify
  | TransformScaleViewBox
  | TransformZeroOrigin;

export type TransformLoadGeojson = { operation: "loadGeojson" };
export type TransformSimplify = {
  operation: "simplify";
  toleranceNormalized: number; // 0 to 1 (1 being 100th of viewbox width)
};
export type TransformScaleViewBox = {
  operation: "scaleViewBox";
  scale: boolean;
  targetSizeDigits: number;
  round: boolean;
};
export type TransformZeroOrigin = {
  operation: "zeroOrigin";
  zeroOrigin: boolean;
};

export const TRANSFORMS_PRESET: Transform[] = [
  { operation: "loadGeojson" },
  { operation: "zeroOrigin", zeroOrigin: true },
  { operation: "simplify", toleranceNormalized: 0.25 },
  { operation: "scaleViewBox", scale: true, targetSizeDigits: 4, round: true },
];

export const TRANSFORM_DISPLAY = {
  loadGeojson: "Load GeoJSON",
  simplify: "Simplify polygons",
  scaleViewBox: "Scale and round viewBox",
  zeroOrigin: "Set origin to 0,0",
};

export const TRANSFORM_INFO = {
  loadGeojson: "Generate SVG from NaturalEarthData GeoJSON Feature",
  simplify:
    "Simplify polygons with SimplifyJS, which uses a combination of Douglas-Peucker and Radial Distance algorithms",
  scaleViewBox: "Scale view box and round coordinates",
  zeroOrigin: "Set view box origin to 0,0 and subtract all the vertices",
};
