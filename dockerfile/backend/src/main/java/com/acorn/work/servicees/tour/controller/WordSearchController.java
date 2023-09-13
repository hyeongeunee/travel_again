package com.acorn.work.servicees.tour.controller;

import com.acorn.core.utils.ResponseUtils;
import com.acorn.work.servicees.tour.service.WordSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/wordSearch")
public class WordSearchController {

    private final WordSearchService wordSearchService;

    @PutMapping("/{words}")
    public ResponseEntity saveWordSearch(@PathVariable String words) {
        System.out.println(words);
        return ResponseUtils.completed(wordSearchService.saveWordSearch(words));
    }

    @GetMapping("/getTags/{fieldname}/{size}")
    public ResponseEntity saveWordSearch(@PathVariable String fieldname,
                                         @PathVariable int size) throws IOException {
        return ResponseUtils.completed(wordSearchService.getTopTags(fieldname, size));
    }

    @GetMapping("/savedb")
    public ResponseEntity saveWordSearchDTO () throws IOException{
        wordSearchService.saveWordCount();
        return ResponseUtils.completed("ok");
    }

    @GetMapping("/comp")
    public ResponseEntity comparisonCount() throws IOException{
        return ResponseUtils.completed(wordSearchService.comparisonWord());

    }

}