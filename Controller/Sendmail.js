const nodeMailer = require('nodemailer');
require('dotenv').config();
const express=require('express');
const server=express();
server.use(express.json());


// send otp to email using nodemailer
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

//send otp to email
const sendMail = async (req, res) => {
    
   try {
     const { subject, message,destination } = req.body;
    
    
   
   const mailData = {
       from: process.env.EMAIL,
       to: destination,
       subject: subject,
       text: message
   }
    transporter.sendMail(mailData, (err, info) => {
       if (err) {
           res.status(500).json({
               message: 'Internal Error',
               error: err.message
           })
       }
       else {
           res.status(200).json({
               message: 'Mail sent successfully',
               info: info
           })
       }
   })
    
   } catch (error) {
    res.send(error.message)
    
   }
 

}
module.exports=sendMail;