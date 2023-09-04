package com.acorn.work.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MemberDTO {

    private String memberNo;

    private String memberId;

    private String name;

    private String pwd;

    private String birth;

    private String gender;

    private String phone;

    private String email;
}