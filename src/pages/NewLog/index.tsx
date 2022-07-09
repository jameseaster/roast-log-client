// Imports
import React from "react";
import { style } from "./style";
import { INewLogProps } from "./types";
import LogForm from "components/LogForm";
import useLogForm from "hooks/useLogForm";
import LogFormHeader from "components/LogFormHeader";
// MUI Imports
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";

/**
 * NewLog Page
 */
const NewLog: React.FC<INewLogProps> = () => {
  // Hooks
  const {
    form,
    errors,
    clearForm,
    submitForm,
    updateForm,
    loadingPostReq,
    formIsIncomplete,
    handleImportData,
  } = useLogForm();

  return (
    <Container sx={style.container}>
      <Card sx={style.card}>
        <CardContent>
          <LogFormHeader
            form={form}
            clearForm={clearForm}
            handleImportData={handleImportData}
          />
          <LogForm
            form={form}
            errors={errors}
            submitForm={submitForm}
            updateForm={updateForm}
            loading={loadingPostReq}
            formIsIncomplete={formIsIncomplete}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewLog;
