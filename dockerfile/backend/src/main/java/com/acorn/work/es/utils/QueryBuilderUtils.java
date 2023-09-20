package com.acorn.work.es.utils;

import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryVariant;
import co.elastic.clients.elasticsearch._types.query_dsl.TermQuery;
import com.acorn.core.utils.ConvertUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class QueryBuilderUtils {

    public static Query termQuery(String field, String value){
        QueryVariant queryVariant = new TermQuery.Builder().caseInsensitive(true).field(field).value(value).build();
        return new Query(queryVariant);
    }

    public static Query matchQuery(String field, String value){
        QueryVariant queryVariant = new MatchQuery.Builder().field(field).query(value).build();
        return new Query(queryVariant);
    }


    public static <T> List<Query> prepareQueryList(T t) {

        Map<String, String> conditionMap = ConvertUtils.convertToMap(t);

        List<Query> queries = conditionMap.entrySet().stream()
                .filter(entry->!StringUtils.isEmpty(entry.getValue()))
                .map(entry-> QueryBuilderUtils.termQuery(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        log.debug(" prepareQueryList :: " + queries.toString());

        return queries;
    }

    public static <T> List<Query> matchQueryList(T t) {

        Map<String, String> conditionMap = ConvertUtils.convertToMap(t);

        List<Query> queries = conditionMap.entrySet().stream()
                .filter(entry->!StringUtils.isEmpty(entry.getValue()))
                .map(entry-> QueryBuilderUtils.matchQuery(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        log.debug(" matchQueryList :: " + queries.toString());

        return queries;
    }

}