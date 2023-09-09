import React, { useState } from "react";
import "./css/CreatePlanner.css";
import Map from "./Map";
import PlanCard from "./PlanCard";
import { Button, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DateAccordion from "./date/DateAccordion";
import DateAlert from "./date/DateAlert";
import DatePicker from "./date/DatePicker";
import axios from "axios";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import { DateRange } from "@mui/icons-material";
import RealTimeList from "./tourList/RealTimeList";
import RecommendRank from "./tourList/RecommendRank";

function CreatePlanner() {
  const [dateLength, setDateLength] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [datesArray, setDatesArray] = useState(0);
  const location = useLocation();
  //console.log(location);
  const areaData = location.state ? location.state.areaData : null;
  //날짜 시작일, 종료일 구하는 함수 => DatePicker

  const checkingSDate = (i) => {
    setStartDate(i);
  };
  const checkingEDate = (i) => {
    setEndDate(i);
  };

  const formattedStartDate = startDate
    ? format(startDate, "yyyy-MM-dd EEEE", { locale: ko })
    : "";
  const formattedEndDate = endDate
    ? format(endDate, "yyyy-MM-dd EEEE", { locale: ko })
    : "";

  const handleDateChange = (dateArray) => {
    setDateLength(dateArray.length);
    setDatesArray(dateArray);
  };

  const convertDay = (array) => {
    let obj = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        let arr = {};
        arr.contentid = array[i][j].contentid;
        arr.tourDay = i + 1;
        arr.tourSeq = j + 1;
        obj.push(arr);
      }
    }
    return obj;
  };

  const sendData = async () => {
    const arr = convertDay(selectedItems);
    try {
      const dataToSend = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        plannerTourlistDTOS: arr,
      };
      console.log(arr);
      console.log(JSON.stringify(arr));
      console.log(convertDay(selectedItems));
      const response = await axios.post(
        "http://localhost:9000/planner/insert",
        dataToSend
      );

      console.log("서버응답", response.data);
    } catch (error) {
      console.error("오류", error);
    }
  };
  console.log(datesArray);
  return (
    <>
      <div className="plan-header">
        <p className="kor-title">{areaData.korTitle}</p>
        <p className="eng-title">{areaData.engTitle}</p>
      </div>
      <div className="TestContainer">
        <Grid container className="gridContainer">
          <Grid item className="rightbar" xs={12} sm={2}>
            <DatePicker
              onDateChange={handleDateChange}
              checkingSDate={checkingSDate}
              checkingEDate={checkingEDate}
              datesArray={datesArray}
            />
          </Grid>
          <Grid
            item
            className="leftbar"
            xs={12}
            sm={2}
            style={{ padding: "0" }}
          >
            <h3>선택된 여행지</h3>
            <hr />
            <DateAccordion
              dateLength={dateLength}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              setSelectedIndex={setSelectedIndex}
            />
          </Grid>
          <DateAlert dateLength={dateLength} />

          <Grid item className="maparea" xs={12} sm={8}>
            <Map selectedItems={selectedItems} areaData={areaData} />
          </Grid>
        </Grid>
      </div>
      <div className="planBtn">
        <Link
          to={"/plan/detail"}
          state={{
            areaData: areaData,
            selectedItems: selectedItems,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            datesArray: datesArray,
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#8181F7" }}
            onClick={sendData}
          >
            일정 생성하기
          </Button>
        </Link>
      </div>
    </>
  );
}

export default CreatePlanner;
