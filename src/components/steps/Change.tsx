import React from "react";
import styles from "./Change.module.css";

export const getChange = (value1: number, value2: number) =>
  ((value2 - value1) / value1) * 100;

const Change = ({ amount }: { amount: number }) => (
  <span className={amount > 0 ? styles.changeUp : styles.changeDown}>
    {" "}
    {amount.toFixed(0)}%
  </span>
);
export default Change;
