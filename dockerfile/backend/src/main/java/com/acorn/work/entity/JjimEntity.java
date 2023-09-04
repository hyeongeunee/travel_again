package com.acorn.work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "TB_JJIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class JjimEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String jjimNo;

    @Column(length = 36)
    private String memberNo;

    // 관광지를 추천했을때
    @Column(length = 10)
    private String recommend_contentid;

    // 이 관광지 넣어서 Planner를 만들었을때
    @Column(length = 10)
    private String add_contentid;
}