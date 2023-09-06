import React, { useState } from 'react';
import './css/CreatePlanner.css';
import DatePicker from './DatePicker';
import Map from './Map';
import PlanCard from './PlanCard';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DateAccordion from './DateAccordion';
import DateAlert from './DateAlert';
import axios from 'axios';

function Test() {
    const [dateLength, setDateLength] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    //날짜 시작일, 종료일 구하는 함수 => DatePicker
    const checkingSDate = (i) => {
        return i
    }
    const checkingEDate = (i) => {
        return i
    }

    const handleDateChange = (dateArray) => {
        setDateLength(dateArray.length);
      };

      const convertDay = (array) => {

        let obj = [];
        for (let i = 0; i < array.length; i++) {
    
            for (let j = 0; j < array[i].length; j++) {
                let arr = [];
                arr.contentid = array[i][j].contentid
                arr.tourDay = i+1
                arr.tourSeq = j+1
                obj.push(arr);   
            }
        }
        return obj
    }  
    
    const sendData = async () => {
        try{
            const dataToSend = {
                checkingSDate: checkingSDate(),
                checkingEDate: checkingEDate(),
                convertDayData: convertDay(selectedItems)
            };

            const response = await axios.post("#", dataToSend)

            console.log("서버응답", response.data)
        } catch (error) {
            console.error("오류", error)
        }
    }
    return (
        <>
            <div className="plan-header">
                <p className="kor-title">대한민국 서울</p>
                <p className="eng-title">seoul</p>
            </div>
            <div className="TestContainer">
                <Grid container className="gridContainer">
                    <Grid item className="leftbar" xs={12} sm={2} >
                        <DatePicker onDateChange={handleDateChange}  checkingSDate={checkingSDate} checkingEDate={checkingEDate}/>
                        <DateAccordion dateLength={dateLength} setSelectedItems={setSelectedItems} selectedItems={selectedItems} setSelectedIndex={setSelectedIndex}/>
                        <DateAlert dateLength={dateLength}/>
                    </Grid>
                    <Grid item className="maparea" xs={12} sm={8}>
                         <Map selectedItems={selectedItems} />
                    </Grid>
                    <Grid item className="rightbar" xs={12} sm={2}>
                        <PlanCard setSelectedItems={setSelectedItems} selectedItems={selectedItems} selectedIndex={selectedIndex}/>
                    </Grid>
                </Grid>
            </div>
            <div className="planBtn">
                <Link to="/plan/detail">
                    <Button variant="contained" sx={{ backgroundColor: '#8181F7' }}onClick={sendData}>
                        일정 생성하기
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Test;