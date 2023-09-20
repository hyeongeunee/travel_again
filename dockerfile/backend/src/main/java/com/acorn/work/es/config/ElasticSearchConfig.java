package com.acorn.work.es.config;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.TransportUtils;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.acorn.core.customException.BizException;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.io.IOException;

/**
 * 직접 구현
 */
@Getter
@Setter
@Slf4j
@Component
public class ElasticSearchConfig {


    @Value("${es.host}")
    private String host;

    @Value("${es.port:9200}")
    private String port;

    @Value("${es.schemeName:https}")
    private String schemeName;

    @Value("${es.username:elastic}")
    private String username;

    @Value("${es.password}")
    private String password;

    @Value("${es.fingerprint}")
    private String fingerprint;

    @Value("${es.ssl:1}")
    private String ssl;

    @Value("${es.cadrt:false}")
    private String cadrt;


    public ElasticsearchClient getElasticSearchClient()   {
        // Create the low-level client
        RestClient restClient = getRestClient();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());

        // And create the API client
        return new ElasticsearchClient(transport);
    }


    public RestClient getRestClient()   {

        logPrintElasticSearchInfo();

        if ("ca".equals(ssl))  {
            return getRestCaClient() ;
        } else if ("fingerprint".equals(ssl))  {
            return getRestFingerPrintClient();
        } else {
            return getRestPwdClient();
        }
    }

    private void logPrintElasticSearchInfo() {
        log.debug("Host: " +  host);
        log.debug("Port: " +  port);
        log.debug("SchemeName: " +  schemeName);
        log.debug("username: " +   username);
        log.debug("fingerprint: " +  fingerprint);
        log.debug("ssl: " +  ssl);
        log.debug("cadrt: " +  cadrt);
    }

    private  RestClient getRestPwdClient() {

        final BasicCredentialsProvider hasicCredentialsProvider = new BasicCredentialsProvider();

        hasicCredentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(username, password));

        RestClient restClient = RestClient.builder(new HttpHost(host, Integer.parseInt(port), schemeName))
                .setHttpClientConfigCallback(httpClientBuilder ->
                        httpClientBuilder.setDefaultCredentialsProvider(hasicCredentialsProvider))
                .build();

        return restClient;
    }

    private  RestClient getRestFingerPrintClient() {

        log.debug("#### getRestSSLClient");

        SSLContext sslContext = TransportUtils.sslContextFromCaFingerprint(fingerprint);

        BasicCredentialsProvider basicCredentialsProvider =  getBasicCredentialsProvider();

        RestClient restClient = getRestAuthClient(sslContext, basicCredentialsProvider);

        return restClient;
    }

    private  RestClient getRestCaClient() {

        log.debug("#### getRestCaClient");

        RestClient restClient;
        File certFile = new File(String.valueOf(cadrt));
        try {
            SSLContext sslContext = TransportUtils.sslContextFromHttpCaCrt(certFile);

            BasicCredentialsProvider basicCredentialsProvider = getBasicCredentialsProvider();

            restClient = getRestAuthClient( sslContext, basicCredentialsProvider);

        } catch (IOException e) {
            throw new RuntimeException(e);        }

        if (restClient == null) {
            throw new BizException("ElasticSearch Low-Level Clint (RestClient) Not Create ");
        }

        return restClient;
    }



    private BasicCredentialsProvider getBasicCredentialsProvider() {
        BasicCredentialsProvider credsProv = new BasicCredentialsProvider();

        credsProv.setCredentials(
                AuthScope.ANY,
                new UsernamePasswordCredentials(username, password)
        );

        return credsProv;
    }

    private RestClient getRestAuthClient(SSLContext sslContext,
                                         BasicCredentialsProvider basicCredentialsProvider) {
        return RestClient.builder(new HttpHost(host, Integer.parseInt(port), schemeName))
                .setHttpClientConfigCallback(hc -> hc
                        .setSSLContext(sslContext)
                        .setDefaultCredentialsProvider(basicCredentialsProvider))
                .build();
    }

}