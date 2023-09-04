package com.acorn.core.utils;

import com.acorn.core.common.dto.ResponseDTO;
import com.acorn.core.common.constant.CommonConstant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;

import java.sql.Timestamp;

public class ResponseUtils {

  public static ResponseEntity<Object> completed(Object obj) {



    ResponseDTO responseDTO = ResponseDTO.builder()
            .code(String.valueOf(HttpStatus.OK.value()))
            .message(CommonConstant.COMMON_EMPTY)
            .error(CommonConstant.COMMON_EMPTY)
            .status(HttpStatus.OK.value())
            .path(RequestUtils.getHttpServletRequest().getRequestURL().toString())
            .timestamp(String.valueOf(new Timestamp(System.currentTimeMillis())))
            .data(obj)
            .build();

    return ResponseEntity.status(HttpStatus.OK.value()).body(responseDTO);//

  }

  public static DeferredResult<ResponseEntity<?>> errorDeferredResult(Exception e ) {
    DeferredResult<ResponseEntity<?>> deferredResult = new DeferredResult<>();

    ResponseDTO responseDTO = ResponseDTO.builder()
            .code(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()))
            .message(e.getMessage())
            .error("Exception")
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .path(RequestUtils.getHttpServletRequest().getRequestURL().toString())
            .timestamp(String.valueOf(new Timestamp(System.currentTimeMillis())))
            .build();

    deferredResult .setResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(responseDTO));
    return deferredResult ;

  }

}
