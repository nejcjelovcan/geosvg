import deepEqual from "fast-deep-equal";
import { MapUnitFeature } from "../model/mapUnit.model";
import { countVertices, generateSvg, SvgData } from "../model/svg.model";
import {
  Transform,
  TransformPayload,
  TransformResult,
} from "../model/transform.model";
import { loadGeojson } from "../model/transform/loadGeojson";
import lowerPrecision from "../model/transform/lowerPrecision";
import simplifyPolygons from "../model/transform/simplifyPolygons";
import truncateViewBox from "../model/transform/truncateViewBox";
import fetchMapUnit from "./fetchMapUnit";

type TransformWorkerState = {
  featureUrl: string | null;
  feature: MapUnitFeature | null;
  transforms: Transform[];
  svgs: SvgData[];
};

export type TransformFetch = (url: string) => Promise<MapUnitFeature>;
export type TransformPm = (message: any) => void;

export default class TransformWorker {
  state: TransformWorkerState;

  constructor(
    public fetch: TransformFetch = fetchMapUnit,
    public pm: TransformPm | null = null
  ) {
    this.state = { featureUrl: null, feature: null, transforms: [], svgs: [] };
  }

  // TODO check what happens if we do a request while worker is still working
  // on the previous one
  async requestTransforms(payload: TransformPayload) {
    // console.log("REQUEST TRANSFORMS", payload);
    // TODO assert payload.transforms[0].operation === 'loadGeojson'
    await this.setFeature(payload.featureUrl);
    if (this.updateTransforms(payload.transforms)) {
      this.performTransforms();
    }
  }

  private async setFeature(featureUrl: string) {
    if (featureUrl !== this.state.featureUrl) {
      this.state.featureUrl = featureUrl;
      this.state.feature = await this.fetch(featureUrl);
      this.state.transforms = [];
      this.state.svgs = [];
    }
  }

  updateTransforms(transforms: Transform[]): boolean {
    for (let i = 0; i < transforms.length; i++) {
      if (!deepEqual(transforms[i], this.state.transforms[i])) {
        this.state.transforms = this.state.transforms
          .slice(0, i)
          .concat(transforms.slice(i));
        this.state.svgs = this.state.svgs.slice(0, i);
        return true;
      }
    }
    return false;
  }

  private performTransforms() {
    for (
      let i = this.state.svgs.length;
      i < this.state.transforms.length;
      i++
    ) {
      try {
        this.state.svgs[i] = this.transform(i);
        this.notify({
          viewBox: this.state.svgs[i].viewBox,
          transformIndex: i,
          error: null,
          svg: generateSvg(this.state.svgs[i]),
          vertexCount: countVertices(this.state.svgs[i]),
        });
      } catch (e) {
        // TODO
        this.notify({
          viewBox: [0, 0, 100, 100],
          transformIndex: i,
          error: e.message,
          svg: null,
          vertexCount: null,
        });
      }
    }
  }

  private transform(i: number): SvgData {
    const trans = this.state.transforms[i];
    switch (trans.operation) {
      case "loadGeojson":
        return loadGeojson(this.state.feature!);
      case "truncateViewBox":
        return truncateViewBox(this.state.svgs[i - 1]);
      case "lowerPrecision":
        return lowerPrecision(this.state.svgs[i - 1], trans.targetWidthRatio);
      case "simplify":
        const viewBox = this.state.svgs[i - 1].viewBox;
        return simplifyPolygons(
          this.state.svgs[i - 1],
          (viewBox[2] / 100) * trans.toleranceNormalized
        );
      default:
        throw new Error("Unrecognized transform");
    }
  }

  private notify(result: TransformResult) {
    if (this.pm) {
      this.pm(result);
    } else {
      postMessage(result);
    }
  }
}
