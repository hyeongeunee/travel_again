package com.acorn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@EnableScheduling
@EnableJpaRepositories(basePackages = {"com.acorn.core.*", "com.acorn.example.*","com.acorn.work.*"})
@EnableJpaAuditing
//@EnableElasticsearchRepositories(basePackages = "com.acorn.travelagain.es.*")
@ComponentScan(basePackages = {"com.acorn.*"})
@SpringBootApplication
public class TravelAgainApplication {  public static void main(String[] args) {
    SpringApplication.run(TravelAgainApplication.class, args);
}

}