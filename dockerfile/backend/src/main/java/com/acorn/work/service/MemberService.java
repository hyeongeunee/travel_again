package com.acorn.work.service;

import com.acorn.work.dto.MemberDTO;
import com.acorn.work.entity.MemberEntity;
import com.acorn.work.mapstruct.MemberMapper;
import com.acorn.work.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    public String signup(MemberDTO memberDTO) {
        memberRepository.save(MemberMapper.INSTANCE.toEntity(memberDTO));
        String memberNo = memberRepository.findByMemberId(memberDTO.getMemberId()).getMemberNo();
        return memberNo;
    }

    public String signIn(MemberDTO memberDTO) {
        MemberEntity memberEntityId = memberRepository.findByMemberId(memberDTO.getMemberId());
        MemberEntity memberEntityIdPwd = memberRepository.findByMemberIdAndPwd(memberDTO.getMemberId(), memberDTO.getPwd());

        if (memberEntityId == null){
            return "아이디가 없습니다";
        } else if (memberEntityIdPwd == null) {
            return "비밀번호가 틀렸습니다";
        } else {
            return memberEntityId.getMemberId();
        }

    }
}
