import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './member/SignIn';
import SignUp from './member/SignUp';
import CreatePlanner from './plan/CreatePlanner';
import App from './App';
import DetailPage from './PlanDetail/DetailPage';

export default function RouteApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/plan" element={<CreatePlanner />} />
                <Route path="plan/detail" element={<DetailPage />} />
            </Routes>
        </Router>
    );
}