package com.acorn.work.es.dto;

import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public class ResponsePageDTO {
    public PageDTO page;
    public Object content;

    public static ResponsePageDTO setResponsePageDTO(Page<?> page) {

        return ResponsePageDTO.builder()
                .page(PageDTO.builder()
                        .total(page.getTotalElements())                // 조회된 전체 갯수
                        .pageCount(page.getTotalPages())                // 조회된 전체 페이지 갯수
                        .pageNumber(page.getPageable().getPageNumber()) // 현재 페이지
                        .pageSize(page.getPageable().getPageSize())     // 페이지에 있는 컨텐츠 갯수
                        .build())
                .content(page.getContent())                             // 컨텐츠
                .build();

    }
}