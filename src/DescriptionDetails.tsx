import React, { Fragment } from "react";
import styles from "./DescriptionDetails.module.css";

export type DescriptionDetailsProps = {
  items: [string, string, number | undefined][];
};

const Change = ({ amount }: { amount: number }) => (
  <span className={amount > 0 ? styles.changeUp : styles.changeDown}>
    {" "}
    {amount.toFixed(0)}%
  </span>
);

const DescriptionDetails = ({ items }: DescriptionDetailsProps) => (
  <dl className={styles.dl}>
    {items.map(([term, details, change]) => (
      <Fragment key={term}>
        <dt>{term}</dt>
        <dd>
          {details}
          {typeof change !== "undefined" ? <Change amount={change} /> : ""}
        </dd>
      </Fragment>
    ))}
  </dl>
);
export default DescriptionDetails;
