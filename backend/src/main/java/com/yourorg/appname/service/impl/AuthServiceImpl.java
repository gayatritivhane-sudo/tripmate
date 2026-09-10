package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.LoginRequest;
import com.yourorg.appname.dto.request.RegisterRequest;
import com.yourorg.appname.dto.response.AuthResponse;
import com.yourorg.appname.dto.response.UserResponse;
import com.yourorg.appname.entity.User;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.UserMapper;
import com.yourorg.appname.repository.UserRepository;
import com.yourorg.appname.security.JwtUtil;
import com.yourorg.appname.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmailOrUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByUsername(userDetails.getUsername())
                .or(() -> userRepository.findByEmail(userDetails.getUsername()))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = jwtUtil.generateToken(user.getUsername(), user.getId(), user.getEmail(), user.getRole());
        UserResponse userResponse = userMapper.toResponse(user);

        return new AuthResponse(token, userResponse);
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        String avatarUrl = registerRequest.getAvatarUrl();
        if (avatarUrl == null || avatarUrl.isBlank()) {
            avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBjgAdVGDCQLNyVKWYVFxqoDbMqTEwWnTQmPEFlHbdpLBlq2Ku21nfCQQwetE2bLdhp8e7GjEMs-vrQi6QGFm7yeg20WfQ9ohhHIi8EkhNdm6--n45mS8DtW4-lKtw1FmAs6i0PQ7zwHCO4OdJ0j9Vo-6IbYem8LRr9oZnZh9hGmx3ZQFdEqF6J9g6qIozJyJwj4Huzw8fgLMwit6pNiE6EpqVoLhrsFrbJEQfv59fFvXAm_Dvk9Bl-";
        }

        User user = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                encodedPassword,
                registerRequest.getFullName(),
                avatarUrl,
                "ROLE_USER"
        );

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getId(), savedUser.getEmail(), savedUser.getRole());
        UserResponse userResponse = userMapper.toResponse(savedUser);

        return new AuthResponse(token, userResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String usernameOrEmail) {
        User user = userRepository.findByUsername(usernameOrEmail)
                .or(() -> userRepository.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toResponse(user);
    }
}
