import { atom } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const darkModeState = atom({
    key: "darkModeState",
    default: false,
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    background_color: "#292929",
    text_color: "#ffffff",
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
    background_color: "#ffffff",
    text_color: "#000000",
});
