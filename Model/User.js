const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const bcypt=require('bcrypt')
//user schema

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
        required:true
    }, 
    })

    //before saving password to database hash it

    UserSchema.pre('save',function(next){
        let user=this;
        if(!user.isModified('password')) return next();
        bcypt.hash(user.password,10,(err,hash)=>{
            if(err) return next(err);
            user.password=hash;
            next();
        })
    })

    module.exports=mongoose.model('User',UserSchema)