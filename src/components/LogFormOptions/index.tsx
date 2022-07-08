// Imports
import React from "react";
import { style } from "./style";
import Dialog from "components/Dialog";
import { ILogFormOptionsProps } from "./types";
// MUI
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

/**
 * LogFormOptions - dialog window for log form options
 */
const LogFormOptions: React.FC<ILogFormOptionsProps> = ({
  openOptions,
  geneCafeTime,
  setOpenOptions,
  setGeneCafeTime,
  handleImportData,
}) => {
  // Event Handlers
  const handleGeneSwitchToggle = () => {
    setGeneCafeTime((v) => !v);
  };

  const handleApplyGeneCafeTimeConversion = () => {
    console.log("Use gene cafe time conversion?", geneCafeTime);
  };

  const handleConfirmOptionChange = () => {
    if (geneCafeTime) handleApplyGeneCafeTimeConversion();
    setOpenOptions((v) => !v);
  };

  const handleCancelOptionChange = () => {
    setOpenOptions((v) => !v);
  };

  return (
    <Dialog
      title={"Options"}
      open={openOptions}
      cancelText={"Cancel"}
      confirmText={"Apply"}
      handleCancel={handleCancelOptionChange}
      handleConfirm={handleConfirmOptionChange}
    >
      <Stack spacing={4} sx={style.stack}>
        {/* Toggle for to interperet time as Gene Cafe reading */}
        <FormGroup sx={style.formGroup}>
          <FormControlLabel
            labelPlacement="start"
            label="Gene Cafe Time"
            control={
              <Switch
                defaultChecked
                sx={style.switch}
                onChange={handleGeneSwitchToggle}
              />
            }
          />
        </FormGroup>
        {/* Import Previous Roast Data */}
        <Button onClick={handleImportData}>Import Previous Roast Data</Button>
      </Stack>
    </Dialog>
  );
};

export default LogFormOptions;
