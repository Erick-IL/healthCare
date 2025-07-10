package com.amanda.healthCare.controller;


import com.amanda.healthCare.service.OpenRoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
public class AIController {

    private final OpenRoteService openRoteService;

    public AIController(OpenRoteService openRoteService) {
        this.openRoteService = openRoteService;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askForAI(@RequestBody String question) {
        return ResponseEntity.ok(openRoteService.askForAI(question));
    }
}
