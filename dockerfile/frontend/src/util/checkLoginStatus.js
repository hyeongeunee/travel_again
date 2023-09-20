// 사용자가 로그인한 경우
export function setLoggedIn() {
    localStorage.setItem("isLoggedIn", "true");
}

// 사용자가 로그아웃한 경우
export function setLoggedOut() {
    localStorage.removeItem("isLoggedIn");
}

// 로그인 상태 확인 함수
export function checkLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}
