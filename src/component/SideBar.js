import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function SideBar({ onPageSelect }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        position: "fixed",
        top: "60px",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="TOP 50" onClick={() => onPageSelect(0)} />
        <Tab label="SEARCH" onClick={() => onPageSelect(1)} />
        <Tab label="MUSIC VIDEO" onClick={() => onPageSelect(2)} />
        <Tab label="RECOMEND" onClick={() => onPageSelect(3)} />
        <Tab label="FAVORITE" onClick={() => onPageSelect(4)} />
      </Tabs>
    </Box>
  );
}
