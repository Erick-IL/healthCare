package com.amanda.healthCare.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/panel")
public class PanelController {

    @GetMapping
    public String loginPage() {
        return "loginPage";
    }

    @GetMapping("/dashboard")
    public String dashboardPage(Model model) {
        model.addAttribute("activePage", "dashboard");
        return "dashboard";
    }

    @GetMapping("/documents")
    public String documentsPage(Model model) {
        model.addAttribute("activePage", "documents");
        return "documents";
    }

    @GetMapping("/consultations")
    public String consultationsPage(Model model) {
        model.addAttribute("activePage", "consultations");
        return "onlineConsultations";
    }

    @GetMapping("/profile")
    public String profilePage(Model model) {
        model.addAttribute("activePage", "profile");
        return "profile";
    }

    @GetMapping("/symptom-quiz")
    public String symptomQuizPage(Model model) {
        model.addAttribute("activePage", "symptom-quiz");
        return "symptomQuiz";
    }

    @GetMapping("procedures")
    public String proceduresPage(Model model) {
        model.addAttribute("activePage", "procedures");
        return "procedures";
    }

    @GetMapping("appointments")
    public String appointmentsPage(Model model) {
        model.addAttribute("activePage", "appointments");
        return "appointments";
    }

}
