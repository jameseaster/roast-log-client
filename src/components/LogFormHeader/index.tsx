// Imports
import React from "react";
import { style } from "./style";
import { ILogFormHeaderProps } from "./types";
// MUI Imports
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import Typography from "@mui/material/Typography";

/**
 * LogFormHeader
 */
const LogFormHeader: React.FC<ILogFormHeaderProps> = ({
  clearForm,
  roastNumber,
  handleImportData,
}) => {
  return (
    <Container style={style.header}>
      {/* Roast Number */}
      <Typography variant="h4">Roast #{roastNumber}</Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={handleImportData}
          disabled={roastNumber === 1}
          sx={{ textTransform: "none", mr: 1 }}
        >
          Import Previous
        </Button>
        <Button
          variant="outlined"
          onClick={clearForm}
          sx={{ textTransform: "none" }}
        >
          Clear
        </Button>
      </Box>
    </Container>
  );
};

export default LogFormHeader;
