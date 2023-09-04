package com.acorn.work.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "TB_MEMBER")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class MemberEntity {

    @Id
    @Column(length = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String memberNo;

    @Column(length = 32)
    private String memberId;

    @Column(length = 200)
    private String name;

    @Column(length = 100)
    private String pwd;

    @Column(length = 100)
    private String birth;

    @Column(length = 1)
    private String gender;

    @Column(length = 100)
    private String phone;

    @Column(length = 100)
    private String email;
}
