package com.example.hcmiuweb.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.example.hcmiuweb.controllers.TestController;
import com.example.hcmiuweb.config.jwt.JwtUtils;
import com.example.hcmiuweb.services.UserDetailsServiceImpl;

@WebMvcTest(TestController.class) // Specify the controller class explicitly
public class TestControllerTests {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private JwtUtils jwtUtils;
    
    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @Test
    @WithMockUser // This annotation mocks a logged-in user for the test
    public void testGetEndpoint() throws Exception {
        mockMvc.perform(get("/api/test")) // Use the actual endpoint path from your TestController
                .andExpect(status().isOk())
                .andExpect(content().string("Backend is working!"));
    }
}