package com.acorn.work.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PlannerDTO {

    private String plannerNo;

    private String memberId;

    private String region;

    private String startDate;

    private String endDate;

    private String localDateTime;

    private List<PlannerTourlistDTO> plannerTourlistDTOS;

}
