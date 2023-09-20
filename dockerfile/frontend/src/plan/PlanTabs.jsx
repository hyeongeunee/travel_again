import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Divider, Tabs } from "@mui/material";
import { TabPanel } from "@mui/lab";
import LikeList from "./tourList/LikeList";
import RealTimeList from "./tourList/RealTimeList";
import NameList from "./tourList/NameList";
export default function PlanTabs({
  selectedItems,
  setSelectedItems,
  selectedIndex,
  areaData,
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              label="실시간"
              value="1"
              sx={{ fontSize: "15px", fontWeight: "bold", width: "10%" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Tab
              label="좋아요"
              value="2"
              sx={{ fontSize: "15px", fontWeight: "bold" }}
            />
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Tab
              label="이름순"
              value="3"
              sx={{ fontSize: "15px", fontWeight: "bold" }}
            />
          </Tabs>
        </Box>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="1">
          <LikeList
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectedIndex={selectedIndex}
            areaData={areaData}
          />
        </TabPanel>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="2">
          <NameList
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectedIndex={selectedIndex}
            areaData={areaData}
          />
        </TabPanel>
        <TabPanel sx={{ padding: "0px", marginTop: "20px" }} value="3">
          <RealTimeList
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectedIndex={selectedIndex}
            areaData={areaData}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
