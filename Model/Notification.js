const mongoose=require('mongoose')
const Schema=mongoose.Schema;



const NotifcationSchema=new Schema({
    title:{
        type:String,
        
    },
    description:{
        type:String,
        
    }, 
    image:{
        type:String,
    }},{timestamps:true})



  

module.exports=mongoose.model('notification',NotifcationSchema)