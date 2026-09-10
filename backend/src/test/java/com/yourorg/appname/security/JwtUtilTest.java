package com.yourorg.appname.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtUtil, "jwtExpirationInMs", 86400000L);
    }

    @Test
    void testGenerateAndValidateToken() {
        String username = "alex";
        String token = jwtUtil.generateToken(username, 1L, "alex@tripmate.com", "ROLE_USER");

        assertNotNull(token);
        assertTrue(jwtUtil.validateToken(token));
        assertEquals(username, jwtUtil.getUsernameFromToken(token));
    }

    @Test
    void testTokenClaims() {
        String token = jwtUtil.generateToken("admin", 2L, "admin@tripmate.com", "ROLE_ADMIN");

        assertEquals("admin", jwtUtil.getUsernameFromToken(token));
        assertNotNull(jwtUtil.getExpirationDateFromToken(token));
        assertTrue(jwtUtil.validateToken(token));
    }
}
