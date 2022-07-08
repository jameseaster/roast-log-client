// Imports
import React from "react";
import { IDateTimeProps } from "./types";
// MUI
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

/**
 * DateTimePicker - renders mobile friendly pickers for date and time
 */
const DateTimePicker: React.FC<IDateTimeProps> = ({
  value,
  errors,
  setValue,
}) => {
  // Sets value on change
  const handleChange = (newValue: Date | null) => setValue(newValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Date"
          value={value}
          onChange={handleChange}
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} error={errors[0]} />}
        />
        <MobileTimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} error={errors[1]} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
