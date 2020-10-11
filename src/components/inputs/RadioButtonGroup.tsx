import classNames from "classnames";
import React from "react";
import styles from "./RadioButtonGroup.module.css";

export type RadioButtonGroupProps = {
  label: string;
  value?: string;
  options: [string, string][];
  onChange: (value: string) => void;
};

const RadioButtonGroup = ({
  label,
  value,
  options,
  onChange,
}: RadioButtonGroupProps) => (
  <>
    <label style={{ display: "none" }}>{label}</label>
    <div className={styles.group}>
      {options.map(([val, display]) => (
        <button
          key={val}
          className={classNames(styles.button, {
            [styles.selected]: value === val,
          })}
          onClick={() => onChange(val)}
        >
          {display.split("\n").map((row, key) => (
            <span key={key}>
              {row}
              <br />
            </span>
          ))}
        </button>
      ))}
    </div>
  </>
);

export default RadioButtonGroup;
