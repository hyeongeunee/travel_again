package com.acorn.work.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.TourlistConditionReqDTO;
import com.acorn.work.service.TourlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@ResponseBody
@RequestMapping("/tourlist")
public class TourlistController {

    private final TourlistService tourlistService;


    // tourlist 전체 리스트 (page)
    @GetMapping("/page")
    public ResponseEntity getTourlist(Pageable pageable) {
        return ResponseUtils.completed(tourlistService.getTourlistPage(pageable));
    }

    // tourlist by areacode 리스트 (page)
    @GetMapping("/page/{areacode}")
    public ResponseEntity getTourlistPageFindByAreacode(@PathVariable String areacode,Pageable pageable) {
        System.out.println(areacode);
        return ResponseUtils.completed(tourlistService.getTourlistPageOnArea(areacode,pageable));
    }

    // recommend (추천수) 에 따라서 정렬
//    @GetMapping("/byrec")
//    public ResponseEntity getTourlistOrderByRec(){
//        List<TourlistDTO> tourlistDTOS = tourlistService.getTourlistOrderBy
//    }

    // title 검색 리스트 (List)
    @GetMapping("/{title}")
    public ResponseEntity getTourlistByTitle(@PathVariable String title,
                                      Pageable pageable) {
        return ResponseUtils.completed(tourlistService.getTourlistByTitle(title, pageable));
    }

    // title 검색 리스트 (Page)
    @GetMapping("/page/{title}")
    public ResponseEntity getTourlistPageByTitle(@PathVariable String title,
                                          @PageableDefault(page=0, size=10)Pageable pageable) {
        return ResponseUtils.completed(tourlistService.getTourlistPageByTitle(title, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity getTourlistByCondition(@RequestBody TourlistConditionReqDTO tourlistConditionReqDTO, Pageable pageable) {
        return ResponseUtils.completed(tourlistService.findTourlist(tourlistConditionReqDTO,pageable));
    }

    @GetMapping("/search/page")
    public ResponseEntity getTourlistPageByCondition(@RequestBody TourlistConditionReqDTO tourlistConditionReqDTO, Pageable pageable){
        return ResponseUtils.completed(tourlistService.findTourlistPage(tourlistConditionReqDTO,pageable));
    }

}
