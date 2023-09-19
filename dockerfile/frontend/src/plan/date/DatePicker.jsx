import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../css/DatePicker.css";
import { eachDayOfInterval, format } from "date-fns";
import ko from "date-fns/locale/ko";

function DatePicker({ onDateChange, checkingSDate, checkingEDate, datesArray }) {
    const [state, setState] = useState([
        {
            startDate: null,
            endDate: null,
            key: "selection",
        },
    ]);

    // startDate와 endDate를 설정하고 각 날짜를 배열로 얻기 위한 함수
    function handleDateChange(item) {
        setState([item.selection]);
        const startDate = new Date(item.selection.startDate);
        const endDate = new Date(item.selection.endDate);
        checkingSDate(startDate);
        checkingEDate(endDate);

        // 시작일부터 종료일까지의 모든 날짜 배열 생성
        const datesArray = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        // 날짜 형식을 변경하거나 필요한 처리 수행
        const formattedDates = datesArray.map((date) => format(date, "yyyy-MM-dd EEEE", { locale: ko }));

        onDateChange(formattedDates);
    }

    return (
        <div>
            <DateRange
                className="calendar"
                locale={ko}
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                showDateDisplay={true}
                showSelectionPreview={true}
                months={1}
                direction="horizontal"
                rangeColors={["#3d91ff"]}
                showMonthAndYearPickers={false}
                format="yyyy-MM-dd"
                dateDisplayFormat={"yyyy.MM.dd"}
            />
        </div>
    );
}

export default DatePicker;
