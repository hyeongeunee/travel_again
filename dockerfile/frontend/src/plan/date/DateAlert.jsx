import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useState, useEffect } from "react";

export default function DateAlert({ dateLength }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (dateLength > 5) {
            // dateLength가 5보다 큰 경우 Snackbar를 열린 상태로 설정
            setSnackbarOpen(true);
        } else {
            // dateLength가 5 이하인 경우 Snackbar를 닫힌 상태로 설정
            setSnackbarOpen(false);
        }
    }, [dateLength]);

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
            <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: "100%" }}>
                <AlertTitle>Warning</AlertTitle>
                선택한 날짜 범위는 5일을 초과할 수 없습니다.
            </MuiAlert>
        </Snackbar>
    );
}
