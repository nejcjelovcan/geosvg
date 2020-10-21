import React, { Fragment } from "react";
import Change from "./Change";
import styles from "./DescriptionDetails.module.css";
import classNames from "classnames";

export type DescriptionDetailsProps = {
  items: [string, string, number | undefined][];
  vertical?: boolean;
};

const DescriptionDetails = ({ items, vertical }: DescriptionDetailsProps) => (
  <dl className={classNames(styles.dl, { [styles.vertical]: vertical })}>
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
