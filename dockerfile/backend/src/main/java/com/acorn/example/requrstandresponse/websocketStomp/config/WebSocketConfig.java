package com.acorn.example.requrstandresponse.websocketStomp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * 웹 소켓 구성 한다. Configure Spring for STOMP messaging
 * WebSocket 기능을 사용하도록 설정 : @EnableWebSocketMessageBroker
 */
@Configuration
@EnableWebSocketMessageBroker
@EnableWebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  /**
   * WebSocketMessageBrokerConfigurer 구현
   *
   * @param config
   */
  public void configureMessageBroker(MessageBrokerRegistry config) {
    // 메세지를 받을 경로로 스프링에서 제공 해주는 내장 브로커 사용
    //  “/queue”, “/topic”을 통해 1:1, 1:N 설정
    config.enableSimpleBroker("/topic");

    // 메세지를 보낼 때, 관련 경로를 설정
    // 클라이언트가 메세지를 보낼 떄, 경로 앞에 “/app”이 붙어있으면 Broker로 보내진다
    config.setApplicationDestinationPrefixes("/app");

  }


  /**
   * 소겟 연결과 관련된 설정
   * addEndpoint : 소켓 연결 uri
   * 연결 상태 : CONNECT : 연결 요청, CONNECTED : 연결 성공, ERROR : 연결 실패
   * 주의 사항
   * - setAllowedOriginPatterns(”*”) : 소켓 또한 CORS 설정
   * - withSockJS() : 소켓을 지원하지 않는 브라우저라면, sockJS를 사용하도록 설정
   *
   * @param registry
   */
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/gs-websocket")
            .setAllowedOrigins("*")
            .withSockJS();
    registry.addEndpoint("/gs-websocket")
            .setAllowedOrigins("*");
  }


}
