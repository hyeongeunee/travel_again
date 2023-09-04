package com.acorn.work.repository;

import com.acorn.work.entity.PlannerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlannerRepository extends JpaRepository<PlannerEntity, String > {

    Optional<PlannerEntity> findByPlannerNo(String plannerNo);
    Page<PlannerEntity> findAllByMemberId(String memberId, Pageable pageable);




}