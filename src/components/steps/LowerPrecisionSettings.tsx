import React from "react";
import { TransformLowerPrecision } from "../../model/transform.model";
import stepStyles from "./TransformStep.module.css";

export type LowerPrecisionSettingsProps = {
  onChange?: (transform: TransformLowerPrecision) => void;
  transform: TransformLowerPrecision;
};

const LowerPrecisionSettings = ({
  onChange,
  transform,
}: LowerPrecisionSettingsProps) => {
  return (
    <>
      <div className={stepStyles.settingsPair}>
        <label htmlFor="target_width">Target{"\xa0"}Width</label>
        <input
          value={transform.targetWidthRatio}
          id="target_width"
          name="target_width"
          type="range"
          step={0.001}
          min={0.001}
          max={1}
          onChange={
            onChange
              ? (event) =>
                  onChange({
                    ...transform,
                    targetWidthRatio: parseFloat(event.target.value),
                  })
              : undefined
          }
        />
        <div>{Intl.NumberFormat().format(transform.targetWidthRatio)}</div>
      </div>
    </>
  );
};
export default LowerPrecisionSettings;
