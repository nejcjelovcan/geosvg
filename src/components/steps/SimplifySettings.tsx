import React from "react";
import { TransformSimplify } from "../../model/transform.model";
import stepStyles from "./TransformStep.module.css";

export type SimplifySettingsProps = {
  onChange?: (transform: TransformSimplify) => void;
  transform: TransformSimplify;
};

const SimplifySettings = ({ onChange, transform }: SimplifySettingsProps) => {
  return (
    <>
      <div className={stepStyles.settingsPair}>
        <label htmlFor="simplify_tolerance">Tolerance</label>
        <input
          value={transform.toleranceNormalized}
          id="simplify_tolerance"
          name="simplify_tolerance"
          type="range"
          step={0.01}
          min={0}
          max={1}
          onChange={
            onChange
              ? (event) =>
                  onChange({
                    ...transform,
                    toleranceNormalized: parseFloat(event.target.value),
                  })
              : undefined
          }
        />
        <div>{transform.toleranceNormalized}</div>
      </div>
    </>
  );
};
export default SimplifySettings;
