import { Grid, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../css/OutLineForm.css";
import OutLineTable from "./OutLineTable";
import  SideMapItem from "../asset/SideMapItem";

export default function OutLineForm() {
  return (
    <>
      <Grid container className="item-container">
        <Grid item className="table-container" xs={8}>
          <OutLineTable/>
        </Grid>
        <Grid
          item
          className="map-container"
          xs={3}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="map-header">
            <IconButton className="backBtn">
              <ArrowBackIosIcon sx={{ color: "#EEEEEE" }} />
            </IconButton>
            DAY 1
            <IconButton className="forwardBtn">
              <ArrowForwardIosIcon sx={{ color: "#EEEEEE" }} />
            </IconButton>
          </div>
            <SideMapItem />
          <div className="map-footer">
                <div class="number-list">
                    <p className="number-icon">1</p>
                    <p className="footer-text">강남역</p>
                </div>
            
          </div>
        </Grid>
      </Grid>
    </>
  );
}
