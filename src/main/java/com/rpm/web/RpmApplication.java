package com.rpm.web;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class RpmApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(RpmApplication.class, args);
    }
}
