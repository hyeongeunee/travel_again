package com.acorn.work.es.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ElasticIndexVO {

    private String indexName;
    private String shards;
    private String replicas;
    private String refreshInterval;

}