package com.acorn.work.service;

import com.acorn.work.dto.MemberDTO;
import com.acorn.work.entity.MemberEntity;
import com.acorn.work.mapstruct.MemberMapper;
import com.acorn.work.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public String signup(MemberDTO memberDTO) {
        memberDTO.setPwd(passwordEncoder.encode(memberDTO.getPwd()));
        if (memberRepository.existsByMemberId(memberDTO.getMemberId())){
            return "아이디가 이미 존재합니다";
        }
        memberRepository.save(MemberMapper.INSTANCE.toEntity(memberDTO));
        String memberNo = memberRepository.findByMemberId(memberDTO.getMemberId()).getMemberNo();
        return memberNo;
    }

    public String signIn(MemberDTO memberDTO) {
//        memberDTO.setPwd(passwordEncoder.encode(memberDTO.getPwd()));
        System.out.println(memberDTO.toString());
        MemberEntity memberEntityId = memberRepository.findByMemberId(memberDTO.getMemberId());
        MemberEntity memberEntityIdPwd = memberRepository.findByMemberIdAndPwd(memberDTO.getMemberId(), memberDTO.getPwd());

        if (memberEntityId == null){
            return "login fail : 아이디가 없습니다";
        } else if (memberEntityIdPwd == null) {
            return "login fail : 비밀번호가 틀렸습니다";
        } else {
            return "login success id : " + memberEntityId.getMemberId();
        }

    }

    public Boolean checkId(String checkId) {
        return memberRepository.existsByMemberId(checkId);
    }
}
