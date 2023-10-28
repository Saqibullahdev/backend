const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logoutUser,isLoggedin}=require('../Controller/UserController')

router.post('/register',registerUser).
post('/login',loginUser).
get('/logout',logoutUser).
get('/isloggedin',isLoggedin)

module.exports=router;