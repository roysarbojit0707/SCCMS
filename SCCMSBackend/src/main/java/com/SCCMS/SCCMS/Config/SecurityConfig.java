package com.SCCMS.SCCMS.Config;

//import com.backend.FireFlyBackend.Service.CustomOAuth2UserService;
//import org.springframework.beans.factory.annotation.Autowired;
import com.SCCMS.SCCMS.Service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CustomOAuth2UserService customOAuth2UserService) throws Exception {
        http
                .cors(Customizer.withDefaults()) // or `.cors(Customizer.withDefaults())` if you want to enable it
                .csrf(AbstractHttpConfigurer::disable) // ✅ disable CSRF for API endpoints
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/","/login**").permitAll()
                        .requestMatchers("/check/**").permitAll()
                        .requestMatchers("/contact/**","/complain/**").permitAll()// ✅ Allow public access
                        .anyRequest().authenticated() // ✅ Everything else requires auth
                )
                .oauth2Login(oauth2->oauth2
                        .userInfoEndpoint(userInfo->userInfo
                                .userService(customOAuth2UserService))
                        .defaultSuccessUrl("/redirect",true));

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}