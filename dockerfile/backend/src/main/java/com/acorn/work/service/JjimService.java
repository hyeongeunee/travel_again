package com.acorn.work.service;

import com.acorn.work.dto.JjimDTO;
import com.acorn.work.mapstruct.JjimMapper;
import com.acorn.work.repository.JjimRepository;
import com.acorn.work.repository.MemberRepository;
import com.acorn.work.repository.TourlistRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JjimService {
    private final JjimRepository jjimRepository;

    private final MemberRepository memberRepository;

    private final TourlistRepository tourlistRepository;

    private final HttpSession session;

    public void recommendTourlist (JjimDTO jjimDTO){
        jjimRepository.save(JjimMapper.INSTANCE.toEntity(jjimDTO));
    }

    public void recommendCancelTourlist(JjimDTO jjimDTO) {
        jjimRepository.delete(JjimMapper.INSTANCE.toEntity(jjimDTO));
    }

    // 아직 미완성
    public void addTourlist(String contentid){
        String memberId = (String) session.getAttribute("id");
        String memberNo = memberRepository.findByMemberId(memberId).getMemberNo();

    }

}
