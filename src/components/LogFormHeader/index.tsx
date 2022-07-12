// Imports
import React from "react";
import { style } from "./style";
import { useSelector } from "react-redux";
import { ILogFormHeaderProps } from "./types";
import { getRoastNumber } from "state/redux/slices/app";
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
  handleImportData,
}) => {
  const { nextRoastNumber } = useSelector(getRoastNumber);

  return (
    <Container style={style.header}>
      {/* Roast Number */}
      <Typography variant="h4">Roast #{nextRoastNumber}</Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={handleImportData}
          disabled={nextRoastNumber === 1}
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
