import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

export default function Main() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const firstBoxWidth = isSmallScreen ? '100%' : '83.3333%';
    const secondBoxWidth = isSmallScreen ? '100%' : '16.6666%';

    return (
        <div className="box-container">
            <Box
                className="first-box"
                sx={{
                    width: firstBoxWidth,
                }}
            >
                <img
                    src="/10.gif"
                    alt="a"
                    style={{ width: '100%', height: '100%' }}
                />
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
                    <Link to="/signIn">
                        <Button
                        className='startBtn'
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mt: '3px', mb: '2px', mr: '10px' }}
                        >
                            시작하기
                        </Button>
                    </Link>
                </Box>
            </Box>
        </div>
    );
}