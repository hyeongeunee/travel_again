import React from "react";
import TableCard from "./TableCard";
import "../css/OutLineTable.css"
import { Box } from "@mui/material";

export default  function OutLineTable(){
    return(
       <Box sx={{width:"100%"}}>
            <div className="table-head">
                <div className="dayblock">DAY1</div>
                <div className="day-loc-div">
                    <h4 className="day-text">2023.08.25(금)</h4>
                    <p className="loc-text">에이콘</p>
                </div>
            </div>
            <TableCard/>
            <TableCard/>
        </Box> 
    )
}