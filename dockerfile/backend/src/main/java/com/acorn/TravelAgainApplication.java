package com.acorn;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaRepositories(basePackages = {"com.acorn.core.*", "com.acorn.example.*","com.acorn.work.*"})
@EnableJpaAuditing
@EnableElasticsearchRepositories(basePackages = "com.acorn.*")
@ComponentScan(basePackages = {"com.acorn.*"})
@SpringBootApplication
@RequiredArgsConstructor
public class TravelAgainApplication {

//    PasswordEncoder encoder = new BCryptPasswordEncoder();
//    private final UsersRepository usersRepository;

    // 객체 생성후 자동 호출될 메소드
//    @PostConstruct
//    public void initMembers() {
//        //DB 에 Sample 데이터를 저장하기
////        List<Member> list=new ArrayList<Member>();
////        list.add(new Member(0, "김구라", "노량진"));
////        list.add(new Member(0, "해골", "행신동"));
////        list.add(new Member(0, "원숭이", "동물원"));
////
////        repo.saveAll(list);
////
////        UsersEntity user1 = new UsersEntity();
////        user1.setUserName("aaaa");
////        user1.setPassword(encoder.encode("bbbb"));
////        user1.setEmail("cccc@naver.com");
////
////        usersRepository.save(user1);
//
//
//    }

    public static void main(String[] args) {
    SpringApplication.run(TravelAgainApplication.class, args);
}

}