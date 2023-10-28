const express = require('express');
const User=require('../Model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');




const server = express();

server.use(express.json())
server.use(cookieParser());
require('dotenv').config();




    //Api endpoint to register user first check wheather user already exist or not

    const registerUser = async (req, res) => {

        try {

            const { name, email, password } = req.body;
            // console.log(email)


            // check wheather user already exist or not
            const user = await User.findOne({email:email })
            if (user) {
                return res.status(400).send('user already exist')
            }
            console.log(user)
            //create new user
            const newUser = new User({
                name: name,
                email: email,
                password: password
            })

            // //save user to database
            await newUser.save();
            res.status(200).send('user registered successfully')

        }



        catch (err) {
            res.status(500).send('something went wrong')
        }
    }

    //login endpoint
    exports.loginUser = async (req,res) => {
        console.log(req.body)
        const {email,password} = req.body;
        console.log("email -> " + email)
       

        try {
        
            //check this user exist or not
            const user = await User.findOne({email})
            if (!user) {
              return  res.status(400).send('user not found ok')
               
            }

            // comapre password with hashpassword
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(400).send('invalid credentials')
            }

            // create token
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
            //set tokon in cookie
            // Correct the order of chaining methods
res.status(200).cookie('authToken', token, { httpOnly: true, secure: true }).send('user logged in successfully');

        }
        catch (err) {
            send(err)
        }
    }

    //logout endpoint
    exports.logoutUser = async (req, res) => {
        try {
            res.clearCookie('authToken')
            res.status(200).send('user logged out successfully')
        }
        catch (err) {
            res.send(err)
        }
    }

    //api endpoint to get user name from cookie
    exports.isLoggedin = async (req, res) => {
        // console.log(req.cookies.authToken)
        try {
          
            const token = req.cookies.authToken;
            
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
         res.send({
            succuss:true,
            user:verifyUser
         })
        }
        catch (err) {
            res.status(500).send({
                message: 'something went wrong!',
                err: err.message
            })
            
        }
    }
    exports.registerUser = registerUser;