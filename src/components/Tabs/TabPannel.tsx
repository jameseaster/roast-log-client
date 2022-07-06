// Imports
import Box from "@mui/material/Box";

// Types
interface TabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

/**
 * TabPanel - used in Tabs component
 */
const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;