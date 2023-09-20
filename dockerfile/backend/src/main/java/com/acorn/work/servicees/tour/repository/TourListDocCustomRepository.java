package com.acorn.work.servicees.tour.repository;

import com.acorn.work.es.dto.searchresponse.SearchResDTO;
import com.acorn.work.servicees.tour.dto.TourListeReqDTO;

public interface TourListDocCustomRepository {

    <T> SearchResDTO getQueryMatch(TourListeReqDTO tourListeReqDTO, T t );

}