package com.acorn.work.servicees.tour.mapper;


import com.acorn.work.servicees.tour.doc.TourListDoc;
import com.acorn.work.servicees.tour.doc.WordSearchDoc;
import com.acorn.work.servicees.tour.dto.TourListEcDTO;
import com.acorn.work.servicees.tour.dto.WordSearchDTO;
import com.acorn.work.servicees.tour.dto.WordSearchRspDTO;
import com.acorn.work.servicees.tour.entity.WordSearchEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface EcMapper {

    EcMapper INSTANCE = Mappers.getMapper(EcMapper.class);

    TourListEcDTO  toTourListEcDTO(TourListDoc tourListDoc) ;
    List<TourListDoc> toTourListDOCs(List<TourListEcDTO> tourListEcDTOs) ;


    List<TourListEcDTO> toTourListEcDTOs(List<TourListDoc> tourListDoc) ;

    List<WordSearchDTO> toWordSearchDTOs(List<WordSearchDoc> wordSearchDocs) ;
    List<WordSearchDoc> toWordSearchDocs(List<WordSearchDTO> wordSearchDTOs) ;

    WordSearchDTO toWordSearchDTO(WordSearchDoc wordSearchDoc) ;
    WordSearchDoc toWordSearchDoc(WordSearchDTO wordSearchDTO) ;

    WordSearchRspDTO toWordSearchRspDTO(WordSearchEntity wordSearchEntity);

    WordSearchEntity toWordSearchEntity(WordSearchRspDTO wordSearchRspDTO);

    List<WordSearchRspDTO> toWordSearchRspDTOs(List<WordSearchEntity> wordSearchEntities);
    List<WordSearchEntity> toWordSearchEntities (List<WordSearchRspDTO> wordSearchRspDTOS);

}