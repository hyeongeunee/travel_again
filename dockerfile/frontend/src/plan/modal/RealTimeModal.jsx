import { Modal, Paper, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import * as StompJs from "@stomp/stompjs";

const stompClient = new StompJs.Client({
  brokerURL: "ws://192.168.0.40:9000/gs-websocket",
});
const columns = [
  { id: "number", label: "번호" },
  { id: "word", label: "인기 단어" },
  { id: "rank", label: "순위 변동" },
  { id: "likes", label: "좋아요 수" },
];


function RealTimeModal({ isOpen, onClose }) {
  const [rows, setRows] = useState([]);

  const handleSubmit = async () => {
    const url = "http://192.168.0.40:9000/wordSearch/comp";
  
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
  }

  const showGreeting = (message) => {
    const row = JSON.parse(message);
    console.log("웹소켓으로 받은 메시지:", message);
    const newRows = row.map((item, index) =>
      createData(index + 1, item.word, item.no, item.cnt)
    );
    setRows(newRows);
  };

  useEffect(() => {
    stompClient.onConnect = (frame) => {
      console.log("Connected:", frame);
      stompClient.subscribe("/topic/message2", (message) => {
        showGreeting(JSON.parse(message.body).content);
      });
    };

    const connectWebSocket = () => {
      stompClient.activate();
    };

    const disconnectWebSocket = () => {
      stompClient.deactivate();
      console.log("Disconnected");
    };

    if (isOpen) {
      handleSubmit();
      connectWebSocket();
    } else {
      disconnectWebSocket();
    }
  }, [isOpen]);


  const createData = (number, word, rank, likes) => {
    return { number, word, rank, likes };
  };

  const tableCellStyle = {
    padding: "5px",
    height: "10px",
  };

  const textStyles = {
    red: {
      color: "red",
    },
    blue: {
      color: "blue",
    },
  };

  const renderRankCell = (column, row) => {
    if (column.id === "rank") {
      const text = row[column.id];
      if (text.includes("▲")) {
        return (
          <TableCell
            key={column.id}
            style={{ ...tableCellStyle, ...textStyles.red }}
          >
            {text}
          </TableCell>
        );
      } else if (text.includes("▼")) {
        return (
          <TableCell
            key={column.id}
            style={{ ...tableCellStyle, ...textStyles.blue }}
          >
            {text}
          </TableCell>
        );
      }
    }
    return (
      <TableCell key={column.id} style={tableCellStyle}>
        {row[column.id]}
      </TableCell>
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="real-modal">
        <div className="real-modal-content">
          <Paper
            sx={{
              width: "40%",
              maxHeight: "100vh",
              margin: "auto",
              position: "relative",
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
                    <TableRow key={rowIndex}>
                      {columns.map((column) => renderRankCell(column, row))}
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RealTimeModal;
