import * as React from "react";
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
// import { yellow, green } from '@mui/material/colors';
import { Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // ------------ 나중에 서버랑 연결할 때 주석제거하기 ---------------------------
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.post("http://192.168.0.86:9000/member/signin", {
                memberId: data.get("id"),
                pwd: data.get("password"),
            });
            // 로그인이 성공한 경우, 세션에 로그인 정보 저장
            if (response.data) {
                localStorage.setItem("token", response.data.data);
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
                navigate("/");
            }
            console.log("서버 응답:", response.data);
            navigate("/");
        } catch (error) {
            console.error("오류:", error);
        }
    };

    //아이디 보내야함 플래너페이지, 아이디 대조
    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: "" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="id" label="아이디" name="id" autoFocus />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
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
                            />
                        </FormControl>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            로그인
                        </Button>
                        <Grid container alignContent={"center"} justifyContent={"center"}>
                            <Grid item>
                                <Link href="forgotPassword" variant="body2">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                            <Divider orientation="vertical" flexItem sx={{ ml: 2, mr: 2 }} />
                            <Grid item style={{ paddingRight: 30 }}>
                                <Link href="/signUp" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                        {/* <Grid container sx={{ mt: 3 }} justifyContent="space-between">
                            <Button type="submit" variant="contained">
                                구글 로그인
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: yellow[500] }}>
                                카카오 로그인
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: green[500] }}>
                                네이버 로그인
                            </Button>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
