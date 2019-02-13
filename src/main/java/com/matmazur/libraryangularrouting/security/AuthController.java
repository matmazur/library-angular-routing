package com.matmazur.libraryangularrouting.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class AuthController {

    @PostMapping("/login")
    @ResponseBody
    public Principal login(Principal user) {
        System.out.println("principal " + user);
        return user;
    }

}
