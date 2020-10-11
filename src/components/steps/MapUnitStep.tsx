import fileSize from "filesize";
import React from "react";
import { mapUnits } from "../../model/mapUnits.data";
import { useOvermind } from "../../overmind";
import cardStyles from "../Card.module.css";
import RadioButtonGroup from "../inputs/RadioButtonGroup";
import Select from "../inputs/Select";

const MapUnitStep = () => {
  const {
    state,
    actions: { setMapUnitIso, setMapUnitPrecision },
  } = useOvermind();

  const selectedMapUnit = state.state !== "INIT" ? state.mapUnit : undefined;
  const selectedPrecision =
    state.state === "SELECTED" ? state.precision : undefined;
  const precisions = selectedMapUnit
    ? Object.entries(selectedMapUnit.precisions)
    : undefined;

  return (
    <section className={cardStyles.card}>
      <Select
        id="map_unit_iso"
        label="Map Unit"
        options={mapUnits.map((unit) => [unit.iso, unit.name])}
        value={selectedMapUnit?.iso}
        onChange={(value) => value && setMapUnitIso(value)}
        empty="Choose a map..."
      />
      {selectedMapUnit && precisions && (
        <>
          <hr />
          <RadioButtonGroup
            label="Precision"
            options={precisions.map(([precision, size]) => [
              precision,
              `1:${precision}\n(${fileSize(size)})`,
            ])}
            value={selectedPrecision}
            onChange={setMapUnitPrecision}
          />
        </>
      )}
    </section>
  );
};
export default MapUnitStep;
