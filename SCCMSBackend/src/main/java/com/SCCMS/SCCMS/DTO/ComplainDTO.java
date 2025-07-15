package com.SCCMS.SCCMS.DTO;

public class ComplainDTO {
    private String fullName;
    private String emailAddress;
    private String phoneNumber;
    private String governmentIDType;
    private String building;
    private String apartmentNumber;
    private String department;
    private String complain;
    private String timeSlot;

    public ComplainDTO() {
    }

    public ComplainDTO(String fullName, String emailAddress, String phoneNumber, String governmentIDType, String building, String apartmentNumber, String department, String complain, String timeSlot) {
        this.fullName = fullName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.governmentIDType = governmentIDType;
        this.building = building;
        this.apartmentNumber = apartmentNumber;
        this.department = department;
        this.complain = complain;
        this.timeSlot = timeSlot;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getComplain() {
        return complain;
    }

    public void setComplain(String complain) {
        this.complain = complain;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
}
