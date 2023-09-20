package com.acorn.work.servicees.loading.service;

import com.acorn.core.utils.JsonFileReadUtils;
import com.acorn.core.utils.UuidUtils;
import com.acorn.work.servicees.tour.doc.TourListDoc;
import com.acorn.work.servicees.tour.dto.TourListEcDTO;
import com.acorn.work.servicees.tour.mapper.EcMapper;
import com.acorn.work.servicees.tour.repository.TourListDocRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.Reader;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TourlistLoadingService {
    @Value("${tourlistDir}")
    private String tourlistDir;
    private final TourListDocRepository tourListDOCRepository;
    private final Gson gson;
    public void loadingEcTourlist(@NonNull String filename) {
        Reader reader = JsonFileReadUtils.fileLoad(tourlistDir, filename);
        List<TourListEcDTO> tourlistDTOs =  gson.fromJson(reader,
                new TypeToken<List<TourListEcDTO>>(){}.getType() );

        List<TourListDoc> tourListDocs = EcMapper.INSTANCE.toTourListDOCs(tourlistDTOs);
        int index = 0;
        for (TourListDoc tourListDoc : tourListDocs) {
            index = index + 1;
            tourListDoc.setTourListId(String.valueOf(index));
            if(index%100==0) {
                tourListDoc.setRecommendCount(UuidUtils.getRandomNext(4000, 2000));
                tourListDoc.setAddCount(UuidUtils.getRandomNext(2000, 1000));
            } else {
                tourListDoc.setRecommendCount(UuidUtils.getRandomNext(2000, 100));
                tourListDoc.setAddCount(UuidUtils.getRandomNext(1000, 100));
            }

            tourListDoc.setRating((float) UuidUtils.getRandomNext(48, 25)/10);
            tourListDOCRepository.save (tourListDoc);
            //      i += 1;
            //      if (i > 10 ) break;
        }
    }

    public void loadingTourlist(String filename) {}
}