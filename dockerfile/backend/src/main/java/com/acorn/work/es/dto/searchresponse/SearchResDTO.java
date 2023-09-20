package com.acorn.work.es.dto.searchresponse;

import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.acorn.work.es.config.ElasticUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResDTO {
    private long took;
    private long size;
    private long total;
    private List<?> hits;
    boolean isExactResult;


    public static <T, t> SearchResDTO initSearchResDTO(SearchResponse<Map> searchResponse, T t) {

        List<t> collect = ElasticUtils.getHitCollect(searchResponse, t);


        return SearchResDTO.builder()
                .total((Long) ElasticUtils.getHitsTotal(searchResponse).get("total"))
                .isExactResult( (boolean) ElasticUtils.getHitsTotal(searchResponse).get("isEq") )
                .took(searchResponse.took())
                .size(searchResponse.hits().hits().size())
                .hits(collect).build();
    }
}

/**
 * Query byMaxPrice = RangeQuery.of(r -> r
 *     .field("price")
 *     .gte(JsonData.of(maxPrice))
 * )._toQuery();
 */

/**
 * {
 * 	"took": 6,
 * 	"timedOut": false,
 * 	"shards": {
 * 		"failed": 0,
 * 		"successful": 1,
 * 		"total": 1,
 * 		"failures": [],
 * 		"skipped": 0
 *        },
 * 	"hits": {
 * 		"total": {
 * 			"relation": "Eq",
 * 			"value": 188
 *        },
 * 		"hits": [
 *            {
 * 				"index": "tourlist",
 * 				"id": "gohmSYoBj578TlxewPq-",
 * 				"score": 7.031684,
 * 				"explanation": null,
 * 				"fields": {},
 * 				"highlight": {},
 * 				"innerHits": {},
 * 				"matchedQueries": [],
 * 				"nested": null,
 * 				"ignored": [],
 * 				"ignoredFieldValues": {},
 * 				"shard": null,
 * 				"node": null,
 * 				"routing": null,
 * 				"source": {
 * 					"tourListId": null,
 * 					"contentid": "127151",
 * 					"addr1": "부산광역시 동구 중앙대로179번길 1",
 * 					"addr2": "",
 * 					"areacode": 6,
 * 					"booktour": 0,
 * 					"cat1": "A02",
 * 					"cat2": "A0202",
 * 					"cat3": "A02020200",
 * 					"contenttypeid": "12",
 * 					"createdtime": "20031215090000",
 * 					"firstimage": "http://tong.visitkorea.or.kr/cms/resource/25/1571125_image2_1.jpg",
 * 					"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/25/1571125_image3_1.jpg",
 * 					"cpyrhtDivCd": "Type3",
 * 					"mapx": "129.0385614042",
 * 					"mapy": "35.1134327682",
 * 					"mlevel": 6,
 * 					"modifiedtime": "20220818100722",
 * 					"sigungucode": "5",
 * 					"tel": "",
 * 					"title": "부산 차이나타운특구(상해문.상해거리)",
 * 					"zipcode": "48820",
 * 					"contentid2": "127151",
 * 					"overview": "부산 속 작은 중국, 상해거리의 매력은 다양하다. 부산이 간직하고 있는 근대 분위기, 홍등에서 뿜어져 나오는 이국적 분위기, 맛집에서 흘러나오는 중국 음악까지, 부산에 왔더니 그 속에 중국이 있다. 부산에서 잠시 중국 여행을 해보고 싶은 사람들이라면 잊지 말고 들러야 할 장소이다."
 *                },
 * 				"seqNo": null,
 * 				"primaryTerm": null,
 * 				"version": null,
 * 				"sort": [],
 * 				"tDocumentSerializer": null
 *            }
 * 		],
 * 		"maxScore": 7.031684,
 * 		"tSerializer": null
 *    },
 * 	"aggregations": {},
 * 	"clusters": null,
 * 	"fields": {},
 * 	"maxScore": null,
 * 	"numReducePhases": null,
 * 	"profile": null,
 * 	"pitId": null,
 * 	"scrollId": null,
 * 	"suggest": {},
 * 	"terminatedEarly": null,
 * 	"tDocumentSerializer": null
 * }
 */