package com.acorn.work.servicees.tour.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TourListEcDTO {

    private String tourListId;

    private String contentid;

    private String contenttypeid;

    private String cat1;
    private String cat2;
    private String cat3;

    private String title;

    private String zipcode;

    private String addr1;

    private String addr2;

    private String tel;

    private String areacode;

    private String sigungucode;
    private String firstimage;
    private String firstimage2;

    private String overview;

    private String booktour;

    private String mapx;
    private String mapy;
    private int recommendCount;
    private int addCount;
    private float rating;

    private String createdtime;
    private String cpyrhtDivCd;
    private String mlevel;
    private String modifiedtime;
    private String contentid2;
}