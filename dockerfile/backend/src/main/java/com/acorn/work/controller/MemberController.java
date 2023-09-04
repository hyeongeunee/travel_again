package com.acorn.work.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.MemberDTO;
import com.acorn.work.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    /**
     * 회원가입
     * @param memberDTO
     * @return memberId
     */
    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody MemberDTO memberDTO){

        String memberNo = memberService.signup(memberDTO);
        Map<String,String> memberMap = new HashMap<>();
        memberMap.put("memberId",memberDTO.getMemberId());
        memberMap.put("memberNo",memberNo);
        return ResponseUtils.completed(memberMap);
    }

    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody MemberDTO memberDTO){
        String memberId = memberService.signIn(memberDTO);
        return ResponseUtils.completed(memberId);
    }


}
