//지도 구현 테이블
import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BigMapItem from "../asset/BigMapItem";

export default function BigMap({ selectedItems, areaData, day }){
    return(
        <>
          <div className="map-header">
            <IconButton sx={{}} className="backBtn">
              <ArrowBackIosIcon sx={{ color: "#EEEEEE" }} />
            </IconButton>
            <p className="day_input" style={{margin:"0"}}>DAY 1</p>
            <IconButton sx={{}} className="forwardBtn">
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
