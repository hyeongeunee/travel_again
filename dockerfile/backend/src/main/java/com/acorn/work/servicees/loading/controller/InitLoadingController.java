package com.acorn.work.servicees.loading.controller;

import com.acorn.core.common.constant.CommonConstant;
import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.servicees.loading.service.TourlistLoadingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/init")
public class InitLoadingController {

    private final TourlistLoadingService tourlistLoadingService;

    @GetMapping("/tourlist/{filename}")
    public ResponseEntity loadingTourlist(@PathVariable String filename) {
        tourlistLoadingService.loadingTourlist(filename);
        return ResponseUtils.completed(CommonConstant.COMMON_TRUE);
    }

    @GetMapping("/tourlist/es/{filename}")
    public ResponseEntity loadingEcTourlist(@PathVariable String filename) {
        tourlistLoadingService.loadingEcTourlist(filename);
        return ResponseUtils.completed(CommonConstant.COMMON_TRUE);
    }
}