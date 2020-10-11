// eslint-disable-next-line
import Worker from "worker-loader!../worker/worker";
import { MapUnitFeature } from "../model/mapUnit.model";
import { TransformPayload, TransformResult } from "../model/transform.model";
import { json } from "overmind";

export const jsonFetcher = {
  async fetchMapUnit(iso: string, precision: string): Promise<MapUnitFeature> {
    const response = await fetch(`/units/${precision}/${iso}.json`);
    if (response.status === 200) {
      const data = await response.json();
      return data as MapUnitFeature;
    } else {
      throw new Error("Could not get map unit");
    }
  },
};

export const transformWorker = (() => {
  let worker: Worker;
  const getWorker = async () => {
    if (!worker) {
      worker = new Worker();
    }
    return worker;
  };
  return {
    // call only once! TODO
    async setOnMessage(listener: (result: TransformResult) => void) {
      const worker = await getWorker();
      worker.addEventListener("message", (ev) => listener(ev.data));
    },
    async requestTransforms(payload: TransformPayload) {
      (await getWorker()).postMessage(json(payload));
    },
  };
})();
