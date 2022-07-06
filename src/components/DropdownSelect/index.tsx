// Imports
import React from "react";
import { IDropdownSelectProps } from "./types";
// MUI
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

/**
 * DropdownSelect
 */
const DropdownSelect: React.FC<IDropdownSelectProps> = ({
  label,
  width,
  value,
  options,
  setValue,
}) => {
  const handleChange = (event: SelectChangeEvent) =>
    setValue(event.target.value as string);

  return (
    <FormControl fullWidth>
      <InputLabel id={`select-dropdown-${label}`}>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        id={`select-dropdown-${label}`}
        onChange={handleChange}
        labelId={`select-dropdown-${label}`}
        sx={{ width: width || 300 }}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownSelect;
