package com.acorn.example.scheduled;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class AnnotationScheduledService {

 // @Scheduled(initialDelay = 10000, fixedDelay = 10000 )
  public void scheduledJob() {
    log.debug("10 초 이후 job 다시 실행 "
            + Thread.currentThread().getName() + " : "
            + LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-dd'T'HH:mm:ss")));
  }

 // @Scheduled(cron = "0/15 * * * * *" )
  public void scheduledJobCron() {
    log.debug("cron 15초 이후 실행.. "
            + Thread.currentThread().getName() + " : "
            + LocalDateTime.now().format(DateTimeFormatter.ofPattern("YYYY-MM-dd'T'HH:mm:ss")));
  }
}
