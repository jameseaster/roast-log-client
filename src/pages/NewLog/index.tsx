// Imports
import React from "react";
import { style } from "./style";
import { INewLogProps } from "./types";
import LogForm from "components/LogForm";
import useLogForm from "hooks/useLogForm";
import { useSelector } from "react-redux";
import LogFormHeader from "components/LogFormHeader";
import { getAppState } from "state/redux/slices/app";
import useCreateRoastStatus from "hooks/useCreateRoastStatus";
// MUI Imports
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";

/**
 * NewLog Page
 */
const NewLog: React.FC<INewLogProps> = () => {
  // Global State
  const { createRoastStatus } = useSelector(getAppState);

  // Form Data & Functions
  const {
    form,
    errors,
    clearForm,
    submitForm,
    updateForm,
    formIsIncomplete,
    handleImportData,
  } = useLogForm();

  // Creates snack updates for creating roast status
  useCreateRoastStatus(clearForm);

  return (
    <Container sx={style.container}>
      <Card sx={style.card}>
        <CardContent>
          <LogFormHeader
            clearForm={clearForm}
            handleImportData={handleImportData}
          />
          <LogForm
            form={form}
            errors={errors}
            submitForm={submitForm}
            updateForm={updateForm}
            formIsIncomplete={formIsIncomplete}
            loading={createRoastStatus !== null}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewLog;
