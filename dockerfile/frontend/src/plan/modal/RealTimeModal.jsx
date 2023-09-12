import { Modal, Paper, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const columns = [
  { id: "number", label: "번호" },
  { id: "word", label: "인기 단어" },
  { id: "rank", label: "순위 변동" },
  { id: "likes", label: "좋아요 수" },
];

function createData(number, word, rank, likes) {
  return { number, word, rank, likes };
}

function RealTimeModal({ isOpen, onClose }) {
  const [rows, setRows] = useState([
    createData(1, "제주", "+" + 1, 30),
    createData(2, "독도", "", 27),
    createData(3, "부산", "+" + 1, 19),
    createData(4, "대구", "", 18),
    createData(5, "전주", "", 10),
  ]);

  const handleSubmit = async () => {
    const url = "http://192.168.0.42:9000/wordSearch/comp";

    try {
      const response = await axios.get(url, {});
      const newRows = response.data.data.map((item, index) =>
        createData(index + 1, item.word, item.no, item.cnt)
      );
      console.log("서버 응답:", response.data);
      setRows(newRows); // 데이터 업데이트
    } catch (error) {
      console.error("오류:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleSubmit(); // 모달이 열릴 때만 실행
    }
  }, [isOpen]);

  useEffect(() => {
    // 1초마다 자동으로 갱신 버튼 클릭
    const intervalId = setInterval(() => {
      handleSubmit();
    }, 10000);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval
    };
  }, []);

  const tableRowStyle = {
    height: "20px", // 로우 높이 조절
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "0px", // 원하는 상단 위치
    right: "413px", // 원하는 오른쪽 위치
  };

  const renewBtnStyle = {
    position: "absolute",
    top: "340px", // 원하는 상단 위치
    left: "453px", // 원하는 왼쪽 위치
  };

  const tableCellStyle = {
    padding: "5px", // 셀 패딩 조절
    height: "10px", // 셀 높이 조절
  };

  const blueText = {
    color: "blue", // 파란색 텍스트 스타일
  };

  const redText = {
    color: "red", // 빨간색 텍스트 스타일
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="real-modal">
        <div className="real-modal-content">
          <Paper
            sx={{
              width: "40%", // 테이블 너비 조절
              maxHeight: "100vh", // 테이블 높이 조절 (예: 70% 화면 높이)
              margin: "auto",
              position: "relative", // 부모 요소에 대해 상대 위치 설정
            }}
          >
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.id} style={tableCellStyle}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} style={tableRowStyle}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{
                            ...tableCellStyle,
                            ...(column.id === "rank" &&
                              row[column.id].includes("▲") && // 조건 검사
                              redText), // 파란색 스타일 추가
                            ...(column.id === "rank" &&
                              row[column.id].includes("▼") && // 조건 검사
                              blueText), // 파란색 스타일 추가
                          }}
                        >
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
          <button onClick={onClose} style={closeBtnStyle}>
            <CloseIcon />
          </button>
          <button onClick={handleSubmit} style={renewBtnStyle}>
            갱신
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RealTimeModal;
