package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.NewsletterRequest;

public interface NewsletterService {
    void subscribe(NewsletterRequest request);
}
