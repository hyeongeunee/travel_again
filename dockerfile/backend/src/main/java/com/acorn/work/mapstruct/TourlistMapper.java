package com.acorn.work.mapstruct;

import com.acorn.work.dto.TourlistDTO;
import com.acorn.work.entity.TourlistEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TourlistMapper extends StructMapper<TourlistDTO, TourlistEntity> {
    TourlistMapper INSTANCE = Mappers.getMapper(TourlistMapper.class);

    // extends StructMapper<D,E>로 코드 반복 작성 줄임
//    TourListDTO toTourlistDTO(TourlistEntity tourlistEntity);
//    List<TourListDTO> toTourListDTOs(List<TourlistEntity> tourlistEntities);
//
//    TourlistEntity toTourlistEntity(TourListDTO tourlistDTO);
//    List<TourlistEntity> toTourlistEntitys(List<TourListDTO> tourlistDTO);


}