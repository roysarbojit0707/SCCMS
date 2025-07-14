package com.SCCMS.SCCMS.Service;

import com.SCCMS.SCCMS.Entity.ComplainEntity;
import com.SCCMS.SCCMS.Entity.UserEntity;
import com.SCCMS.SCCMS.Repository.ComplainRepository;
import com.SCCMS.SCCMS.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ComplainService {
    private static final int tokenLenght = 10;
    @Autowired
    private ComplainRepository complainRepository;
    @Autowired
    private PdfEmailService pdfEmailService;
    @Autowired
    private UserRepository userRepository;
    public boolean ComplainRegister(String complainToken,String fullName,String emailAddress,String phoneNumber, String governmentIDType,String building,String apartmentNumber,String department,String complain){
        try{
            Optional<UserEntity> ue = userRepository.findById(emailAddress);
            if(ue.isPresent()){
                ComplainEntity complainEntity = new ComplainEntity(complainToken,emailAddress,fullName,phoneNumber,governmentIDType,building,apartmentNumber,department,complain);
                complainRepository.save(complainEntity);
                pdfEmailService.generateAndSendPdf(complainToken,fullName,emailAddress,building,apartmentNumber,department,complain);
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public String generateComplainToken(){
        String generatedToken = "";
        for(int i = 1; i<= tokenLenght; i++){
            generatedToken += String.valueOf((int)(Math.random()*9)+1);
        }
        return generatedToken;
    }
}
