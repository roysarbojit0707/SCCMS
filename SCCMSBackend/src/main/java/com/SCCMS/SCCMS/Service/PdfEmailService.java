package com.SCCMS.SCCMS.Service;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Rectangle;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import com.lowagie.text.Document;
import com.lowagie.text.pdf.draw.LineSeparator;

@Service
public class PdfEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void generateAndSendPdf(String complainToken, String fullName, String email,
                                   String building, String apartmentNumber,
                                   String department, String complain, String timeSlot)
            throws MessagingException {

        try {
            // Fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, new Color(34, 45, 67));
            Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.BLACK);
            Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.DARK_GRAY);
            Font sectionTitleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new Color(0, 102, 204));
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, 10, Color.GRAY);

            // PDF setup
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();
            document.addTitle("UrbanEcho Complaint Report");

            // Logo (optional — replace with actual path if needed)
            /*
            Image logo = Image.getInstance("src/main/resources/static/logo.png");
            logo.scaleAbsolute(70, 70);
            logo.setAlignment(Element.ALIGN_CENTER);
            document.add(logo);
            */

            // Title
            Paragraph title = new Paragraph("UrbanEcho - Complaint Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // Divider
            // Define LineSeparator
            LineSeparator ls = new LineSeparator();
            ls.setLineColor(new Color(211,211,211)); // Light gray RGB

// Add to document directly (without wrapping in Chunk)
            document.add(Chunk.NEWLINE);
            document.add(ls);
            document.add(Chunk.NEWLINE);

            // SECTION: Complainant Details
            document.add(new Paragraph("Complainant Details", sectionTitleFont));
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(95);
            table.setSpacingBefore(5f);
            table.setSpacingAfter(10f);
            table.setWidths(new int[]{1, 2});

            // Data array
            String[][] details = {
                    {"Complaint Token", complainToken},
                    {"Full Name", fullName},
                    {"Email", email},
                    {"Building", building},
                    {"Apartment Number", apartmentNumber},
                    {"Department", department}
            };

            for (String[] row : details) {
                PdfPCell label = new PdfPCell(new Phrase(row[0] + ":", labelFont));
                label.setBackgroundColor(new Color(230, 240, 255));
                label.setBorder(Rectangle.NO_BORDER);
                label.setPadding(5f);

                PdfPCell value = new PdfPCell(new Phrase(row[1], valueFont));
                value.setBorder(Rectangle.NO_BORDER);
                value.setPadding(5f);
                table.addCell(label);
                table.addCell(value);
            }

            document.add(table);

            // Section Divider
            document.add(ls);
            document.add(Chunk.NEWLINE);

            // SECTION: Complaint Description
            document.add(new Paragraph("Complaint Description", sectionTitleFont));
            document.add(Chunk.NEWLINE);

            PdfPCell complaintCell = new PdfPCell(new Phrase(complain, valueFont));
            complaintCell.setPadding(10f);
            complaintCell.setBackgroundColor(new Color(245, 245, 245));
            complaintCell.setBorder(Rectangle.BOX);
            complaintCell.setColspan(2);
            PdfPTable complaintTable = new PdfPTable(1);
            complaintTable.setWidthPercentage(95);
            complaintTable.addCell(complaintCell);
            document.add(complaintTable);

            document.add(Chunk.NEWLINE);
            document.add(ls);
            document.add(Chunk.NEWLINE);

            // SECTION: Submission Info
            document.add(new Paragraph("Submission Time", sectionTitleFont));
            document.add(Chunk.NEWLINE);

            PdfPTable timeTable = new PdfPTable(1);
            timeTable.setWidthPercentage(95);

            PdfPCell timeCell = new PdfPCell();
            timeCell.setBackgroundColor(new Color(230, 255, 230));
            timeCell.setPadding(8f);
            timeCell.setPhrase(new Phrase("Submitted on: " + LocalDateTime.now().withNano(0) +
                    "\nPreferred Time Slot: " + timeSlot, valueFont));
            timeCell.setBorder(Rectangle.BOX);
            timeTable.addCell(timeCell);

            document.add(timeTable);

            // Footer Note
            document.add(Chunk.NEWLINE);
            Paragraph footerNote = new Paragraph("Thank you for reporting. Our team will take appropriate action shortly.", footerFont);
            footerNote.setAlignment(Element.ALIGN_CENTER);
            document.add(footerNote);
            document.add(Chunk.NEWLINE);

            document.close();

            // Email PDF
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom("sarbojitroy08986@gmail.com");
            helper.setTo(email);
            helper.setSubject("UrbanEcho Complaint Acknowledgement");
            helper.setText("Hi " + fullName + ",\n\nPlease find attached your complaint summary. We'll act on it as soon as possible.\n\nThanks,\nUrbanEcho Team");

            ByteArrayResource pdfAttachment = new ByteArrayResource(baos.toByteArray());
            helper.addAttachment("UrbanEcho_Complaint_Report.pdf", pdfAttachment);

            javaMailSender.send(mimeMessage);
            System.out.println("PDF generated and email sent.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new MessagingException("Failed to generate and send PDF: " + e.getMessage());
        }
    }
}
