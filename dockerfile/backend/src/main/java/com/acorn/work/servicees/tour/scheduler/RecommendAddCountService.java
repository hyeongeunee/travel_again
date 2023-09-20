package com.acorn.work.servicees.tour.scheduler;


import com.acorn.work.servicees.tour.service.TourListService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RecommendAddCountService {


    private final TourListService tourListService;

    @Scheduled(initialDelay = 60000, fixedDelay = 60000 )
    public void scheduledJob() {
        tourListService.updateCount();
    }
}