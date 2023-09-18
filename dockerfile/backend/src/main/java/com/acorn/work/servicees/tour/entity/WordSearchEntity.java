package com.acorn.work.servicees.tour.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "TB_WORDSEARCH")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class WordSearchEntity {

    @Id
    @Column(length = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String wordSearchId;

    @Column(length = 100)
    private String word;

    @Column(length = 10)
    private int cnt;

}
