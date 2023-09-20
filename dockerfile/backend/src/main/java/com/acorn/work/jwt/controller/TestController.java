package com.acorn.work.jwt.controller;

import com.acorn.work.jwt.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final JwtUtil util;
    /*
     *  test 로 발급되는 토큰을 https://jwt.io 에서 디코딩 해보기
     */
    @GetMapping("/hello/token/get/{userName}")
    public String helloToken(@PathVariable String userName) {

        String token=util.generateToken(userName);
        return token;
    }

    @GetMapping("/fortune")
    public String fortune() {

        return "lucky!";
    }

    @GetMapping("/auth")
    public String auth() {

        return "auth ok!";
    }

}