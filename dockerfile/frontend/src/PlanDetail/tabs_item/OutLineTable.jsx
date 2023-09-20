// 개요 테이블 컴포넌트
import React, { useEffect, useState } from 'react';
import TableCard from './TableCard';
import '../css/OutLineTable.css';
import { Box } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function OutLineTable({ day }) {
    const location = useLocation();
    // console.log(location);
    // console.log(selectedItems)
    const areaData = location.state ? location.state.areaData : null;
    const selectedItems = location.state ? location.state.selectedItems : null;
    const datesArray = location.state ? location.state.datesArray : null;

    //     const [data, setData] = useState([]);

    //     const fetchData = async () => {
    //         try {
    //         const response = await axios.get("#");
    //         setData(response.data); // 가져온 데이터를 state에 저장합니다.
    //         } catch (error) {
    //         console.error("데이터 가져오기 오류:", error);
    //         }
    //     };

    //   useEffect(() => {
    //     fetchData();
    //   }, []);
    // ...
    return (
        <Box sx={{ width: '100%' }}>
            {selectedItems.map((day, dayIndex) => (
                <>
                    <div className="table-head" key={dayIndex}>
                        <div className="dayblock">DAY {dayIndex + 1}</div>

                        <div className="day-loc-div">
                            <h4 className="day-text">{datesArray[dayIndex]}</h4>
                            <p className="loc-text">{areaData.korTitle}</p>
                        </div>
                    </div>
                    <TableCard day={day} key={dayIndex} />
                </>
            ))}
        </Box>
    );
}
