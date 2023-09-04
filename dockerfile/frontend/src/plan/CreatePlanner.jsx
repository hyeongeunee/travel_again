import React, { useState } from 'react';
import './CreatePlanner.css';
import DatePicker from './DatePicker';
import Map from './Map';
import TourCard from './TourCard';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function CreatePlanner() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [expanded, setExpanded] = useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <div className="plan-header">
                {/* //TODO: Main 에서 어디 지역 관광지 선택했는지에 따라 kor, eng title 표기 + map 중심좌표 재설정 */}
                <p className="kor-title">대한민국 서울</p>
                <p className="eng-title">seoul</p>
            </div>
            <div className="PlannerContainer">
                <Grid container className="gridContainer">
                    <Grid item className="leftbar" xs={12} sm={2}>
                        <DatePicker
                            expanded={expanded}
                            handleChange={handleChange}
                            selectedItems={selectedItems}
                            setSelectedIndex={setSelectedIndex}
                            setSelectedItems={setSelectedItems}
                        />
                    </Grid>
                    <Grid item className="maparea" xs={12} sm={8}>
                        <Map selectedItems={selectedItems} />
                    </Grid>
                    <Grid item className="rightbar" xs={12} sm={2}>
                        <TourCard
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            selectedIndex={selectedIndex}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="planBtn">
                <Link to="/plan/detail">
                    <Button variant="contained" sx={{ backgroundColor: '#8181F7' }}>
                        일정 생성하기
                    </Button>
                    {/* //TODO: selectedItems를 detail 쪽으로 넘기기 + datePicker 에서 startDate, EndDate 도 같이 */}
                    {console.log(selectedItems)}
                </Link>
            </div>
        </>
    );
}

export default CreatePlanner;
