package com.acorn.example.requrstandresponse.deferredResult.controller;

import com.acorn.core.utils.ResponseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@RestController()
@RequestMapping("/sync")
public class SyncController {


    @GetMapping("/sync/{message}/{waitTime}")
    public ResponseEntity syncService(@PathVariable String message,
                                      @PathVariable Long waitTime) throws InterruptedException {
        Map<String, String> rnMap = new HashMap<>();

        Thread.sleep(6000);

        rnMap.put("message",  message);
        rnMap.put("waitTime", String.valueOf(waitTime));
        return ResponseUtils.completed(rnMap);
    }

    @GetMapping("/async/{message}/{waitTime}")
    public AtomicReference<DeferredResult<ResponseEntity<?>>> asyncService(@PathVariable String message,
                                                                           @PathVariable Long waitTime)  {

        log.debug("1. 요청이 들어 왔습니다.");

        AtomicReference<DeferredResult<ResponseEntity<?>>> deferredResult = new AtomicReference<>(new DeferredResult<>(waitTime));
        deferredResult.get().onTimeout(() -> deferredResult.get().setErrorResult(
                ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body("5 .... 시간 초과 입니다.")));

        Map<String, String> rnMap = new HashMap<>();
        ForkJoinPool.commonPool().submit(() -> {

            log.debug("2. 분리된 Thread에서 수행 됩니다.");
            try {
                Thread.sleep(6000);
                rnMap.put("message",  message);
                rnMap.put("waitTime", String.valueOf(waitTime));

                deferredResult.get().setResult(ResponseEntity.status(HttpStatus.OK.value()).body(rnMap));
            } catch (InterruptedException e) {
                deferredResult.set(ResponseUtils.errorDeferredResult(e));
            }
        });

        log.debug("3. servlet Thread .... ");

        return deferredResult;
    }
}
