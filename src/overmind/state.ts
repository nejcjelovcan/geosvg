import { statemachine } from "overmind";
import { MapUnitData } from "../model/mapUnit.model";
import { Transform, TransformResult } from "../model/transform.model";

type IsoState = {
  iso: string;
  mapUnit: MapUnitData;
  requestedIso: string | null;
};

type AppState =
  | {
      state: "INIT";
    }
  | ({ state: "ISO" } & IsoState)
  | ({
      state: "SELECTED";
      precision: string;
      transforms: Transform[];
      svgs: TransformResult[];
    } & IsoState);

export const state = statemachine<AppState>(
  {
    INIT: ["ISO"],
    ISO: ["ISO", "SELECTED"],
    SELECTED: ["ISO", "SELECTED"],
  },
  {
    state: "INIT",
  }
);
