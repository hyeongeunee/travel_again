package com.acorn.example.jpa.entity;

import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@Table(name = "TB_DEMO")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class DemoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String title;
    private String content;

    private String name;
}

