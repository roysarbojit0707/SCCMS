package com.SCCMS.SCCMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SccmsApplication {

	public static void main(String[] args) {
		new EnvLoader();
		SpringApplication.run(SccmsApplication.class, args);
	}

}
