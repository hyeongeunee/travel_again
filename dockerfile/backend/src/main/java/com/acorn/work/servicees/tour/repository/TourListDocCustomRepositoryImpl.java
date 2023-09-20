package com.acorn.work.servicees.tour.repository;


import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.acorn.work.es.dto.searchresponse.SearchResDTO;
import com.acorn.work.servicees.tour.doc.TourListDoc;
import com.acorn.work.servicees.tour.dto.TourListeReqDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Repository
public class TourListDocCustomRepositoryImpl implements TourListDocCustomRepository {

    private final ElasticsearchClient ecClient;

    private final String inexName = "tourlist";
    private TourListDoc tourListDoc;

    private final Gson gson;
    private final ObjectMapper objectMapper;

    /**
     * 지정된 index에서 match 쿼리를 실행 함
     * @return
     */
    @SneakyThrows
    @Override
    public <T> SearchResDTO getQueryMatch(TourListeReqDTO tourListeReqDTO, T target   )   {

        SearchResponse<Map> searchResponse = ecClient.search(s -> s
                        .index(inexName)
                        .query(q -> q
                                .match(t -> t
                                        .field(tourListeReqDTO.getSearchField())
                                        .query(tourListeReqDTO.getSearchValue())
                                )
                        ),
                Map.class
        );

        return SearchResDTO.initSearchResDTO(searchResponse, target);
    }


}