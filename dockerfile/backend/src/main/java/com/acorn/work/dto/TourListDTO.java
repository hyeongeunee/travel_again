package com.acorn.work.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TourlistDTO {

    private String contentid;
    private String contenttypeid;
    private String cat1;
    private String cat2;
    private String cat3;
    private String title;
    private String addr1;
    private String mlevel;
    private String areacode;
    private String sigungucode;
    private String firstimage;
    private String overview;
    private String mapx;
    private String mapy;

    private int recommendCount;

    private int addCount;
}