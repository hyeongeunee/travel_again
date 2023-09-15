package com.acorn.work.servicees.tour.doc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "wordsearch")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@JsonIgnoreProperties(ignoreUnknown=true)
@Setting(settingPath = "/wordsearch.json")
public class WordSearchDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String wordSearchId;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer", fielddata = true)
    private String words;

    private String areacode;

}