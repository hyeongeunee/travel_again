package com.acorn.work.service;

import com.acorn.core.common.dto.ResponsePageDTO;
import com.acorn.core.utils.UuidUtils;
import com.acorn.work.dto.PlannerDTO;
import com.acorn.work.dto.PlannerTourlistDTO;
import com.acorn.work.entity.PlannerEntity;
import com.acorn.work.mapstruct.PlannerMapper;
import com.acorn.work.mapstruct.PlannerTourlistMapper;
import com.acorn.work.repository.PlannerRepository;
import com.acorn.work.repository.PlannerTourlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlannerService {

    private final PlannerRepository plannerRepository;

    private final PlannerTourlistRepository plannerTourlistRepository;

    public void plannerInsert(PlannerDTO plannerDTO){
        String plannerNo = UuidUtils.getUUID();
        plannerDTO.setPlannerNo(plannerNo);
        plannerRepository.save(PlannerMapper.INSTANCE.toEntity(plannerDTO));

        List<PlannerTourlistDTO> plannerTourlistDTOS = plannerDTO.getPlannerTourlistDTOS();
//        System.out.println(plannerTourlistDTOS.toString());

        for (PlannerTourlistDTO plannerTourlistDTO : plannerTourlistDTOS) {
            plannerTourlistDTO.setPlannerNo(plannerNo);
        }
//        System.out.println(plannerTourlistDTOS.toString());


        plannerTourlistRepository.saveAll(PlannerTourlistMapper.INSTANCE.toEntities(plannerTourlistDTOS));


    }
    public PlannerDTO plannerDetail(String plannerNo){
        // Optional -> plannerDTO
        PlannerDTO plannerDTO = PlannerMapper.INSTANCE.toDTO(plannerRepository.findByPlannerNo(plannerNo).get());
        System.out.println(plannerDTO);
        // Planner에 대한 상세정보 plannerTourlist
        List<PlannerTourlistDTO> plannerTourlistDTOS = PlannerTourlistMapper.INSTANCE.toDTOs(plannerTourlistRepository.findByPlannerNo(plannerNo));
        System.out.println(plannerTourlistDTOS);
        plannerDTO.setPlannerTourlistDTOS(plannerTourlistDTOS);

        return plannerDTO;
    }


    public ResponsePageDTO plannerListPageByMemberId(String memberId, Pageable pageable) {

        Page<PlannerEntity> plannerEntityPage = plannerRepository.findAllByMemberId(memberId,pageable);
        return ResponsePageDTO.setResponsePageDTO(plannerEntityPage);
    }


    public ResponsePageDTO plannerListPage(Pageable pageable) {

        Page<PlannerEntity> plannerEntityPage = plannerRepository.findAll(pageable);
        return ResponsePageDTO.setResponsePageDTO(plannerEntityPage);
    }

}
