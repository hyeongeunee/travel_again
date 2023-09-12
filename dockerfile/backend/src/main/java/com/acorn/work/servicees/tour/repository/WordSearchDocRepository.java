package com.acorn.work.servicees.tour.repository;

import com.acorn.work.servicees.tour.doc.WordSearchDoc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordSearchDocRepository extends ElasticsearchRepository<WordSearchDoc, String> {


}