package com.acorn.work.servicees.tour.repository;

import com.acorn.work.servicees.tour.doc.TourListDoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Highlight;
import org.springframework.data.elasticsearch.annotations.HighlightField;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourListDocRepository extends ElasticsearchRepository<TourListDoc, String> , TourListDocCustomRepository{

    List<TourListDoc> findAll();
    List<TourListDoc> findByTitle(String title);
    Page<TourListDoc> findByTitle(String title, Pageable pageable);

    List<TourListDoc> findByOverview(String overview);


    Page<TourListDoc> findByOverview(String overview, Pageable pageable);

    @Highlight(fields = {
            @HighlightField(name = "overview"),
            @HighlightField(name = "title")
    })
    Page<SearchHit<TourListDoc>> findHitsByOverview(String overview, Pageable pageable);

    List<TourListDoc> findByOrderByAddCountDesc(Pageable pageable);
    List<TourListDoc> findByOrderByRecommendCountDesc(Pageable pageable);

    Page<TourListDoc> findByTitleOrOverviewOrAddr1(String title, String overview, String addr1, Pageable pageable);

    List<TourListDoc> findByAreacodeOrderByRecommendCountDesc(String areacode,Pageable pageable);

    List<TourListDoc> findByOrderByTitleDesc();

    List<TourListDoc> findByOrderByRatingDesc(Pageable pageable);

    Page<TourListDoc> findByAreacodeAndTitleOrOverviewOrAddr1(String areacode, String title, String overview, String addr1,Pageable pageable);

    Page<TourListDoc> findByAreacodeAndOverview(String areacode, String overview, Pageable pageable);
}