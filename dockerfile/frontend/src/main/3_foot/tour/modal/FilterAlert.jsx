import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function FilterAlert({ open, onClose }) {
  // open과 onClose prop을 받아서 상태 및 이벤트 핸들러를 설정합니다.
  const [snackbarOpen, setSnackbarOpen] = useState(open);

  useEffect(() => {
    // open prop의 변경을 감지하고, 변경되면 상태를 업데이트합니다.
    setSnackbarOpen(open);
  }, [open]);

  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
      onClose(); // Snackbar가 닫힐 때 onClose 이벤트 핸들러를 호출합니다.
    }
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleSnackbarClose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        <AlertTitle>삐빅</AlertTitle>
        개발 단계 입니다
      </MuiAlert>
    </Snackbar>
  );
}
