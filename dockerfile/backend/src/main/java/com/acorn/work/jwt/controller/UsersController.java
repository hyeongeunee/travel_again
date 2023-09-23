package com.acorn.work.jwt.controller;


import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.MemberDTO;
import com.acorn.work.entity.MemberEntity;
import com.acorn.work.jwt.util.JwtUtil;
import com.acorn.work.mapstruct.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class UsersController {

    private final JwtUtil jwtUtil;
    //SecurityConfig 에서 Bean 으로 등록한 객체

    private final AuthenticationManager authManager;

    // userName, password 를 전달 받아서 유효한 정보이면 토큰을 응답하는 컨트롤러 메소드 (로그인 메소드)
    @PostMapping("/member/signin")
    public ResponseEntity auth(@RequestBody MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberMapper.INSTANCE.toEntity(memberDTO);
        System.out.println(memberEntity.getUsername() + " ||| " + memberEntity.getPassword());

            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(memberEntity.getUsername(),memberEntity.getPassword()));

//            e.printStackTrace();
//            throw new BizException("아디비번땡");

        String token = jwtUtil.generateToken(memberEntity.getMemberId());
        return ResponseUtils.completed(token);
    }

}