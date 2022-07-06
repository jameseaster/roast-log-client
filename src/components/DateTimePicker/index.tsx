// Imports
import React from "react";
import { IDateTimeProps } from "./types";
// MUI
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

/**
 * DateTimePicker - renders mobile friendly pickers for date and time
 */
const DateTimePicker: React.FC<IDateTimeProps> = ({ value, setValue }) => {
  // Sets value on change
  const handleChange = (newValue: Date | null) => setValue(newValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Date"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
