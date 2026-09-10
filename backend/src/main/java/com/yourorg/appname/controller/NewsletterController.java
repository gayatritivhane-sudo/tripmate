package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.NewsletterRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<ApiResponse<Void>> subscribe(@Valid @RequestBody NewsletterRequest request) {
        newsletterService.subscribe(request);
        return ResponseEntity.ok(ApiResponse.ok("Subscribed to newsletter successfully", null));
    }
}
