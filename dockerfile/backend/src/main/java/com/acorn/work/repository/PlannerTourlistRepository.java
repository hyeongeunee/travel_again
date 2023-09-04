package com.acorn.work.repository;

import com.acorn.work.entity.PlannerTourlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlannerTourlistRepository extends JpaRepository<PlannerTourlistEntity,String> {
    List<PlannerTourlistEntity> findByPlannerNo(String plannerNo);

}
