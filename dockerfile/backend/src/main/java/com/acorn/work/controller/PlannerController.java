package com.acorn.work.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.dto.PlannerDTO;
import com.acorn.work.service.PlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/planner")
public class PlannerController {

    private final PlannerService plannerService;

    // 플래너 저장
    @PostMapping("/insert")
    @ResponseBody
    public ResponseEntity plannerInsert(@RequestBody PlannerDTO plannerDTO) {
        System.out.println(plannerDTO.toString());
        plannerService.plannerInsert(plannerDTO);
        return ResponseUtils.completed(plannerDTO);
    }
    // 플래너 전체 리스트(Page)
    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity plannerList(Pageable pageable){

        return ResponseUtils.completed(plannerService.plannerListPage(pageable));
    }

    // memberId 에 해당하는 플래너 리스트(Page)
    @GetMapping("/list/{memberId}")
    @ResponseBody
    public ResponseEntity plannerList(@PathVariable String memberId, Pageable pageable){
        System.out.println(memberId);
        return ResponseUtils.completed(plannerService.plannerListPageByMemberId(memberId, pageable));
    }

    // 플래너 상세정보
    @GetMapping("/{plannerNo}")
    @ResponseBody
    public ResponseEntity plannerDetail(@PathVariable String plannerNo){
        PlannerDTO plannerDTO = plannerService.plannerDetail(plannerNo);
        return ResponseUtils.completed(plannerDTO);
    }

    @GetMapping("/soc")
    public String soc(){
        return "/websocket/index.html";
    }

}
