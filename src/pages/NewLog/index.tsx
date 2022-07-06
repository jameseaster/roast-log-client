// Imports
import React from "react";
import { style } from "./style";
import { INewLogProps } from "./types";
import LogForm from "components/LogForm";
// MUI Imports
import Container from "@mui/material/Container";

/**
 * NewLog Page
 */
const NewLog: React.FC<INewLogProps> = () => {
  return (
    <Container sx={style.container}>
      <LogForm />
    </Container>
  );
};

export default NewLog;
