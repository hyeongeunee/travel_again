package com.acorn.example.jpa.service;

import com.acorn.example.jpa.dto.DemoDTO;
import com.acorn.example.jpa.repository.DemoMapper;
import com.acorn.example.jpa.entity.DemoEntity;
import com.acorn.example.jpa.repository.DemoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class DemoService {

  private final DemoRepository demoRepository;

  public List<DemoDTO> retrieveDemo() {
    List<DemoEntity> demoEntities = demoRepository.findAll();
    log.debug(demoEntities.toString());
    return DemoMapper.INSTANCE.toDemoDTOs(demoEntities);
  }


  public DemoDTO saveDemo(DemoDTO demoDTO ) {
    DemoEntity demoEntity = DemoMapper.INSTANCE.toDemoEntitys(demoDTO);
    DemoEntity demoEntitySave = demoRepository.save(demoEntity);
    return DemoMapper.INSTANCE.toDemoDTO(demoEntitySave);
  }


  public List<DemoDTO> retrieveDemo(String name , Pageable pageable) {
    Page<DemoEntity> demoEntity = demoRepository.findByNameContains(name, pageable);
    List<DemoEntity> demoEntities = demoEntity.getContent();

    return DemoMapper.INSTANCE.toDemoDTOs(demoEntities);
  }


}
