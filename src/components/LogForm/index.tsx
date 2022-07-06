// Imports
import React, { useState } from "react";
import constants from "utils/constants";
import { countryNames } from "utils/countryNames";
import AutoComplete from "components/AutoComplete";
import DropdownSelect from "components/DropdownSelect";
import DateTimePicker from "components/DateTimePicker";

// MUI
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Types
export interface ILogFormProps {}

// Style
const WIDTH = 300;

/**
 * LogForm
 */
const LogForm: React.FC<ILogFormProps> = () => {
  // Local State
  const roastNum = 999;
  const [country, setCountry] = useState<string | null>(null);
  const [region, setRegion] = useState<string>("");
  const [process, setProcess] = React.useState("");
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date());

  return (
    <Stack spacing={2}>
      {/* Roast # */}
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
      <DropdownSelect
        label="Process"
        width={WIDTH}
        value={process}
        setValue={setProcess}
        options={constants.log.options}
      />
      {/* Green Weight */}
      {/* Roasted Weight */}
      {/* First Crack Time */}
      {/* Cool Down */}
      {/* Vacuum Cool to 250 */}
    </Stack>
  );
};

export default LogForm;
