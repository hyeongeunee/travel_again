import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React from "react";

export default function PlanButtonAlert({ snackbarOpen, setSnackbarOpen }) {
  const handleSnackbarClose = (event, reason) => {
    if (reason !== "clickaway") setSnackbarOpen(false);
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
        <AlertTitle>Warning</AlertTitle>
        관광지와 날짜는 선택하셔야 합니다
      </MuiAlert>
    </Snackbar>
  );
}
