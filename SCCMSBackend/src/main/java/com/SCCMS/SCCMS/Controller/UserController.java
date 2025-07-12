package com.SCCMS.SCCMS.Controller;


import com.SCCMS.SCCMS.DTO.AddUser;
import com.SCCMS.SCCMS.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/registration")
    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){
        String name = addUser.getName().trim();
        String emailId = addUser.getEmailId().trim();
        String password = addUser.getPassword().trim();
        boolean isGenrated = userService.generateOTP(emailId);
        boolean isSend = false;
        if(isGenrated){
            isSend = userService.sendOTPToEmail(name,emailId);
        }
        return Map.of("isSend",isSend);
    }
    @PostMapping("/verifyOtp")
    public Map<String,Boolean> verifyTheOTP(@RequestParam String otp,String emailId, String name,String password){
        boolean isVerified = userService.verifyOTP(emailId,otp);
        boolean isSuccessfullyRegister = false;
        if(isVerified){
            isSuccessfullyRegister = userService.successRegister(name,emailId,password);
            return Map.of("isSuccessfullyRegister",isSuccessfullyRegister);
        }else{
            return Map.of("isVerfied",isVerified);
        }
    }
    @PostMapping("/login")
    public Map<String,String> LoginUser(@RequestParam String emailId, String password){
        String result = userService.SuccessfullyLogin(emailId,password);
        return Map.of("result",result);
    }
}