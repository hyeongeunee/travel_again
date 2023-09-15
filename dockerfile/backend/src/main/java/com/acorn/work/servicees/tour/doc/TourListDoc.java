package com.acorn.work.servicees.tour.doc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "tourlist")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@JsonIgnoreProperties(ignoreUnknown=true)
public class TourListDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String tourListId;

    private String contentid;

    private String contenttypeid;

    private String cat1;
    private String cat2;
    private String cat3;

    @Field(type = FieldType.Text, analyzer = "nori",fielddata = true)
    private String title;

    private String zipcode;

    @Field(type = FieldType.Text, analyzer = "nori" ,fielddata = true)
    private String addr1;

    @Field(type = FieldType.Text, analyzer = "nori")
    private String addr2;

    private String tel;

    private String areacode;
    private String sigungucode;
    private String firstimage;
    private String firstimage2;

    @Field(type = FieldType.Text, analyzer = "nori",fielddata = true)
    private String overview;

    private String booktour;

    private String mapx;
    private String mapy;
    @Field(type = FieldType.Integer )
    private int recommendCount;
    @Field(type = FieldType.Integer )
    private int addCount;

    private float    rating;

    private String createdtime;
    private String cpyrhtDivCd;
    private String mlevel;
    private String modifiedtime;
    private String contentid2;


}