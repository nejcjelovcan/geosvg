import React from "react";
import { TransformZeroOrigin } from "../../model/transform.model";
import stepStyles from "./TransformStep.module.css";

export type ZeroOriginSettingsProps = {
  onChange: (transform: TransformZeroOrigin) => void;
  transform: TransformZeroOrigin;
};

const ZeroOriginSettings = ({
  onChange,
  transform,
}: ZeroOriginSettingsProps) => {
  return (
    <>
      <div className={stepStyles.settingsPair}>
        <label htmlFor="zero_origin">Zero{"\xa0"}Origin</label>
        <input
          id="zero_origin"
          name="zero_origin"
          type="checkbox"
          checked={transform.zeroOrigin}
          onChange={(event) =>
            onChange({ ...transform, zeroOrigin: event.target.checked })
          }
        />
      </div>
    </>
  );
};
export default ZeroOriginSettings;
