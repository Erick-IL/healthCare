package com.amanda.healthCare.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // Para testes, remover em ambiente de produção
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/panel/**", "/img/**", "/css/**", "/js/**").permitAll()
                        // .requestMatchers("/admin/).hasRole("ADMIN")
                        .anyRequest().permitAll()
                );
        return http.build();
    }
}