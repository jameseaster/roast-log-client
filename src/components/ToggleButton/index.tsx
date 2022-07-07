// Imports
import React from "react";
import { style } from "./style";
import { IToggleButtonProps } from "./types";
// MUI
import Container from "@mui/material/Container";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import { ToggleButton as ToggleButtonMUI } from "@mui/material";

/**
 * ToggleButton - Toggle button with label for form
 */
const ToggleButton: React.FC<IToggleButtonProps> = ({
  color,
  label,
  width,
  selected,
  handleChange,
}) => {
  return (
    <Container sx={{ ...style.container, width: width || 300 }}>
      <Typography>{label}</Typography>
      <ToggleButtonMUI
        value="check"
        color={color}
        selected={selected}
        sx={style.toggleBtn}
        onChange={handleChange}
      >
        <CheckIcon sx={{ color: selected ? "" : "transparent" }} />
      </ToggleButtonMUI>
    </Container>
  );
};

export default ToggleButton;
