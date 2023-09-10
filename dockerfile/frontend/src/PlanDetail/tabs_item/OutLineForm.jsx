//개요페이지
import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideMapItem from "../asset/SideMapItem";
import "../css/OutLineForm.css";
import OutLineTable from "./OutLineTable";
import { useLocation } from "react-router-dom";
import MapContent from "./SideMap/MapContent";
import MapHeader from "./SideMap/MapHeader";

export default function OutLineForm() {
  const location = useLocation();
  const areaData = location.state ? location.state.areaData : null;
  const selectedItems = location.state ? location.state.selectedItems : null;

  const [day, setDay] = useState(0);
  const itemLength = selectedItems ? selectedItems.length : 0;

  const handleDayNext = () => {
    setDay((prevDay) => Math.min(prevDay + 1, itemLength - 1));
  };

  const handleDayPrev = () => {
    setDay((prevDay) => Math.max(prevDay - 1, 0));
  };

  // 백 데이터 필요
  // const [data, setData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("#");
  //     setData(response.data); // 가져온 데이터를 state에 저장합니다.
  //   } catch (error) {
  //     console.error("데이터 가져오기 오류:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <Grid container className="item-container">
        {" "}
        {/* 각 Grid에 고유한 key 부여 */}
        <Grid item className="table-container" xs={8}>
          {/* 개요 테이블 컴포넌트 */}
          <OutLineTable />
        </Grid>
        {/* 개요페이지 지도 */}
        <Grid
          item
          className="map-container"
          xs={3}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <MapHeader
            itemLength={itemLength}
            day={day}
            onDayNext={handleDayNext}
            onDayPrev={handleDayPrev}
          />
          <SideMapItem 
            selectedItems={selectedItems} 
            day={day}
            areaData={areaData} />
          <MapContent 
            day={day} 
            selectedItems={selectedItems} 
            areaData={areaData}/>
        </Grid>
      </Grid>
    </>
  );
}
