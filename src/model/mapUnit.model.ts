export type MapUnitProperties = {
  ISO_A2: string;
  NAME: string;
  TYPE: string;
  NAME_LONG: string;
};

export type MapUnitFeature = GeoJSON.Feature<
  GeoJSON.Geometry,
  MapUnitProperties
>;

export type MapUnitCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  MapUnitProperties
>;

export type MapUnitData = {
  name: string;
  nameLong: string;
  iso: string;
  precisions: { [precision: string]: number };
};
