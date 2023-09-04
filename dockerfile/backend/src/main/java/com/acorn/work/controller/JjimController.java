package com.acorn.work.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.JjimDTO;
import com.acorn.work.dto.TourlistDTO;
import com.acorn.work.mapstruct.TourlistMapper;
import com.acorn.work.repository.TourlistRepository;
import com.acorn.work.service.JjimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/jjim")
@RequiredArgsConstructor
public class JjimController {
    private final JjimService jjimService;


    @GetMapping("/recommend")
    public ResponseEntity RecommendTourlist(@RequestBody JjimDTO jjimDTO){
        System.out.println(jjimDTO);
        jjimService.recommendTourlist(jjimDTO);
        return ResponseUtils.completed(jjimDTO);
    }


    @GetMapping("/cancelrecommend")
    public ResponseEntity cancelRecommendTourlist(@RequestBody JjimDTO jjimDTO){
        jjimService.recommendCancelTourlist(jjimDTO);
        return ResponseUtils.completed(jjimDTO);
    }



    // 테스트용 랜덤 추가를 위한 코드
    private final TourlistRepository tourlistRepository;
    @GetMapping("/rec/random")
    public ResponseEntity randomRec(int count){
        List<TourlistDTO> tourlistDTOS = TourlistMapper.INSTANCE.toDTOs(tourlistRepository.findAll());
        Random ran = new Random();

        System.out.println(count);
        for(int i = 0 ; i < count ; i ++) {
            int ranInt = ran.nextInt(4700);
            String ranContentid = tourlistDTOS.get(ranInt).getContentid();
            jjimService.randomRecommendTourlist(ranContentid);
        }

        return ResponseUtils.completed(count);
    }
}
