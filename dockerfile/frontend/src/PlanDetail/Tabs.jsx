import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Divider } from "@mui/material";
import { TabPanel } from "@mui/lab";

import DateTable from "./tabs_item/DateTable";
import BigMap from "./tabs_item/BigMap";
import OutLineForm from "./tabs_item/OutLineForm";

export default function Tabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="개요"
              value="1"
              sx={{ fontSize: "15px", fontWeight: "bold" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Tab
              label="일정표"
              value="2"
              sx={{ fontSize: "15px", fontWeight: "bold" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Tab
              label="지도"
              value="3"
              sx={{ fontSize: "15px", fontWeight: "bold" }}
            />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="1">
          <OutLineForm/>
        </TabPanel>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="2">
          <DateTable />
        </TabPanel>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="3">
          <BigMap/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
