package com.acorn.work.es.config;

import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.TotalHits;
import co.elastic.clients.elasticsearch.core.search.TotalHitsRelation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ElasticUtils {

    /**
     * SearchResponse 를 응답 받아서 T type의 객체로 돌려 줌
     * @param searchResponse
     * @param t
     * @return
     * @param <T>
     * @param <t>
     */
    public static <T, t> List<t> getHitCollect(SearchResponse<Map> searchResponse, T t) {
        return (List<t>) searchResponse.hits().hits().stream().map(Hit::source).collect(Collectors.toList());
    }

    /**
     * SearchResponse 객체의 totalValue와 eq 결과 여부
     * @param searchResponse
     * @return
     */
    public static Map<String, Object> getHitsTotal(SearchResponse<Map> searchResponse) {
        Map<String, Object> hitTotalMap = new HashMap<>();
        TotalHits total = searchResponse.hits().total();
        boolean isExactResult = total.relation() == TotalHitsRelation.Eq;
        hitTotalMap.put("isEq", isExactResult);
        hitTotalMap.put("total", total.value());
        return hitTotalMap;
    }
    /**
     * Match Query
     * @param fieldName
     * @param searchText
     * @return
     */
    public static Query matchQuery(String fieldName, String searchText) {
        return MatchQuery.of(m -> m
                .field(fieldName)
                .query(searchText)
        )._toQuery();
    }
}