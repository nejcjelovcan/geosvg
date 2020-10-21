import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { TransformResult } from "../model/transform.model";
import styles from "./Main.module.css";

const Main = ({
  selectedTransform,
  svgs,
}: {
  selectedTransform: number;
  svgs: TransformResult[];
}) => {
  return (
    <main className={styles.content}>
      {svgs[selectedTransform] && (
        <>
          <div className={styles.svgInfo}>
            <pre>
              <code>
                {(svgs[selectedTransform].svg || "")
                  .split("\n")
                  .slice(0, 3)
                  .join("\n")}
              </code>
            </pre>
          </div>
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
        </>
      )}
    </main>
  );
};
export default Main;
