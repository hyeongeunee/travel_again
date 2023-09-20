package com.acorn.work.servicees.demo.service;

import com.acorn.core.utils.UuidUtils;

import com.acorn.work.servicees.demo.connector.ESClientConnector;
import com.acorn.work.servicees.demo.dto.DemoDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ESDemoService {

    private final ESClientConnector esClientConnector;

    public String insertDemo(DemoDTO demoDTO)  {
        if (StringUtils.isEmpty(demoDTO.getUuid())) {
            demoDTO.setUuid(UuidUtils.getUUID());
        }
        return esClientConnector.insertDemo(demoDTO);
    }

    public DemoDTO fetchDemoDTOById(String id) {
        return esClientConnector.retrieveDemoDTOById(id);
    }
}