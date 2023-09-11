import { atom } from 'recoil';

export const darkModeState = atom({
    key: 'darkModeState',
    default: false,
});

export const darkTheme = {
    background_color: '#292929',
    text_color: '#ffffff',
};

export const lightTheme = {
    background_color: '#ffffff',
    text_color: '#000000',
};
