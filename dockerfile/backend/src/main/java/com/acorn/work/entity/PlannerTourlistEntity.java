package com.acorn.work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "TB_PLANNER_TOURLIST")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class PlannerTourlistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String plannerTourlistNo;

    @Column(length = 36)
    private String plannerNo;

    @Column(length = 20)
    private String contentid;

    @Column(length = 10)
    private String tourSeq;

    @Column(length = 20)
    private String  tourDay;
}