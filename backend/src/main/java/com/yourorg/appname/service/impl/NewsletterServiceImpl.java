package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.NewsletterRequest;
import com.yourorg.appname.entity.NewsletterSubscriber;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.repository.NewsletterSubscriberRepository;
import com.yourorg.appname.service.NewsletterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NewsletterServiceImpl implements NewsletterService {

    private final NewsletterSubscriberRepository subscriberRepository;

    public NewsletterServiceImpl(NewsletterSubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @Override
    @Transactional
    public void subscribe(NewsletterRequest request) {
        if (subscriberRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already subscribed to the newsletter");
        }
        NewsletterSubscriber subscriber = new NewsletterSubscriber(request.getEmail());
        subscriberRepository.save(subscriber);
    }
}
