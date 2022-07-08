// Imports
import React from "react";
import { IAutoCompleteProps } from "./types";
// MUI
import TextField from "@mui/material/TextField";
import {
  FilterOptionsState,
  createFilterOptions,
  Autocomplete as AutoCompleteMUI,
} from "@mui/material";

/**
 * AutoComplete
 */
const AutoComplete: React.FC<IAutoCompleteProps> = ({
  error,
  label,
  width,
  value,
  options,
  setValue,
  optionLimit,
}) => {
  const defaultFilterOptions = createFilterOptions<string>();

  // Allows for limiting filter options
  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => defaultFilterOptions(options, state).slice(0, optionLimit || 10);

  return (
    <div>
      <AutoCompleteMUI
        disablePortal
        value={value}
        sx={{ width }}
        options={options}
        id={`${label}-box`}
        filterOptions={filterOptions}
        onChange={(e, v) => setValue(v)}
        renderInput={(params) => (
          <TextField {...params} error={error} label={label} />
        )}
      />
    </div>
  );
};

export default AutoComplete;
