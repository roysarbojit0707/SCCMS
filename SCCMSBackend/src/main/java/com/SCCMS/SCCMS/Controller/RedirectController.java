package com.SCCMS.SCCMS.Controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class RedirectController {
    @GetMapping("/redirect")
    public String redirectAfterLogin(HttpServletResponse response) throws IOException {
        return "sarbojit";
    }
}
