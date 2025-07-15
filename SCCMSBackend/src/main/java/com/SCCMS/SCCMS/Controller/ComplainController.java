package com.SCCMS.SCCMS.Controller;

import com.SCCMS.SCCMS.DTO.ComplainDTO;
import com.SCCMS.SCCMS.Service.ComplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/complain")
public class ComplainController {
    @Autowired
    private ComplainService complainService;
    @PostMapping("/registercomplain")
    public Map<String,Boolean> RegisterComplain(@RequestBody ComplainDTO complainDTO){
        String complainToken = complainService.generateComplainToken();
        String fullName = complainDTO.getFullName();
        String emailAddress = complainDTO.getEmailAddress();
        String phoneNumber = complainDTO.getPhoneNumber();
        String governmentIDType = complainDTO.getGovernmentIDType();
        String building = complainDTO.getBuilding();
        String apartmentNumber = complainDTO.getApartmentNumber();
        String department = complainDTO.getDepartment();
        String complain = complainDTO.getComplain();
        String timeSlot = complainDTO.getTimeSlot();
        boolean isComplainRegister = complainService.ComplainRegister(complainToken,fullName,emailAddress,phoneNumber,governmentIDType,building,apartmentNumber,department,complain,timeSlot);
        return Map.of("isComplainRegister",isComplainRegister);
    }
}
