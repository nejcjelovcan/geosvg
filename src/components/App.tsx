import React, { Fragment, useState } from "react";
import { useOvermind } from "../overmind";
import styles from "./App.module.css";
import Separator from "./Separator";
import MapUnitStep from "./steps/MapUnitStep";
import TransformStep from "./steps/TransformStep";

function App() {
  const {
    state,
    actions: { updateTransform },
  } = useOvermind();

  const [selectedTransform, setSelectedTransform] = useState<number>(3);

  const transforms = state.state === "SELECTED" ? state.transforms : [];
  const svgs = state.state === "SELECTED" ? state.svgs : [];

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <h1>
          GeoSVG <small>Optimize GeoJSON SVG</small>
        </h1>
        <MapUnitStep />
        {transforms.map((transform, i) => (
          <Fragment key={i}>
            <Separator />
            <TransformStep
              transform={transform}
              prevResult={svgs[i - 1]}
              result={svgs[i]}
              selected={selectedTransform === i}
              onClick={() => setSelectedTransform(i)}
              onChange={(transform) =>
                updateTransform({ transformIndex: i, transform })
              }
            />
          </Fragment>
        ))}
        {/* {transforms.length > 0 && } */}
      </nav>
      <main className={styles.content}>
        {svgs[selectedTransform] && (
          <div
            dangerouslySetInnerHTML={{ __html: svgs[selectedTransform].svg! }}
          ></div>
        )}
      </main>
    </div>
  );
}

export default App;
