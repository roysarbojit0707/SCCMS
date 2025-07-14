package com.SCCMS.SCCMS.DTO;

public class ComplainDTO {
    private String fullName;
    private String emailAddress;
    private String phoneNumber;
    private String governmentIDType;
    private String building;
    private String apartmentNumber;
    private String address;

    public ComplainDTO() {
    }

    public ComplainDTO(String fullName, String emailAddress, String phoneNumber, String governmentIDType, String building, String apartmentNumber, String address) {
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.governmentIDType = governmentIDType;
        this.building = building;
        this.apartmentNumber = apartmentNumber;
        this.address = address;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGovernmentIDType() {
        return governmentIDType;
    }

    public void setGovernmentIDType(String governmentIDType) {
        this.governmentIDType = governmentIDType;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getApartmentNumber() {
        return apartmentNumber;
    }

    public void setApartmentNumber(String apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
