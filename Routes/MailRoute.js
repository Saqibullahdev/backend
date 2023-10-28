const express=require('express');
const router=express.Router();

const sendMail=require('../Controller/Sendmail')

router.post('/sendmail',sendMail);
module.exports=router;