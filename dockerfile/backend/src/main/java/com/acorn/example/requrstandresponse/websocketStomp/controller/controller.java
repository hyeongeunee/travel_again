package com.acorn.example.requrstandresponse.websocketStomp.controller;

import com.acorn.example.requrstandresponse.websocketStomp.message.GreetingMessag;
import com.acorn.example.requrstandresponse.websocketStomp.message.HelloMessage;
import com.acorn.work.servicees.tour.service.WordSearchService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@Slf4j
@RequiredArgsConstructor
public class controller {


  private final SimpMessagingTemplate template;
  private final WordSearchService wordSearchService;

  // @MessageMapping : WebSocket을 사용할 때,
  //        클라이언트로부터 메시지를 받았을 때 어떤 메서드를 실행할지 결정하는 역할
  // @SendTo : 메시지를 보낼 대상을 지정.
  //        대상은 토픽(topic)이나 큐(queue)의 형태로 지정할 수 있습니다.
  @MessageMapping("/scheduledmsg")
  @SendTo("/topic/message2")
  public GreetingMessag connect(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    Gson gson = new Gson();
    return GreetingMessag.builder()
//            .content("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!").build();
            .content(gson.toJson(wordSearchService.comparisonWord())).build();
  }

  @MessageMapping("/scheduledmsg2")
  @SendTo("/topic/message")
  public GreetingMessag chat(HelloMessage message) throws Exception{
    return GreetingMessag.builder()
            .content(HtmlUtils.htmlEscape(message.getUsername()+ " : " + message.getName())).build();
  }


//  @Scheduled(cron = "0/10 * * * * *" )
  public void sendMsg() throws Exception{

//    if(true && Webs){}

//    GreetingMessag greetingMessag = GreetingMessag.builder()
//            .content("[메세지]" + UuidUtils.getUUID() + " ..... !").build();
    Gson gson = new Gson();

    GreetingMessag greetingMessag = GreetingMessag.builder()
            .content(gson.toJson(wordSearchService.comparisonWord())).build();

    log.debug("cron 15초 이후 실행.. "
            + Thread.currentThread().getName() + " : "
            + LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-dd'T'HH:mm:ss")));

    template.convertAndSend("/topic/message2", greetingMessag);
  }
}
