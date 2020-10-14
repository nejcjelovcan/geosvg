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
        <label htmlFor="target_width">Target{"\xa0"}Width</label>
        <input
          disabled={!transform.scale}
          value={transform.targetWidth}
          id="target_width"
          name="target_width"
          type="range"
          min={100}
          step={100}
          max={20000}
          onChange={(event) =>
            onChange({
              ...transform,
              targetWidth: parseFloat(event.target.value),
            })
          }
        />
        <div>{transform.targetWidth}</div>
      </div>
    </>
  );
};
export default ScaleViewBoxSettings;
