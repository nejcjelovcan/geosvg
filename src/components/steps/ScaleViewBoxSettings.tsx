import React from "react";
import { TransformScaleViewBox } from "../../model/transform.model";
import stepStyles from "./TransformStep.module.css";

export type ScaleViewBoxSettingsProps = {
  onChange: (transform: TransformScaleViewBox) => void;
  transform: TransformScaleViewBox;
};

const ScaleViewBoxSettings = ({
  onChange,
  transform,
}: ScaleViewBoxSettingsProps) => {
  console.log("TRANSFORM", transform);
  return (
    <>
      <div className={stepStyles.settingsPair}>
        <input
          id="scale_viewbox"
          name="scale_viewbox"
          type="checkbox"
          checked={transform.scale}
          onChange={(event) =>
            onChange({ ...transform, scale: event.target.checked })
          }
        />
        <label htmlFor="scale_viewbox">Scale{"\xa0"}Viewbox</label>
        <input
          id="round"
          name="round"
          type="checkbox"
          checked={transform.round}
          onChange={(event) =>
            onChange({ ...transform, round: event.target.checked })
          }
        />
        <label htmlFor="round">Round</label>
      </div>
      <div className={stepStyles.settingsPair}>
        <label htmlFor="target_size">Digits</label>
        <input
          disabled={!transform.scale}
          value={transform.targetSizeDigits}
          id="target_size"
          name="target_size"
          type="range"
          min={1}
          step={1}
          max={9}
          onChange={(event) =>
            onChange({
              ...transform,
              targetSizeDigits: parseInt(event.target.value),
            })
          }
        />
        <div>
          {transform.targetSizeDigits}
          {/* {"\xa0"}
          <small>
            (
            {Intl.NumberFormat().format(
              Math.pow(10, transform.targetSizeDigits) - 1
            )}
            )
          </small> */}
        </div>
      </div>
    </>
  );
};
export default ScaleViewBoxSettings;
