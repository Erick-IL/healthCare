package com.amanda.healthCare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/panel")
public class PanelController {

    @GetMapping
    public String homePage() {
        return "base";
    }

    @GetMapping("/panel")
    public String panelPage() {
        return "base2";
    }

}
