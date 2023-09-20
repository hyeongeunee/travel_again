//일정 테이블
import React from "react";
import ".././css/DateTable.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DateTableBody from "./DateTableBody";
export default function DateTable(){
   
    return(
        <div className="table-container">    
            <table>
                <thead>
                   <tr>
                        <th><CalendarMonthIcon sx={{fontSize:"13px"}}/> 날짜</th> 
                        <th><ApartmentIcon sx={{fontSize:"14px"}}/> 도시</th>
                        <th><TimeToLeaveIcon sx={{fontSize:"14px"}}/> 교통</th>
                         <th><PendingActionsIcon sx={{fontSize:"14px"}}/> 일정</th>
                   </tr>
                </thead>
                {/* 일정페이지 내용 */}
                <DateTableBody/>
            </table>
        </div>
    )
}