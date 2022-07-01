export const style = {
  tabContainer: {
    borderBottom: 1,
    borderColor: "gray", // TODO: add to theme
    boxShadow: "0px 4px 6px -6px #222", // TODO: add to theme
    MozBoxShadow: "0 4px 6px -6px #222", // TODO: add to theme
    WebkitBoxShadow: "0 4px 6px -6px #222", // TODO: add to theme
  },
  tabs: {
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .indicator-div": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: "primary.main",
    },
  },
};
