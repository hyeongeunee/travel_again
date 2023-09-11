import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './member/SignIn';
import SignUp from './member/SignUp';
import CreatePlanner from './plan/CreatePlanner';
import App from './App';
import DetailPage from './PlanDetail/DetailPage';
import ScrollToTop from './util/ScrollTop';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { darkModeState, darkTheme, lightTheme } from './atoms/DarkModeState';

export default function RouteApp() {
    const isDarkMode = useRecoilValue(darkModeState);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const containerStyle = {
        backgroundColor: theme.background_color,
        color: theme.text_color,
    };

    return (
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
    );
}
