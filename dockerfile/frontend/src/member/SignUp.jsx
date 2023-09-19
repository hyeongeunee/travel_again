import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
    overrides: {
        MuiInputBase: {
            input: {
                height: "32px",
            },
        },
    },
});

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const navigate = useNavigate();

    // 데이트피커에서 날짜가 선택될 때 호출되는 함수
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // ------------ 나중에 서버랑 연결할 때 주석제거하기 ---------------------------
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.post("http://localhost:9000/member/signup", {
                name: data.get("name"),
                memberId: data.get("id"),
                pwd: data.get("password"),
                email: data.get("email"),
                phone: data.get("phone"),
                birth: selectedDate,
                gender: data.get("row-radio-buttons-group"),
            });
            // 서버 응답 처리
            console.log("서버 응답:", response.data);
            if (response.data) {
                navigate("/signIn");
            }
        } catch (error) {
            // 오류 처리
            console.error("오류:", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    name="name"
                                    autoComplete="Name"
                                    size="small"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    autoComplete="id"
                                    name="id"
                                    required
                                    fullWidth
                                    id="id"
                                    label="아이디"
                                    size="small"
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    id="checkBtn"
                                    preventDefault
                                    sx={{ height: "100%" }}
                                >
                                    중복 확인
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth size="small">
                                    <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        name="password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth size="small">
                                    <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword2 ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    edge="end"
                                                >
                                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    size="small"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    size="small"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        mask={"____-__-__"}
                                        sx={{ width: "100%" }}
                                        id="birth"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="gender">성별</FormLabel>
                                    <RadioGroup row name="row-radio-buttons-group">
                                        <FormControlLabel value="m" control={<Radio />} label="남자" />
                                        <FormControlLabel value="f" control={<Radio />} label="여자" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
