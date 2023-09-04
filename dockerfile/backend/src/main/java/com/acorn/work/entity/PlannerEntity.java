package com.acorn.work.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "TB_PLANNER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class PlannerEntity extends BaseTimeEntity {

    @Id
    @Column(length = 36)
    private String plannerNo;

    @Column(length = 36)
    private String memberId;

    @Column(length = 4)
    private String region;

    @Column(length = 40)
    private String startDate;

    @Column(length = 40)
    private String endDate;

}