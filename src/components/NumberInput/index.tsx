// Imports
import React, { useState } from "react";
import { INumberInputProps } from "./types";
// MUI
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

/**
 * NumberInput
 */
const NumberInput: React.FC<INumberInputProps> = ({
  max,
  label,
  value,
  width,
  error,
  intOnly,
  setValue,
  adornment,
  placeholder,
  adornmentPosition,
}) => {
  // Local State
  const [validationError, setValidationError] = useState<string>("");

  /**
   * Handles change for number values only
   */
  const handleChange = (valueStr: string) => {
    // Counts how many decimals are typed into value string
    const decCount = (valueStr.match(/\./g) || []).length;
    // Turns string into float to compare to max
    const valueNum = parseFloat(valueStr);
    // Does not allow decimal numbers if intOnly is true
    if (intOnly && decCount) return;
    // Only allows one decimal to be typed into input string
    if (decCount > 1) return;
    // Prevents multiple zeros before the decimal
    if (valueStr[0] === "0" && valueStr[1] === "0")
      valueStr = valueStr.slice(1);
    // If string starts with "0" and is not < 1, remove the zero
    if (valueStr[0] === "0" && valueNum >= 1) valueStr = valueStr.slice(1);
    // If string starts with decimal, add a "0" to the beginning
    if (valueStr[0] === ".") valueStr = "0" + valueStr;
    // If value string is empty, replace with "0"
    if (valueStr === "") {
      setValidationError("");
      return setValue("0");
    }
    // If value string is a number, check error with max & set value
    if (!isNaN(Number(valueStr))) {
      setValidationError(
        valueNum > max ? `Value must be between 0 - ${max}` : ""
      );
      setValue(valueStr.trim());
    }
    // Set error to decimal places after hundredths
    if (decCount === 1) {
      if (
        valueStr[valueStr.length - 1] !== "." &&
        valueStr[valueStr.length - 2] !== "." &&
        valueStr[valueStr.length - 3] !== "."
      ) {
        setValidationError("Only two decimal places are allow");
      }
    }
  };

  /**
   * Returns input props in relation to adornment position
   */
  const getInputProps = () => {
    if (adornmentPosition === "end") {
      return {
        endAdornment: (
          <InputAdornment position={adornmentPosition}>
            {adornment}
          </InputAdornment>
        ),
      };
    } else if (adornmentPosition === "start") {
      return {
        startAdornment: (
          <InputAdornment position={adornmentPosition}>
            {adornment}
          </InputAdornment>
        ),
      };
    }
  };

  return (
    <TextField
      value={value}
      label={label}
      sx={{ width }}
      helperText={validationError}
      id="input-with-adornment"
      InputProps={getInputProps()}
      placeholder={placeholder || ""}
      error={!!validationError.length || error}
      onChange={({ target }) => handleChange(target.value)}
    />
  );
};

export default NumberInput;
