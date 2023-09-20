package com.acorn.work.es.config;


import co.elastic.clients.transport.TransportUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.support.HttpHeaders;

import javax.net.ssl.SSLContext;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class ElasticSearchJpaConfiguration extends ElasticsearchConfiguration {

    @Value("${es.host}")
    private String host;

    @Value("${es.port:9200}")
    private String port;


    @Value("${es.username:elastic}")
    private String username;

    @Value("${es.password}")
    private String password;

    @Value("${es.fingerprint}")
    private String fingerprint;

    /**
     * https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#elasticsearch.clients.configuration
     * 기본 Configuration 이후 다음을 사용 해서 작업을 할 수 있습니다.
     * @Autowired
     * ReactiveElasticsearchOperations operations;
     *
     * @Autowired
     * ReactiveElasticsearchClient elasticsearchClient;
     *
     * @Autowired
     * RestClient restClient;
     * @return
     */
    @Override
    public ClientConfiguration clientConfiguration() {


        SSLContext sslContext = TransportUtils.sslContextFromCaFingerprint(fingerprint);
        ClientConfiguration clientConfiguration = ClientConfiguration.builder() //
                // 주소 지정 ( 연결 포인터 )
                .connectedTo(host + ":" + port)
                // SSL 인증서
                .usingSsl(sslContext)
                //            // 필요에 따라 프록시를 설정
                //            .withProxy("localhost:8888")
                //            // 선택적으로 경로 접두사를 설정하며, 주로 다른 클러스터가 일부 역방향 프록시 뒤에 있을 때 사용
                //            .withPathPrefix("ela")
                //            // 연결 시간 제한을 설정
                //            .withConnectTimeout(Duration.ofSeconds(5))
                //            // 소켓 시간 제한을 설정
                //            .withSocketTimeout(Duration.ofSeconds(3))
                //            // 필요에 따라 헤더를 설정
                //            .withDefaultHeaders(defaultHeaders)
                // 기본 인증을 추가합니다
                .withBasicAuth(username, password)
                .withHeaders(() -> getHttpHeaders())
                // 생성된 클라이언트를 구성하는 함수
                //            .withClientConfigurer(
                //                    ElasticsearchClientConfigurationCallback.from(clientBuilder -> {
                //                      // configure the Elasticsearch RestClient
                //                      return clientBuilder;
                //                    }))
                // 저수준 Elasticsearch에서 사용하는 HttpAsyncClient 구성
                //            .withClientConfigurer(ElasticsearchClients.ElasticsearchHttpClientConfigurationCallback.from(httpAsyncClientBuilder -> {
                //              // configure the HttpAsyncClient
                //              return httpAsyncClientBuilder;
                //            }))
                .build();


        return clientConfiguration;
    }

    /**
     * 사용자 지정해야 하는 경우 기본 헤더 정의
     * @return
     */
    private static HttpHeaders getHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        //    httpHeaders.add("some-header", "on every request");
        httpHeaders.add("currentTime", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        // Elasticsearch 7 호환성 헤더 구성
        //    httpHeaders.add("Accept", "application/vnd.elasticsearch+json;compatible-with=7");
        //    httpHeaders.add("Content-Type", "application/vnd.elasticsearch+json;"
        //            + "compatible-with=7");
        return httpHeaders;
    }


}