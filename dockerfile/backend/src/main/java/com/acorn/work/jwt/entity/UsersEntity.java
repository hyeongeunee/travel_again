package com.acorn.work.jwt.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String userName;

    // json 응답시 응답안하게
//    @JsonIgnore
//    @Transient
    private String password;

    private String email;

    private String profile;

}
