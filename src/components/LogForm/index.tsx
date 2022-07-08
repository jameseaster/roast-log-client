// Imports
import React from "react";
import constants from "utils/constants";
import Backdrop from "components/Backdrop";
import NumberInput from "components/NumberInput";
import { countryNames } from "utils/countryNames";
import AutoComplete from "components/AutoComplete";
import ToggleButton from "components/ToggleButton";
import DateTimePicker from "components/DateTimePicker";
// Types
import { IFormState, IErrorState } from "hooks/useLogForm";
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Types
export interface ILogFormProps {
  form: IFormState;
  errors: IErrorState;
  loadingPostReq: boolean;
  submitForm: VoidFunction;
  formIsIncomplete: boolean;
  updateForm: (key: keyof IFormState) => (value: any) => void;
}

/**
 * LogForm
 */
const LogForm: React.FC<ILogFormProps> = ({
  form,
  errors,
  submitForm,
  updateForm,
  loadingPostReq,
  formIsIncomplete,
}) => {
  return (
    <>
      {/* Loading post request backdrop */}
      <Backdrop open={loadingPostReq} />
      <Stack spacing={3} sx={{ maxWidth: "650px" }}>
        {/* Date & Time */}
        <DateTimePicker
          value={form.dateTime}
          setValue={updateForm("dateTime")}
          errors={[errors.date, errors.time]}
        />
        {/* Country */}
        <AutoComplete
          label={"Country"}
          value={form.country}
          error={errors.country}
          options={countryNames}
          setValue={updateForm("country")}
        />
        {/* Region */}
        {/* TODO: Use auto complete with free solo, reference past region inputs */}
        <TextField
          id="region"
          label="Region"
          variant="outlined"
          value={form.region}
          error={errors.region}
          onChange={(e) =>
            e.target.value.length < 30 && updateForm("region")(e.target.value)
          }
        />
        {/* Process */}
        <AutoComplete
          label={"Process"}
          value={form.process}
          error={errors.process}
          options={constants.log.options}
          setValue={updateForm("process")}
        />
        {/* Green Weight */}
        <NumberInput
          intOnly
          max={1000}
          adornment={"g"}
          value={form.greenWeight}
          adornmentPosition={"end"}
          error={errors.greenWeight}
          label={"Green Coffee Weight"}
          setValue={updateForm("greenWeight")}
        />
        {/* Roasted Weight */}
        <NumberInput
          intOnly
          max={1000}
          adornment={"g"}
          adornmentPosition={"end"}
          value={form.roastedWeight}
          error={errors.roastedWeight}
          label={"Roasted Coffee Weight"}
          setValue={updateForm("roastedWeight")}
        />
        {/* First Crack Time */}
        <NumberInput
          max={1000}
          adornment={"min"}
          label={"First Crack"}
          value={form.firstCrack}
          error={errors.firstCrack}
          adornmentPosition={"end"}
          setValue={updateForm("firstCrack")}
          placeholder="Gene Cafe Reading (0.0 - 30.0)"
        />
        {/* Cool Down */}
        <NumberInput
          max={1000}
          adornment={"min"}
          label={"Cool Down"}
          value={form.coolDown}
          error={errors.coolDown}
          adornmentPosition={"end"}
          setValue={updateForm("coolDown")}
          placeholder="Gene Cafe Reading (0.0 - 30.0)"
        />
        {/* Vacuum Cool to 250 */}
        <ToggleButton
          color="success"
          selected={form.vacCool}
          label={"Vacuum Cool to 250"}
          handleChange={() => updateForm("vacCool")(!form.vacCool)}
        />
        {/* Submit form */}
        <Button
          size="large"
          variant="contained"
          onClick={submitForm}
          sx={{ height: "60px" }}
          disabled={formIsIncomplete}
        >
          Create Log
        </Button>
      </Stack>
    </>
  );
};

export default LogForm;
