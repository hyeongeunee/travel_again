package com.acorn.work.jwt.service;

import com.acorn.work.entity.MemberEntity;
import com.acorn.work.jwt.repository.UsersRepository;
import com.acorn.work.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final UsersRepository repo;

    private final MemberRepository memberRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //username 에 해당되는 회원정보를 DB 에서 실제로 얻어내서
        System.out.println("디테일서비스 : " + username);
        MemberEntity users=memberRepository.findByMemberId(username); //비밀번호는 암호화 되어서 저장되어 있어야 한다.
        System.out.println(users.getUsername() +"||||" + users.getPassword());
        //Spring Security User 객체를 생성해서 리턴해주면 된다.
        User user=new User(users.getUsername(), users.getPassword(), new ArrayList<>());
        //User 는  UserDetails 인터페이스를 구현한 클래스 이다.
        return user;
    }


}