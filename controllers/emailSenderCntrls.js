const nodemailer = require("nodemailer")
const user = require('../models/learnerModel')
const mongoose = require('mongoose')

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')


const sendUserEmail = async(userEmail, name, res)=>{
    
    try {

        // Login Details
       
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })

          // Generate PDF
          
          const doc = new PDFDocument({layout: 'landscape', size: 'A4'});

          const certificatePath = `certificate_${name}.pdf`;

          doc.pipe(fs.createWriteStream(certificatePath));

          doc.rect(0, 0, doc.page.width, doc.page.height)
          .fill('#e0f7fa');
          
          const logoPath = path.join('icon.png');
            doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100, height: 100 });

            doc.moveDown(5);

          doc.fontSize(30).fillColor('#000080').text('Certificate of Achievement', {
            align: 'center',
          });

          doc.moveDown(2);

          doc.fontSize(20).fillColor('black').text(`This is to certify that`, {
            align: 'center',
          });

        doc.moveDown(1);
        doc.fontSize(40).fillColor('green').text(`${name}`, {
        align: 'center',
        underline: true, 
        });

        doc.moveDown(1);
        doc.fontSize(18).fillColor('black').text(`Has successfully completed the 3 months Training course on Backend Programming`,
        {
        align: 'center',
        });

        doc.moveDown(1);
        doc.fontSize(16).fillColor('black').text(`Date: ${new Date().toLocaleDateString()}`, {
        align: 'left',
        });

        doc.text('Signature: ______________', {
         align: 'right',
         });

          doc.end();
        
        
        const detailsToSend = {
            from: process.env.Email,
            to: userEmail,
            subject: "Back-end Developer Certificate",
            
            html: `<div>
            <p>Dear <b>${name}</b></p>
            <p>Congratulations! You are now certified as Backend Developer</p>
            <p>Attached is your Certificate</p>
            </br></br></br>
            <p>Cheers!</p>
            </div>`,
            attachments: [
                {
                    filename: 'Certificate.pdf',
                    path: certificatePath
                }
            ]
            };
        const result = await mailTransporter.sendMail(detailsToSend)
        return result;
    
        
    } catch (error) {
      throw new Error('Email sending failed');
  }
}




module.exports = sendUserEmail

