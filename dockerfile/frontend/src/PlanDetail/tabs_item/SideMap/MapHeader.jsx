import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import "../../css/MapHeader.css";

export default function MapHeader({itemLength, day, onDayPrev, onDayNext }) {
  

  useEffect(() => {
    if (day < 0) {
      onDayPrev();
    }
  }, [day, onDayPrev]);

  return (
    <div className="map-header">
      <IconButton className="backBtn" onClick={onDayPrev}>
        <ArrowBackIosIcon sx={{ color: "#EEEEEE" }} />
      </IconButton>
      DAY {day + 1}
      <IconButton className="forwardBtn" onClick={onDayNext}>
        <ArrowForwardIosIcon sx={{ color: "#EEEEEE" }} />
      </IconButton>
    </div>
  );
}
