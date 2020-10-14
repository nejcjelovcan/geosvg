import classNames from "classnames";
import fileSize from "filesize";
import React from "react";
import DescriptionDetails from "../../DescriptionDetails";
import {
  Transform,
  TransformResult,
  TRANSFORM_DISPLAY,
  TRANSFORM_INFO,
} from "../../model/transform.model";
import cardStyles from "../Card.module.css";
import ScaleViewBoxSettings from "./ScaleViewBoxSettings";
import SimplifySettings from "./SimplifySettings";
import styles from "./TransformStep.module.css";

export type TransformStepProps = {
  transform: Transform;
  selected: boolean;
  prevResult?: TransformResult;
  result?: TransformResult;

  onClick?: () => void;
  onChange: (transform: Transform) => void;
};

const getChange = (value1: number, value2: number) =>
  ((value2 - value1) / value1) * 100;

const TransformStep = ({
  transform,
  selected,
  result,
  prevResult,

  onClick,
  onChange,
}: TransformStepProps) => {
  const size = result?.svg && fileSize(result.svg.length);
  const sizeChange =
    result?.svg && prevResult?.svg
      ? getChange(prevResult.svg.length, result.svg.length)
      : undefined;
  const vCount = result?.vertexCount
    ? Intl.NumberFormat().format(result?.vertexCount)
    : "";
  return (
    <div
      className={classNames(cardStyles.card, cardStyles.interactive, {
        [cardStyles.selected]: selected,
        [cardStyles.loading]: !result,
      })}
      title={TRANSFORM_INFO[transform.operation]}
      role="button"
      aria-pressed={selected ? "true" : "false"}
      onMouseDown={onClick}
    >
      <h2>
        {selected && <span className={styles.arrow}>▶</span>}
        {TRANSFORM_DISPLAY[transform.operation] || transform.operation}
      </h2>
      {transform.operation === "simplify" && (
        <SimplifySettings transform={transform} onChange={onChange} />
      )}
      {transform.operation === "scaleViewBox" && (
        <ScaleViewBoxSettings transform={transform} onChange={onChange} />
      )}
      <DescriptionDetails
        items={[
          ["Size", size ?? "", sizeChange],
          ["Points", vCount, undefined],
        ]}
      />
    </div>
  );
};
export default TransformStep;
