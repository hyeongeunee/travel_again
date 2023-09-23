package com.acorn.work.service;

import com.acorn.core.common.dto.ResponsePageDTO;
import com.acorn.work.dto.TourlistConditionReqDTO;
import com.acorn.work.dto.TourlistDTO;
import com.acorn.work.entity.TourlistEntity;
import com.acorn.work.mapstruct.TourlistMapper;
import com.acorn.work.repository.TourlistCustomRepositoryImpl;
import com.acorn.work.repository.TourlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TourlistService {

    private final TourlistRepository tourlistRepository;

    private final TourlistCustomRepositoryImpl tourlistCustomRepository;

    public ResponsePageDTO getTourlistPageOnAreacode(String areacode, Pageable pageable){
        Page<TourlistEntity> tourlistEntityPage= tourlistRepository.findByAreacodeOrderByRecommendCountDesc(areacode,pageable);
//        System.out.println(tourlistEntityPage.getContent());
        return ResponsePageDTO.setResponsePageDTO(tourlistEntityPage);
    }

    public List<TourlistDTO> getTourlist() {
        List<TourlistEntity> tourlistEntities = tourlistRepository.findAll();
        return TourlistMapper.INSTANCE.toDTOs(tourlistEntities);
    }

    public ResponsePageDTO getTourlistPage(Pageable pageable) {
        Page<TourlistEntity> tourlistEntityPage = tourlistRepository.findAll(pageable);
        return ResponsePageDTO.setResponsePageDTO(tourlistEntityPage);
    }


    /**
     * title검색 , page 가 적용된 List
     * @param title
     * @param pageable
     * @return List
     */
    public List<TourlistDTO> getTourlistByTitle(String title, Pageable pageable) {
        List<TourlistEntity> tourlistEntities = tourlistRepository.findByTitleContains(title, pageable);
        return TourlistMapper.INSTANCE.toDTOs(tourlistEntities);
    }

    /**
     * title검색, page 가 적용된 page(page정보까지 같이 return)
     * Page<T>, Slice<T> 페이징 관련 속성 사용
     * @param title
     * @param pageable
     * @return Page
     */
    public ResponsePageDTO getTourlistPageByTitle(String title, Pageable pageable) {
        Page<TourlistEntity> tourlistEntityPage = tourlistRepository.findTourlistEntitiesByTitleContains(title, pageable);
        return ResponsePageDTO.setResponsePageDTO(tourlistEntityPage);
    }


    public List<TourlistDTO> findTourlist(TourlistConditionReqDTO tourlistConditionReqDTO,Pageable pageable) {
        return tourlistRepository.findTourlist(tourlistConditionReqDTO);
    }

    public Page<TourlistDTO> findTourlistPage(TourlistConditionReqDTO tourlistConditionReqDTO, Pageable pageable){
        return  tourlistRepository.findTourlistPage(tourlistConditionReqDTO,pageable);
    }

    public List<TourlistDTO> getTourlistByRec(Pageable pageable){
        return TourlistMapper.INSTANCE.toDTOs(tourlistRepository.findAllByOrderByRecommendCountDesc(pageable));
    }

    public List<TourlistDTO> getTourlistByAdd(Pageable pageable) {
        return TourlistMapper.INSTANCE.toDTOs(tourlistRepository.findAllByOrderByAddCountDesc(pageable));
    }

}
