package com.rpm.web;


import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@EnableBatchProcessing
public class RpmApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(RpmApplication.class, args);
    }
}
