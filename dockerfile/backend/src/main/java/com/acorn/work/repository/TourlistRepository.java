package com.acorn.work.repository;

import com.acorn.work.entity.TourlistEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourlistRepository extends JpaRepository<TourlistEntity, String >, TourlistCustomRepository {
    Page<TourlistEntity> findByAreacodeOrderByRecommendCountDesc(String areacode, Pageable pageable);

    List<TourlistEntity> findByTitleContains(String title, Pageable pageable);

    Page<TourlistEntity> findTourlistEntitiesByTitleContains(String title, Pageable pageable);


    List<TourlistEntity> findAllByOrderByRecommendCountDesc(Pageable pageable);

    List<TourlistEntity> findAllByOrderByAddCountDesc(Pageable pageable);
}