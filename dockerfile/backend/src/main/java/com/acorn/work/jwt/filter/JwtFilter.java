package com.acorn.work.jwt.filter;

import com.acorn.work.jwt.service.CustomUserDetailsService;
import com.acorn.work.jwt.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
 *  요청할때 한번 토큰 검사를 하는 필터 클래스 정의하기
 *
 *  1. OncePerRequestFilter 추상클래스 상속 받는다.
 *  2. doFilterInternal() 메소드를 재정의 해서 필터의 동작을 정의한다.
 */

@Component
public class JwtFilter extends OncePerRequestFilter{
//    //JwtUtil 객체 주입 받기
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CustomUserDetailsService userDetailsServiceservice;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //클라이언트가 요청 Header 에 담은 정보를 얻어낸다.
        String authHeader=request.getHeader("Authorization");

        String token=null;
        String userName=null;
        // 인증해더가 존재하고 해당 문자열이 Bearer 로 시작 하는지 확인해서
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            //앞에 "Bearer " 를 제외한 순수 토큰 문자열 얻어내기
            token=authHeader.substring(7);
            //유틸을 이용해서 토큰에 저장된 userName (subject) 를 얻어낸다
            userName=jwtUtil.extractUsername(token);
        }
        //userName 이 존재하고  Spring Security 에서 아직 인증을 받지 않은 상태라면
        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //읽어낸 userName 을 이용해서  UserDetails 객체를 얻어낸다
            UserDetails userDetails=userDetailsServiceservice.loadUserByUsername(userName);
            //token 이 유효한 토큰인지 유틸을 이용해서 알아낸다
            boolean isValid = jwtUtil.validateToken(token, userDetails);
            if(isValid) {
                System.out.println("인증성공");
                //사용자가 제출한 사용자 이름과 비밀번호와 같은 인증 자격 증명을 저장
                UsernamePasswordAuthenticationToken authToken=
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //보안 컨텍스트 업데이트
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        //다음 필터 chain 진행하기
        filterChain.doFilter(request, response);
    }

}