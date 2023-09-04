package com.acorn.work.service;

import com.acorn.work.dto.JjimDTO;
import com.acorn.work.dto.MemberDTO;
import com.acorn.work.mapstruct.JjimMapper;
import com.acorn.work.mapstruct.MemberMapper;
import com.acorn.work.repository.JjimRepository;
import com.acorn.work.repository.MemberRepository;
import com.acorn.work.repository.TourlistRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

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

    public void randomRecommendTourlist (String contentid){
        //        String memberId = (String) session.getAttribute("id");
        //        String memberNo = memberRepository.findByMemberId(memberId).getMemberNo();
        System.out.println(contentid);

        // 랜덤 테스트 코드
        List<MemberDTO> memberDTOS = MemberMapper.INSTANCE.toDTOs(memberRepository.findAll());
        Random ran = new Random();
        System.out.println(memberDTOS.toString());


        JjimDTO jjimDTO = JjimDTO.builder()
                .recommend_contentid(contentid)
                .memberNo(memberDTOS.get(ran.nextInt(10)).getMemberNo())
                .build();

        System.out.println(jjimDTO);

        jjimRepository.save(JjimMapper.INSTANCE.toEntity(jjimDTO));
    }

    // 아직 미완성
    public void addTourlist(String contentid){
        String memberId = (String) session.getAttribute("id");
        String memberNo = memberRepository.findByMemberId(memberId).getMemberNo();

    }

}
