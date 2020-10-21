import React, { Fragment, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
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
            optimizations up to that step. Once rendered, you can zoom and pan
            the map on the right side.
          </small>
        </div>
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
          <TransformWrapper
            defaultScale={2}
            options={{
              minScale: 0.5,
              maxScale: 50,
              limitToBounds: false,
              limitToWrapper: false,
            }}
            pan={{ velocitySensitivity: 0 }}
          >
            <TransformComponent>
              <div
                dangerouslySetInnerHTML={{
                  __html: svgs[selectedTransform].svg!,
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        )}
      </main>
    </div>
  );
}

export default App;
