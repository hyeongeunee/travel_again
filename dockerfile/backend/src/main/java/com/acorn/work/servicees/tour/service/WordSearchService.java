package com.acorn.work.servicees.tour.service;


import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.acorn.work.es.config.ElasticSearchConfig;
import com.acorn.work.servicees.tour.doc.WordSearchDoc;
import com.acorn.work.servicees.tour.dto.WordSearchRspDTO;
import com.acorn.work.servicees.tour.mapper.EcMapper;
import com.acorn.work.servicees.tour.repository.WordSearchDocRepository;
import com.acorn.work.servicees.tour.repository.WordSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class WordSearchService  {



    private final WordSearchDocRepository wordSearchDocRepository;
    private final ElasticSearchConfig elasticSearchConfig;
    private final WordSearchRepository wordSearchRepository;


    public boolean saveWordSearch(String words) {

        WordSearchDoc wordSearchDoc = WordSearchDoc.builder()
                .words(words)
                .build();
        wordSearchDocRepository.save(wordSearchDoc);
        return true;
    }

    public void saveWordCount() throws IOException{
        wordSearchRepository.saveAll(EcMapper.INSTANCE.toWordSearchEntities(getTopTags("words",10)));
    }

    public List<WordSearchRspDTO> comparisonWord() throws  IOException{
        List<WordSearchRspDTO> wordSearchRspDTOS = EcMapper.INSTANCE.toWordSearchRspDTOs(wordSearchRepository.findAll());

        List<WordSearchRspDTO> wordSearchRspDTOS2 = getTopTags("words",10);


        System.out.println(wordSearchRspDTOS.toString());
        System.out.println(wordSearchRspDTOS2.toString());
        for(int i = 0 ; i < 10 ; i ++) {
            for (int j = 0; j < 10; j++) {
                if (wordSearchRspDTOS2.get(i).getWord().equals(wordSearchRspDTOS.get(j).getWord())) {
                    System.out.println("i : " + i + "j : " + j);
                    wordSearchRspDTOS2.get(i).setNo(j-i);
                    break;
                } else {
                    wordSearchRspDTOS2.get(i).setNo(999);
                }
            }
        }
        return wordSearchRspDTOS2;
    }


    public  List<WordSearchRspDTO> getTopTags(String fieldname, int size) throws IOException {

        //        Query query = MatchQuery.of(m -> m
        //                .field("words")
        //        )._toQuery();

        SearchResponse<Void> response = elasticSearchConfig.getElasticSearchClient().search(b -> b
                        .index("wordsearch")
                        .size(0)
                        .aggregations("top_tags", a -> a
                                .terms(h -> h
                                        .field(fieldname)
                                        .size(20)
                                )
                        ),
                Void.class
        );

        List<WordSearchRspDTO> buckets = response.aggregations()

                .get("top_tags")
                .sterms().buckets().array().stream().map(bucket -> {
                    if (String.valueOf(bucket.key()._get()).length()==1) {
                        return null;
                    }
                    WordSearchRspDTO wordSearchRspDTO = WordSearchRspDTO.builder()
                            .word(String.valueOf(bucket.key()._get()))
                            .cnt((int) bucket.docCount())
                            .build();

//                    System.out.println(wordSearchRspDTO.toString());
                    return wordSearchRspDTO;

                }).collect(Collectors.toList());

        return buckets;
    }
}

/**
 * TermsAggregationBuilder aggregation = AggregationBuilders.terms("top_tags")
 *   .field("tags")
 *   .order(Terms.Order.count(false));
 * SearchSourceBuilder builder = new SearchSourceBuilder().aggregation(aggregation);
 *
 * SearchRequest searchRequest =
 *   new SearchRequest().indices("blog").types("article").source(builder);
 * SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
 *
 * Map<String, Aggregation> results = response.getAggregations().asMap();
 * StringTerms topTags = (StringTerms) results.get("top_tags");
 *
 * List<String> keys = topTags.getBuckets()
 *   .stream()
 *   .map(b -> b.getKeyAsString())
 *   .collect(toList());
 * assertEquals(asList("elasticsearch", "spring data", "search engines", "tutorial"), keys);
 */