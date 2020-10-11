import { TransformPayload } from "../model/transform.model";
import TransformWorker from "./TransformWorker";

let _instance: TransformWorker;
export async function requestTransforms(payload: TransformPayload) {
  if (!_instance) _instance = new TransformWorker();
  _instance.requestTransforms(payload);
}

// eslint-disable-next-line no-restricted-globals
addEventListener("message", (event) => {
  const payload = event.data as TransformPayload;
  requestTransforms(payload);
});
