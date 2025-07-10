package com.amanda.healthCare.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class OpenRoteService {

    @Value( "${open.route.api.key}")
    private String openRouteServiceKey;

    public String askForAI(String question) {
        HttpClient client = HttpClient.newHttpClient();


        String payload = String.format("""
        {
          "model": "deepseek/deepseek-chat",
          "messages": [
            {
              "role": "system",
              "content": "Você é um assistente médico que responde de forma simples, resumida e clara. Organize tudo em tópicos curtos, com linguagem acessível para qualquer pessoa. Evite explicações longas ou técnicas. Retorne como MarkDown padrão  "
            },
            {
              "role": "user",
              "content": "%s"
            }
          ]
        }
        """, question);
        System.out.println(payload);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://openrouter.ai/api/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + openRouteServiceKey)
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        HttpResponse<String> response;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.body());
            return root.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
