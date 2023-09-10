package com.acorn.work.servicees.tour.doc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "searchValue")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@JsonIgnoreProperties(ignoreUnknown=true)
public class SearchDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String searchValueId;

    @Field(type = FieldType.Text, analyzer = "nori")
    private String word;

}

