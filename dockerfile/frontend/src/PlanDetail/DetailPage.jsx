// 플래너 디테일 페이지
import { Grid } from "@mui/material";
import React from "react";
import "./css/DetailPage.css";
import Tabs from "./Tabs";
import { useLocation } from "react-router-dom";

export default function DetailPage() {
  // 로컬 데이터 필요
  const location = useLocation();
    // console.log(location);
    // console.log(selectedItems)
  const areaData = location.state ? location.state.areaData : null;
  const selectedItems = location.state ? location.state.selectedItems : null;
 
  // 필요 목록 title, locImage, location, date, day
  return (
    <div className="detail-page-container">
      <Grid item className="image-container" sx={{ margin: "auto" }}>
        <p className="font-kor" style={{ zIndex: "1" }}>
          {/* korTitle */}
          {areaData.korTitle}
        </p>
        <p className="font-eng" style={{ zIndex: "1" }}>
          {/* engTitle */}
          {areaData.engTitle}
        </p>
        <img
          className="img"
          src={areaData.locimages}
          alt="seoul"
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>

      <Grid container className="categori">
        {/*Tabs 에서  사용하는 컴포넌트가 몇줄 없어서 가져올지 생각중*/}
        <Tabs />
      </Grid>
    </div>
  );
}
