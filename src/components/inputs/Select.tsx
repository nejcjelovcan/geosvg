import classNames from "classnames";
import React from "react";
import styles from "./Select.module.css";

export type SelectProps = {
  id: string;
  label: string;
  options: [string, string][];
  value?: string;
  empty?: string;
  onChange: (value: string) => void;
};

const Select = ({
  id,
  label,
  options,
  empty,
  value,
  onChange,
}: SelectProps) => (
  <>
    <label htmlFor={id} style={{ display: "none" }}>
      {label}
    </label>
    <select
      className={classNames("select-css", styles.select)}
      id={id}
      name={id}
      value={value || ""}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
    >
      {empty && <option value="">{empty}</option>}
      {options.map((item) => (
        <option key={item[0]} value={item[0]}>
          {item[1]}
        </option>
      ))}
    </select>
  </>
);
export default Select;
