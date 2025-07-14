package com.SCCMS.SCCMS.Service;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import java.awt.Color;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;

@Service
public class PdfEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void generateAndSendPdf(String complainToken,String fullName,String email,String building,String apartmentNumber,String department,String complain) throws MessagingException {
        // Step 1: Generate PDF in memory
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, Color.BLUE);
        Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, Color.BLACK);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.BLACK);
        Font italicFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10, Color.GRAY);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();
        document.addTitle("Complaint Report");
        document.add(new Paragraph("Complaint Details", titleFont));
        document.add(Chunk.NEWLINE);

        document.add(new Paragraph("Complaint Token: " + complainToken));
        document.add(new Paragraph("Full Name: " + fullName));
        document.add(new Paragraph("Email: " + email));
        document.add(new Paragraph("Building: " + building));
        document.add(new Paragraph("Apartment Number: " + apartmentNumber));
        document.add(new Paragraph("Department: " + department));
        document.add(Chunk.NEWLINE);

        document.add(new Paragraph("Complaint Description:",titleFont));
        document.add(new Paragraph(complain));
        document.add(Chunk.NEWLINE);

        document.add(new Paragraph("Submitted on: " + LocalDateTime.now()));
        document.add(Chunk.NEWLINE);

        document.add(new Paragraph("Thank you for reporting. Our team will take appropriate action soon.", new Font(Font.BOLD, 12, Font.ITALIC, Color.GRAY)));
        document.close();

        // Step 2: Send PDF as email attachment
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true);

        messageHelper.setFrom("sarbojitroy08986@gmail.com");
        messageHelper.setTo(email);
        messageHelper.setSubject("OTP for our Verification: UrbanEcho");
        messageHelper.setText("Hi, Please find attached the dynamically generated PDF.");

        ByteArrayResource pdfAttachment = new ByteArrayResource(baos.toByteArray());
        messageHelper.addAttachment("generated.pdf", pdfAttachment);

        javaMailSender.send(mimeMessage);
        System.out.println("PDF generated and email sent.");
    }
}
