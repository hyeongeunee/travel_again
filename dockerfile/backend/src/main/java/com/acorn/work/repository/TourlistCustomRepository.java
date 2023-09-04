package com.acorn.work.repository;

import com.acorn.work.dto.TourlistConditionReqDTO;
import com.acorn.work.dto.TourlistDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TourlistCustomRepository {
    List<TourlistDTO> findTourlist(TourlistConditionReqDTO tourlistConditionReqDTO);
    Page<TourlistDTO> findTourlistPage(TourlistConditionReqDTO tourlistConditionReqDTO,
                                       Pageable pageable);
    Page<TourlistDTO> findTourlistPageComplex(TourlistConditionReqDTO tourlistConditionReqDTO, Pageable pageable);


}