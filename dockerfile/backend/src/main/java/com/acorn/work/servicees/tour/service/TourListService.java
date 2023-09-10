package com.acorn.work.servicees.tour.service;

import com.acorn.core.utils.UuidUtils;
import com.acorn.work.es.dto.ResponsePageDTO;
import com.acorn.work.es.dto.searchresponse.SearchResDTO;
import com.acorn.work.servicees.tour.doc.TourListDoc;
import com.acorn.work.servicees.tour.dto.TourListEcDTO;
import com.acorn.work.servicees.tour.dto.TourListeReqDTO;
import com.acorn.work.servicees.tour.mapper.EcMapper;
import com.acorn.work.servicees.tour.repository.TourListDocRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class TourListService {

    private final TourListDocRepository tourListDocRepository;
//    private final SearchDocRepository searchDocRepository;

    // 테스트용
    public List<TourListEcDTO> getTourList() {
        List<TourListDoc> tourListDocs = tourListDocRepository.findAll();
        return EcMapper.INSTANCE.toTourListEcDTOs(tourListDocs);
    }

    public List<TourListEcDTO> getTourListByTitle(String title) {
        List<TourListDoc>  tourListDocs = tourListDocRepository.findByTitle(title);
        return  EcMapper.INSTANCE.toTourListEcDTOs(tourListDocs);

    }

    public ResponsePageDTO getTourListByTitle(String title, Pageable pageable) {
        Page<TourListDoc> tourListDocPage = tourListDocRepository.findByTitle(title, pageable);
        return  ResponsePageDTO.setResponsePageDTO(tourListDocPage);

    }

    public List<TourListEcDTO> getTourListByOverview(String overview) {
        return EcMapper.INSTANCE.toTourListEcDTOs(tourListDocRepository.findByOverview(overview));
    }



    public ResponsePageDTO getTourListByOverview(String overview, Pageable pageable) {
        Page<TourListDoc> tourListDocPage = tourListDocRepository.findByOverview(overview, pageable);
        return  ResponsePageDTO.setResponsePageDTO(tourListDocPage);

    }

    public ResponsePageDTO findHitsByOverview(String overview, Pageable pageable) {
        Page<SearchHit<TourListDoc>> tourListDocPage = tourListDocRepository.findHitsByOverview(overview, pageable);
        return ResponsePageDTO.setResponsePageDTO(tourListDocPage);

    }


    public ResponsePageDTO getTourList(String searchValue,Pageable pageable) {
        Page<TourListDoc> tourListDocPage = tourListDocRepository.findByTitleOrOverviewOrAddr1(searchValue,searchValue,searchValue,pageable
        );
        return ResponsePageDTO.setResponsePageDTO(tourListDocPage);
    }

    public SearchResDTO findTourListDocByMatch(TourListeReqDTO tourListeReqDTO) {
        return tourListDocRepository.getQueryMatch(tourListeReqDTO, TourListEcDTO.class);

    }

    public List<TourListDoc> getTourlistByAddCount() {
        Pageable pageable = PageRequest.of(0,5);
        return tourListDocRepository.findByOrderByAddCountDesc(pageable);
    }

    public List<TourListDoc> getTourlistByRecommendCount() {
        Pageable pageable = PageRequest.of(0,5);
        return tourListDocRepository.findByOrderByRecommendCountDesc(pageable);

    }

//    public boolean saveSearchValue(String searchValue){
//
//        SearchDoc.SearchDocBuilder searchDoc = SearchDoc.builder();
//        searchDoc.word(searchValue);
//
//        searchDocRepository.save(searchDoc.build());
//        return true;
//    }

    public boolean updateCount() {
        updateTourListIdRecommendCount();
        updateTourListIdAddCount();
        return true;
    }

    private void updateTourListIdRecommendCount() {
        int tourListIdRecommendCount = UuidUtils.getRandom(4900, 1);
        Optional<TourListDoc> tourListDocOp = tourListDocRepository.findById(String.valueOf(tourListIdRecommendCount));

        if (tourListDocOp.isPresent())  {

            TourListDoc tourListDoc = tourListDocOp.get();
            log.debug("RecommendCount 이전 : " + tourListDoc.getRecommendCount());
            tourListDoc.setRecommendCount(tourListDoc.getRecommendCount()+10);
            log.debug("RecommendCount 이후 : " + tourListDoc.getRecommendCount());
            tourListDocRepository.save(tourListDoc);
        }

    }

    private void updateTourListIdAddCount() {
        int tourListIdRecommendCount = UuidUtils.getRandom(4900, 1);
        Optional<TourListDoc> tourListDocOp = tourListDocRepository.findById(String.valueOf(tourListIdRecommendCount));

        if (tourListDocOp.isPresent())  {
            TourListDoc tourListDoc = tourListDocOp.get();
            log.debug("addCount 이전 : " + tourListDoc.getAddCount());
            tourListDoc.setAddCount(tourListDoc.getAddCount() + 10);
            log.debug("addCount 이후 : " + tourListDoc.getAddCount());
            tourListDocRepository.save(tourListDoc);
        }

    }


}