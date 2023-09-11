import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../../util/checkLoginStatus';
import './Main.css';

export default function Main() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const firstBoxWidth = isSmallScreen ? '100%' : '83.3333%';
    const secondBoxWidth = isSmallScreen ? '100%' : '16.6666%';

    // --------------------------- 버튼 눌렀을 때 로그인 유무 관련 로직입니다..

    // const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // 여기에서 로그인 상태 세션으로 확인
        // const isLoggedIn = checkLoggedIn();

        // if (isLoggedIn) {
        scrollToDesiredPosition();
        // } else {
        // navigate('/login');
        // }
    };

    // -------------------------------------------------------
    // useEffect(() => {
    //     // 페이지 로딩 시 로그인 상태를 확인하고 이동
    //     const isLoggedIn = checkLoggedIn();

    //     if (isLoggedIn) {
    //         scrollToDesiredPosition();
    //     }
    // }, []);

    const scrollToDesiredPosition = () => {
        window.scrollTo(0, 1530);
    };

    return (
        <div className="box-container">
            <Box
                className="first-box"
                sx={{
                    width: firstBoxWidth,
                }}
            >
                <img src="/10.gif" alt="a" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
            </Box>
            <Box
                className="second-box"
                sx={{
                    width: secondBoxWidth,
                }}
            >
                <h3 className="heading1">여행을 위한 계획</h3>
                <h2 className="heading2">TRAVEL AGAIN</h2>
                <Box component="form" onSubmit={handleSubmit}>
                    <Button
                        className="startBtn"
                        type="submit"
                        size="large"
                        variant="contained"
                        sx={{ mt: '3px', mb: '2px', mr: '10px' }}
                    >
                        시작하기
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
