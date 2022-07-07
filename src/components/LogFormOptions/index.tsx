// Imports
import React from "react";
import { style } from "./style";
import Dialog from "components/Dialog";
import { ILogFormOptionsProps } from "./types";
import ToggleButton from "components/ToggleButton";
// MUI
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

/**
 * LogFormOptions - dialog window for log form options
 */
const LogFormOptions: React.FC<ILogFormOptionsProps> = ({
  width,
  importData,
  openOptions,
  geneCafeTime,
  setImportData,
  setOpenOptions,
  setGeneCafeTime,
}) => {
  // Event Handlers
  const handleGeneSwitchToggle = () => {
    setGeneCafeTime((v) => !v);
  };

  const handleImportData = () => {
    console.log("Import previous roast values");
  };

  const handleApplyGeneCafeTimeConversion = () => {
    console.log("Use gene cafe time conversion?", geneCafeTime);
  };

  const handleConfirmOptionChange = () => {
    if (geneCafeTime) handleApplyGeneCafeTimeConversion();
    if (importData) handleImportData();
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
        <ToggleButton
          color="success"
          width={width || 350}
          selected={importData}
          label={"Import Previous Roast Data"}
          handleChange={() => setImportData((v) => !v)}
        />
      </Stack>
    </Dialog>
  );
};

export default LogFormOptions;
