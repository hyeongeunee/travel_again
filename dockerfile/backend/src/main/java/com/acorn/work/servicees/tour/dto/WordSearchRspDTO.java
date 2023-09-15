package com.acorn.work.servicees.tour.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class WordSearchRspDTO {

    private String word;
    private int cnt;
    private String no;
    private String areacode;
}
