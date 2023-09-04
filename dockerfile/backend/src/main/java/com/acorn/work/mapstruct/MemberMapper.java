package com.acorn.work.mapstruct;

import com.acorn.work.dto.MemberDTO;
import com.acorn.work.entity.MemberEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper extends StructMapper<MemberDTO, MemberEntity> {
    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);
}
