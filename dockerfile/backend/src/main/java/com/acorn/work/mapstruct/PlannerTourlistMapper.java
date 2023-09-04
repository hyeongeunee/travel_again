package com.acorn.work.mapstruct;


import com.acorn.work.dto.PlannerTourlistDTO;
import com.acorn.work.entity.PlannerTourlistEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/*
    PlannerTourlistDTO 아직 없음
 */
@Mapper
public interface PlannerTourlistMapper extends StructMapper<PlannerTourlistDTO, PlannerTourlistEntity> {
    PlannerTourlistMapper INSTANCE = Mappers.getMapper(PlannerTourlistMapper.class);
}
