import React, { Fragment, useState } from "react";
import { useOvermind } from "../overmind";
import styles from "./App.module.css";
import Main from "./Main";
import NavigationHeader from "./NavigationHeader";
import Separator from "./Separator";
import DownloadStep from "./steps/DownloadStep";
import MapUnitStep from "./steps/MapUnitStep";
import TransformStep from "./steps/TransformStep";

export default function App() {
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
        <NavigationHeader />
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
        {svgs.length > 2 && (
          <>
            <Separator />
            <DownloadStep />
          </>
        )}
      </nav>
      <Main selectedTransform={selectedTransform} svgs={svgs} />
    </div>
  );
}
