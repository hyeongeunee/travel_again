package com.acorn.work.servicees.tour.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourListeReqDTO {

    private String searchField;
    private String searchValue;
}