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
  form,
  clearForm,
  handleImportData,
}) => {
  return (
    <Container style={style.header}>
      {/* Roast Number */}
      <Typography variant="h4">
        Roast #{form?.roastNum && form.roastNum}
      </Typography>
      <Box>
        <Button
          variant="outlined"
          sx={{ textTransform: "none", mr: 1 }}
          onClick={handleImportData}
        >
          Import Previous
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={clearForm}
        >
          Clear
        </Button>
      </Box>
    </Container>
  );
};

export default LogFormHeader;