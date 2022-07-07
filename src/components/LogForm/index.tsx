// Imports
import React, { useState } from "react";
import constants from "utils/constants";
import NumberInput from "components/NumberInput";
import { countryNames } from "utils/countryNames";
import AutoComplete from "components/AutoComplete";
import ToggleButton from "components/ToggleButton";
import DateTimePicker from "components/DateTimePicker";
import LogFormOptions from "components/LogFormOptions";
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Types
export interface ILogFormProps {}

// Style
const WIDTH = 300;

// TODO: Add validation hook
const formIsIncomplete = false;

// TODO: Fetch last roast data
const roastNum = 999;

/**
 * LogForm
 */
const LogForm: React.FC<ILogFormProps> = () => {
  // Local State
  const [region, setRegion] = useState<string>("");
  const [coolDown, setCoolDown] = useState<string>("");
  const [vacCool, setVacCool] = useState<boolean>(true);
  const [firstCrack, setFirstCrack] = useState<string>("");
  const [greenWeight, setGreenWeight] = useState<string>("");
  const [process, setProcess] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [importData, setImportData] = useState<boolean>(false);
  const [roastedWeight, setRoastedWeight] = useState<string>("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [geneCafeTime, setGeneCafeTime] = useState<boolean>(true);
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  // TODO: Handle submit to create a new roast
  const handleSubmit = () => {
    console.log({
      roastNum,
      region,
      process,
      coolDown,
      vacCool,
      firstCrack,
      greenWeight,
      country,
      roastedWeight,
      geneCafeTime,
      dateTime,
    });
  };

  return (
    <Stack spacing={3}>
      {/* Options Menu */}
      <Button
        size="small"
        variant="outlined"
        onClick={() => setOpenOptions((v) => !v)}
      >
        Options
      </Button>
      <LogFormOptions
        width={350}
        importData={importData}
        openOptions={openOptions}
        geneCafeTime={geneCafeTime}
        setImportData={setImportData}
        setOpenOptions={setOpenOptions}
        setGeneCafeTime={setGeneCafeTime}
      />

      {/* Roast Number */}
      <Typography variant="h4">Roast # {roastNum}</Typography>
      {/* Date & Time */}
      <DateTimePicker value={dateTime} setValue={setDateTime} />
      {/* Country */}
      <AutoComplete
        value={country}
        label={"Country"}
        setValue={setCountry}
        options={countryNames}
      />
      {/* Region */}
      {/* TODO: Use auto complete with free solo, reference past region inputs */}
      <TextField
        id="region"
        label="Region"
        value={region}
        variant="outlined"
        sx={{ width: WIDTH }}
        onChange={(e) =>
          e.target.value.length < 30 && setRegion(e.target.value)
        }
      />
      {/* Process */}
      <AutoComplete
        value={process}
        label={"Process"}
        setValue={setProcess}
        options={constants.log.options}
      />
      {/* Green Weight */}
      <NumberInput
        max={1000}
        width={WIDTH}
        adornment={"g"}
        value={greenWeight}
        adornmentPosition={"end"}
        setValue={setGreenWeight}
        label={"Green Coffee Weight"}
      />
      {/* Roasted Weight */}
      <NumberInput
        max={1000}
        width={WIDTH}
        adornment={"g"}
        value={roastedWeight}
        adornmentPosition={"end"}
        setValue={setRoastedWeight}
        label={"Roasted Coffee Weight"}
      />
      {/* First Crack Time */}
      <NumberInput
        max={1000}
        width={WIDTH}
        adornment={"min"}
        value={firstCrack}
        label={"First Crack"}
        setValue={setFirstCrack}
        adornmentPosition={"end"}
        placeholder="Gene Cafe Reading (0 - 30)"
      />
      {/* Cool Down */}
      <NumberInput
        max={1000}
        width={WIDTH}
        value={coolDown}
        adornment={"min"}
        label={"Cool Down"}
        setValue={setCoolDown}
        adornmentPosition={"end"}
        placeholder="Gene Cafe Reading (0 - 30)"
      />
      {/* Vacuum Cool to 250 */}
      <ToggleButton
        width={WIDTH}
        color="success"
        selected={vacCool}
        label={"Vacuum Cool to 250"}
        handleChange={() => setVacCool((v) => !v)}
      />
      {/* Submit form */}
      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit}
        sx={{ height: "70px" }}
        disabled={formIsIncomplete}
      >
        Create Log
      </Button>
    </Stack>
  );
};

export default LogForm;
