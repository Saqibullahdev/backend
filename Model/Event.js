const mongoose=require('mongoose')
const Schema=mongoose.Schema;



const EventSchema=new Schema({
    title:{
        type:String,
        
    },
    description:{
        type:String,
        
    }, 
    image:{
        type:String,
    }},{timestamps:true})



  

    module.exports=mongoose.model('event',EventSchema)