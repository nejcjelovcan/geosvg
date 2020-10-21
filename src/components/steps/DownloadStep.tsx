import { saveAs } from "file-saver";
import fileSize from "filesize";
import React from "react";
import { useOvermind } from "../../overmind";
import cardStyles from "../Card.module.css";
import { getChange } from "./Change";
import DescriptionDetails from "./DescriptionDetails";
import buttonStyles from "../inputs/RadioButtonGroup.module.css";
import classNames from "classnames";

const DownloadStep = () => {
  const { state } = useOvermind();

  const svgs = state.state === "SELECTED" ? state.svgs : [];
  const unit = state.state === "SELECTED" ? state.mapUnit.name : "Country";
  const firstSvg = svgs[0]?.svg;
  const lastSvg = svgs[svgs.length - 1]?.svg;

  if (!firstSvg || !lastSvg) return <></>;

  const totalChange = getChange(firstSvg.length ?? 1, lastSvg.length ?? 0);
  const blob = new Blob([lastSvg], {
    type: "image/svg+xml;charset=utf-8",
  });

  return (
    <section className={cardStyles.card}>
      <div className={buttonStyles.group}>
        <button
          className={classNames(buttonStyles.button, buttonStyles.selected)}
          onClick={() => saveAs(blob, `${unit}.svg`)}
        >
          <span role="img" aria-label="Save icon">
            💾
          </span>{" "}
          Save SVG File
        </button>
      </div>
      <DescriptionDetails
        items={[
          ["Initial\xa0size", fileSize(firstSvg.length), undefined],
          ["Final\xa0size", fileSize(lastSvg.length), totalChange],
        ]}
      />
    </section>
  );
};
export default DownloadStep;
