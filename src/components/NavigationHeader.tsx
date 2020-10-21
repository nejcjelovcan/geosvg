import React from "react";
import styles from "./NavigationHeader.module.css";

const NavigationHeader = () => {
  return (
    <header className={styles.header}>
      <h1>
        GeoSVG <small>Optimize GeoJSON SVG</small>
      </h1>
      <div className={styles.info}>
        <small>
          Choose a{" "}
          <a
            href="http://www.naturalearthdata.com/"
            rel="noreferrer noopener"
            target="_blank"
          >
            NaturalEarthData
          </a>{" "}
          map unit and click on optimization steps to see the result of
          optimizations up to that step. Once rendered, you can zoom and pan the
          map on the right.
        </small>
      </div>
    </header>
  );
};
export default NavigationHeader;
