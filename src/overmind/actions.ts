import { Action, mutate, pipe, throttle } from "overmind";
import { mapUnits } from "../model/mapUnits.data";
import {
  Transform,
  TransformResult,
  TRANSFORMS_PRESET,
} from "../model/transform.model";

export const setMapUnitIso: Action<string> = ({ state }, iso) => {
  const isoState = state.transition("ISO");
  if (isoState) {
    isoState.iso = iso;
    isoState.mapUnit = mapUnits.find((u) => u.iso === iso)!;
    isoState.requestedIso = null;
  }
};

export const setMapUnitPrecision: Action<string> = (
  { state, actions: { requestTransforms }, effects: { transformWorker } },
  precision
) => {
  const selectedState = state.transition("SELECTED");
  if (selectedState) {
    if (
      selectedState.precision !== precision ||
      selectedState.iso !== selectedState.requestedIso
    ) {
      selectedState.precision = precision;
      selectedState.transforms = [...TRANSFORMS_PRESET];
      selectedState.svgs = [];
      requestTransforms();
    }
  }
};

export const requestTransforms: Action = ({
  state,
  effects: { transformWorker },
}) => {
  if (state.state === "SELECTED") {
    state.requestedIso = state.iso;
    transformWorker.requestTransforms({
      featureUrl: `/data/mapUnits/${state.precision}/${state.iso}.json`,
      transforms: state.transforms,
    });
  }
};

export const onWorkerNotify: Action<TransformResult> = ({ state }, result) => {
  if (state.state === "SELECTED") {
    if (result.svg) {
      state.svgs[result.transformIndex] = result;
    }
  }
};

export const updateTransform: Action<{
  transformIndex: number;
  transform: Transform;
}> = pipe(
  mutate(({ state }, { transformIndex, transform }) => {
    if (state.state === "SELECTED") {
      state.transforms[transformIndex] = transform;
    }
  }),
  throttle(200),
  mutate(({ actions: { requestTransforms } }) => {
    requestTransforms();
  })
);
