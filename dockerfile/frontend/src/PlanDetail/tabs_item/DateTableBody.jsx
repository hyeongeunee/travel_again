import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

export default function DateTableBody() {
  const location = useLocation();
  const areaData = location.state ? location.state.areaData : null;
  const selectedItems = location.state ? location.state.selectedItems : null;
  const datesArray = location.state ? location.state.datesArray : null;

  // datesArray에서 월, 일, 요일 정보 추출
  const formattedDates = datesArray.map((date) => {
    const parts = date.split("-");
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Date 객체를 생성하여 요일 정보 얻기
    const dateObject = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1
    const dayOfWeek = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"][
      dateObject.getDay()
    ];

    return `${month}월 ${day}일 ${dayOfWeek}`;
  });

  return (
    <tbody>
      {selectedItems.map((day, dayIndex) => (
        <tr key={dayIndex}>
          <td>
            <p className="date-text">{formattedDates[dayIndex]}</p>
            <p className="date-text-day">DAY{dayIndex + 1}</p>
          </td>
          <td>
            <ul className="circle-ul">
              <li>{areaData.korTitle}</li>
              <li>{areaData.engTitle}</li>
            </ul>
          </td>
          <td></td>
          <td>
            <ul className="number-ul">
              {day.map((item, itemIndex) => (
                <li key={itemIndex}>{item.title}</li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
