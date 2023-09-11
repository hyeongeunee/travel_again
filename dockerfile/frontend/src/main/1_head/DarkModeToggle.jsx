import React, { useState, useEffect } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../../atoms/DarkModeState';

export default function DarkModeToggleComponent() {
    // 로컬 스토리지에서 다크 모드 설정을 가져옵니다.
    const initialMode = () => {
        if (typeof window !== 'undefined') {
            const storedDarkMode = localStorage.getItem('darkMode');
            return storedDarkMode ? JSON.parse(storedDarkMode) : false;
        }
        return false; // 기본값으로 false 반환 (또는 원하는 기본값 설정)
    };

    const [isDarkMode, setIsDarkMode] = useState(initialMode);

    // Recoil을 사용하여 전역 다크 모드 상태를 업데이트합니다.
    const [globalDarkMode, setGlobalDarkMode] = useRecoilState(darkModeState);

    useEffect(() => {
        // 다크 모드 설정이 변경되면 로컬 스토리지에 저장하고 전역 다크 모드 상태를 업데이트합니다.
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        setGlobalDarkMode(isDarkMode);
    }, [isDarkMode, setGlobalDarkMode]);

    const buttonStyle = {
        position: 'absolute',
        top: '30px',
        right: '30px',
    };

    return (
        <div style={buttonStyle}>
            <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80} />
        </div>
    );
}
