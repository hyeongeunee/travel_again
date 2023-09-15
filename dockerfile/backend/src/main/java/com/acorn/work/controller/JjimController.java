package com.acorn.work.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.JjimDTO;
import com.acorn.work.service.JjimService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
