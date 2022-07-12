// Imports
import React from "react";
import { ITabs } from "./types";
import { style } from "./style";
import TabPanel from "./TabPannel";
import useRequestRoasts from "hooks/useRequestRoasts";
// MUI
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Tabs as TabsMUI } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Tabs - Bar to navigate between pages
 */
const Tabs: React.FC<ITabs> = ({ pages }) => {
  // Local State
  const [value, setValue] = React.useState(0);
  // Hooks
  const isNotSmall = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  // Event handler
  const handleChange = (i: number) => setValue(i);
  // Request roast data when user signs in
  useRequestRoasts();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={style.tabContainer}>
        <TabsMUI
          centered
          value={value}
          indicatorColor="secondary"
          aria-label="basic tabs example"
          sx={isNotSmall ? style.tabs : {}}
          onChange={(e, i) => handleChange(i)}
          variant={isNotSmall ? "standard" : "fullWidth"}
          TabIndicatorProps={{ children: <div className="indicator-div" /> }}
        >
          {pages.map(({ tabTitle }, idx) => (
            <Tab
              key={idx}
              disableRipple
              label={tabTitle}
              sx={{ width: "30%" }}
              id={`simple-tab-${idx}`}
              aria-controls={`simple-tabpanel-${idx}`}
            />
          ))}
        </TabsMUI>
      </Box>
      {pages.map(({ renderPage }, idx) => (
        <TabPanel value={value} key={idx} index={idx}>
          {renderPage()}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
