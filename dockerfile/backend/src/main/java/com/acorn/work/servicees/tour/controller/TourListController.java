package com.acorn.work.servicees.tour.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.servicees.tour.dto.TourListeReqDTO;
import com.acorn.work.servicees.tour.service.TourListService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tourlist")
public class TourListController {

    private final TourListService tourListService;

    @GetMapping("/es/list")
    public ResponseEntity getList(){
        return ResponseUtils.completed(tourListService.getTourList());
    }

    @RequestMapping("/es/search")
    public ResponseEntity searchlist(@RequestParam("searchValue") String searchValue,Pageable pageable){
        return ResponseUtils.completed(tourListService.getTourList(searchValue,pageable));
    }

    @RequestMapping("es/search/{areacode}")
    public ResponseEntity searchTourListByAreacode(@RequestParam("searchValue") String searchValue,Pageable pageable,@PathVariable String areacode){

        return ResponseUtils.completed(tourListService.getTourList2(searchValue,pageable,areacode));
    }

//    @RequestMapping("/es/search/{areacode}")
//    public ResponseEntity searchlistByAreacode(@RequestParam("searchValue") String searchValue,@PathVariable String areacode, Pageable pageable){
//        return ResponseUtils.completed(tourListService.getTourListByAreacode(searchValue,areacode,pageable));
//    }

    @PostMapping("/es/title")
    // @RequestParam("title")
    public ResponseEntity getTitle(@RequestParam("searchValue") String searchValue) {
        return ResponseUtils.completed(tourListService.getTourListByTitle(searchValue));
    }

    @GetMapping("/es/title/pageing")
    public ResponseEntity getTitle(@RequestParam("searchValue") String searchValue,
                                   @PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseUtils.completed(tourListService.getTourListByTitle(searchValue, pageable));
    }

    @PostMapping("/es/overview")
    public ResponseEntity getTourListByOverview(@RequestParam("searchValue") String searchValue) {
        return ResponseUtils.completed(tourListService.getTourListByOverview(searchValue));
    }


    @GetMapping("/es/overview/pageing")
    public ResponseEntity getTourListByTitlePage(@RequestParam("searchValue") String searchValue,
                                                 @PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseUtils.completed(tourListService.getTourListByOverview(searchValue, pageable));
    }

    @GetMapping("/es/overview/hits")
    public ResponseEntity getTourListByTitlehits(@RequestParam("searchValue") String searchValue,
                                                 @PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseUtils.completed(tourListService.findHitsByOverview(searchValue, pageable));
    }

    @GetMapping("/es/match")
    public ResponseEntity getTourListByTitlehits( @RequestBody TourListeReqDTO tourListeReqDTO ) {
        return ResponseUtils.completed(tourListService.findTourListDocByMatch(tourListeReqDTO));
    }
    @GetMapping("/es/updateCount")
    public ResponseEntity updateCount() {
        return ResponseUtils.completed(tourListService.updateCount());
    }

    @PostMapping("/es/addCountDesc/all")
    public ResponseEntity findByTourlistOrderByAddCountDesc() {
        return ResponseUtils.completed(tourListService.getTourlistByAddCountTop9());
    }


    @RequestMapping("/es/recCountDesc/all")
    public ResponseEntity findByTourlistOrderByRecommendCountDesc() {
        return ResponseUtils.completed(tourListService.getTourlistByRecommendCountTop9());
    }

    @RequestMapping("/es/ratingDesc/all")
    public ResponseEntity findByTourlistOrderByRatingDesc() {
        return ResponseUtils.completed(tourListService.getTourlistOrderByRatingDesc());
    }

    @RequestMapping("/es/addCountDesc/{areacode}")
    public ResponseEntity findByTourlistOrderByAddCountDesc(@PathVariable String areacode) {
        return ResponseUtils.completed(tourListService.getTourlistByAddCountByAreacode(areacode));
    }

    @RequestMapping("/es/recommendCountDesc/{areacode}")
    public ResponseEntity findByTourlistOrderByRecommemdCountDesc(@PathVariable String areacode){
//        System.out.println(areaData);
        return ResponseUtils.completed(tourListService.getTourlistByRecommendCount(areacode));
    }

//    @PostMapping("/es/addCountDesc")
//    public ResponseEntity findByTourlistOrderByRecommendCountDesc(@PathVariable String areaData) {
//
//        return ResponseUtils.completed(tourListService.getTourlistByRecommendCount(areaData));
//    }

}