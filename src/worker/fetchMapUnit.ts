import { MapUnitFeature } from "../model/mapUnit.model";

export default async function fetchMapUnit(
  featureUrl: string
): Promise<MapUnitFeature> {
  const response = await fetch(featureUrl);
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data as MapUnitFeature;
  } else {
    throw new Error("Could not get map unit");
  }
}
