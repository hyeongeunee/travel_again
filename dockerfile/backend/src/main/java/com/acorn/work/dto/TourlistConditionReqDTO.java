package com.acorn.work.dto;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
@Builder
public class TourlistConditionReqDTO {
    private String title;
    private String addr1;
    private String sigungucode;
}