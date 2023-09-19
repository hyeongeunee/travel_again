import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./member/SignIn";
import SignUp from "./member/SignUp";
import CreatePlanner from "./plan/CreatePlanner";
import App from "./App";
import DetailPage from "./PlanDetail/DetailPage";
import ScrollToTop from "./util/ScrollTop";
import { RecoilRoot, useRecoilValue } from "recoil";
import { darkModeState, darkTheme, lightTheme } from "./atoms/DarkModeState";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";


export default function RouteApp() {
    const isDarkMode = useRecoilValue(darkModeState);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const containerStyle = {
        backgroundColor: theme.background_color,
        color: theme.text_color,
        transitionProperty: "background-color, color",
        transitionDuration: "1.5s",
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div style={containerStyle}>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/plan" element={<CreatePlanner />} />
                        <Route path="plan/detail" element={<DetailPage />} />
                    </Routes>
                    <ScrollToTop />
                </div>
            </Router>
        </ThemeProvider>
    );
}
