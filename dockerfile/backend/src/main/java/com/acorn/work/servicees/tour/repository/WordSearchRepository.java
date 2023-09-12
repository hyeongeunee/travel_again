package com.acorn.work.servicees.tour.repository;

import com.acorn.work.servicees.tour.entity.WordSearchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordSearchRepository extends JpaRepository<WordSearchEntity,String> {}
