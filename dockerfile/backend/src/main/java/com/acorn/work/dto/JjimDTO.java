package com.acorn.work.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class JjimDTO {

    private String jjimNo;

    private String memberNo;

    private String recommend_contentid;

    private String add_contentid;
}
