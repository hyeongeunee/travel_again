//지도 구현 테이블
import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BigMapItem from "../asset/BigMapItem";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BigMap(){
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
    return(
        <>
          <div className="map-header">
            <IconButton sx={{}} className="backBtn" onClick={handleDayPrev}>
              <ArrowBackIosIcon sx={{ color: "#EEEEEE" }} />
            </IconButton>
            <p className="day_input" style={{margin:"0"}}>DAY{day+1}</p>
            <IconButton sx={{}} className="forwardBtn"onClick={handleDayNext}>
              <ArrowForwardIosIcon sx={{ color: "#EEEEEE" }} />
            </IconButton>
        </div>
        <div>
          {/* 지도 */}
          <BigMapItem 
            selectedItems={selectedItems} 
            day={day}
            areaData={areaData}/>
        </div>
      </>
    )
}
