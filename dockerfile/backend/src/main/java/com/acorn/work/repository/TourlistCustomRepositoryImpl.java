package com.acorn.work.repository;

import com.acorn.work.dto.TourlistConditionReqDTO;
import com.acorn.work.dto.TourlistDTO;
import com.acorn.work.entity.QTourlistEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.FactoryExpressionBase;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class TourlistCustomRepositoryImpl implements TourlistCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QTourlistEntity qTourlistEntity = QTourlistEntity.tourlistEntity;


    @Override
    public List<TourlistDTO> findTourlist(TourlistConditionReqDTO tourCondition) {

        // Tuple 을 객체로 변환 하기 위함
        return jpaQueryFactory.select(makeProjectiosBean())
                .from(qTourlistEntity)
                .where(condition(tourCondition))
                .fetch();
    }

    @Override
    public Page<TourlistDTO> findTourlistPage(TourlistConditionReqDTO tourCondition, Pageable pageable) {

        // Querydsl이 제공하는 fetchResults() 를 사용하면 내용과 전체 카운트를 한번에 조회할 수 있다.
        // (실제 쿼리는 2번 호출
        List<TourlistDTO> tourlistDTOs = jpaQueryFactory.select(makeProjectiosBean())
                .from(qTourlistEntity)
                .where(condition(tourCondition))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory.select(qTourlistEntity.count())
                .from(qTourlistEntity)
                .where(condition(tourCondition));

        return PageableExecutionUtils.getPage(tourlistDTOs, pageable, countQuery:: fetchOne );
    }

    @Override
    public Page<TourlistDTO> findTourlistPageComplex(TourlistConditionReqDTO tourCondition, Pageable pageable) {
        List<TourlistDTO> tourlistDTOs = jpaQueryFactory.select(makeProjectiosBean())
                .from(qTourlistEntity)
                .where(condition(tourCondition))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory.select(qTourlistEntity.count())
                .from(qTourlistEntity)
                .where(condition(tourCondition));

        return PageableExecutionUtils.getPage(tourlistDTOs, pageable, countQuery:: fetchOne );
    }



    private FactoryExpressionBase<TourlistDTO> makeProjectiosBean() {
        return Projections.bean(TourlistDTO.class,
                qTourlistEntity.contentid ,
                qTourlistEntity.contenttypeid,
                qTourlistEntity.cat1,
                qTourlistEntity.cat2,
                qTourlistEntity.cat3,
                qTourlistEntity.title ,
                qTourlistEntity.addr1 ,
                qTourlistEntity.mlevel,
                qTourlistEntity.areacode ,
                qTourlistEntity.sigungucode ,
                qTourlistEntity.firstimage ,
                qTourlistEntity.overview ,
                qTourlistEntity.mapx ,
                qTourlistEntity.mapy );
    }

    private ConstructorExpression<TourlistDTO>  makeProjectiosConstructor() {
        return Projections.constructor(TourlistDTO.class, qTourlistEntity);
    }


    private BooleanBuilder condition(TourlistConditionReqDTO tourCondition) {
        return new BooleanBuilder(ExpressionUtils.allOf(titleContains(tourCondition.getTitle()),
                addr1Contains(tourCondition.getAddr1()),
                sigungucodeContains(tourCondition.getSigungucode())
        ));

    }

    private BooleanExpression titleContains(String value) {
        return StringUtils.isNotEmpty(value) ?
                qTourlistEntity.title.contains(value) :
                null;
    }

    private BooleanExpression sigungucodeContains(String value) {
        return StringUtils.isNotEmpty(value) ?
                qTourlistEntity.sigungucode.contains(value) :
                null;
    }

    private BooleanExpression addr1Contains(String value) {
        return StringUtils.isNotEmpty(value) ?
                qTourlistEntity.addr1.contains(value) :
                null;
    }

}