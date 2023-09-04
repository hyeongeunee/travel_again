package com.acorn.work.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PlannerTourlistDTO {

        private String plannerTourlistNo;

        private String plannerNo;

        private String contentid;

        private String tourSeq;

        private String tourDay;
    }

