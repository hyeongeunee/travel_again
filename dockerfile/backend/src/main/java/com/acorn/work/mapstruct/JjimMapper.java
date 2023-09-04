package com.acorn.work.mapstruct;

import com.acorn.work.dto.JjimDTO;
import com.acorn.work.entity.JjimEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface JjimMapper extends StructMapper<JjimDTO, JjimEntity> {
    JjimMapper INSTANCE = Mappers.getMapper(JjimMapper.class);
}
