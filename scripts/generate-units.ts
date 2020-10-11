import { promises as fs } from "fs";
import path from "path";
import {
  MapUnitCollection,
  MapUnitData,
  MapUnitFeature,
} from "../src/model/mapUnit.model";

const SRC_DIR = "./data/geojson";
const DEST_DIR = "./public/data/mapUnits";
const DEST_UNITS_FILE_DIR = "./src/model";

async function getMapUnitCollection(filename: string) {
  const buffer = await fs.readFile(filename);
  return JSON.parse(buffer.toString()) as MapUnitCollection;
}

type Source = {
  precision: string;
  filename: string;
};

const SOURCES = [
  { precision: "110m", filename: "ne_110m_admin_0_map_units.json" },
  { precision: "50m", filename: "ne_50m_admin_0_map_units.json" },
  { precision: "10m", filename: "ne_10m_admin_0_map_units.json" },
];

async function makeDir(dir: string) {
  try {
    await fs.mkdir(dir);
  } catch (e) {
    console.log("Directory exists", dir);
  }
}

const ALLOW_TYPES = ["Sovereign country", "Country"]; //, 'Geo unit', 'Dependency']
function filterMapUnit({ properties: { ISO_A2, TYPE, NAME } }: MapUnitFeature) {
  if (ALLOW_TYPES.includes(TYPE) && ISO_A2 !== "-99") {
    return true;
  }
  return false;
}

async function exportAll(srcDir: string, outDir: string, sources = SOURCES) {
  const mapUnits: { [key: string]: MapUnitData } = {};
  await makeDir(outDir);

  // go through all source collections
  for (const source of sources) {
    const precisionDir = path.join(outDir, source.precision);
    await makeDir(precisionDir);

    // read collection file
    const collection = await getMapUnitCollection(
      path.join(srcDir, source.filename)
    );

    // iterate map units
    for (const {
      properties: { ISO_A2, NAME, NAME_LONG },
      geometry,
      type,
    } of collection.features.filter(filterMapUnit)) {
      let iso = ISO_A2;

      // save metadata
      if (!mapUnits[iso]) {
        mapUnits[iso] = {
          name: NAME,
          nameLong: NAME_LONG,
          iso,
          precisions: {},
        };
      }

      // write country json
      const countryFilename = path.join(precisionDir, `${iso}.json`);
      // console.log('Writing', countryFilename, '...')
      await fs.writeFile(
        countryFilename,
        JSON.stringify({
          type,
          geometry,
        })
      );
      const st = await fs.stat(countryFilename);
      mapUnits[iso].precisions[source.precision] = st.size;
    }
  }

  // write metadata
  await makeDir(DEST_UNITS_FILE_DIR);
  const unitsDataFile = path.join(DEST_UNITS_FILE_DIR, "mapUnits.data.json");
  const mapUnitsList = Object.values(mapUnits);
  mapUnitsList.sort((a, b) => a.name.localeCompare(b.name));
  console.log(Object.keys(mapUnits));
  console.log("Writing", unitsDataFile, "...");
  await fs.writeFile(unitsDataFile, JSON.stringify(mapUnitsList, null, "  "));
}

exportAll(SRC_DIR, DEST_DIR);
