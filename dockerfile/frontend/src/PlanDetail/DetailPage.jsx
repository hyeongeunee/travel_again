import { Grid } from "@mui/material";
import React from "react";
import "./css/DetailPage.css";
import Tabs from "./Tabs";


export default function DetailPage() {
  return (
    <div className="detail-page-container">
      <Grid item className="image-container" sx={{ margin: "auto" }}>
        <p className="font-kor" style={{ zIndex: "1" }}>
          대한민국 서울
        </p>
        <p className="font-eng" style={{ zIndex: "1" }}>
          SEOUL
        </p>
        <img
          className="img"
          src="/locimages/seoul.jpg"
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
