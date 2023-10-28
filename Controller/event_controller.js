const Event = require('../Model/Event');
const Notifcation=require('../Model/Notification')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.postEvent = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const new_event = new Event({
      title,
    description,
      image: result.secure_url
    });

    await new_event.save();
    console.log({
      imageurl: result.secure_url,
      title,
      description,
      status: 'success'
    });

    res.send({
      imageurl: result.secure_url,
      title,
      description,
      status: 'success'
    });
  } catch (err) {
    res.status(400);
    res.send({
      status: 'failed',
      message: err.message
    });
  }
};


exports.postNotification=async(req,res)=>{
    const {title,description}=req.body
    try{
        const result=await cloudinary.uploader.upload(req.file.path)
        const new_notification=new Notifcation({
            title,
            description,
            image:result.secure_url
        })
        await new_notification.save()
        console.log("save to database")
        res.send({
            imageurl:result.secure_url,
            title,
            description,
            status:'success'
        })
    }catch(err){
        res.status(400)
        res.send({
            status:'failed',
            message:err.message
        })
    }
}

//fetch notifcation
exports.fetchNotification=async(req,res)=>{
    try{
        const notifications=await Notifcation.find().sort({createdAt:-1})
        res.send(notifications)
    }catch(err){
        res.status(400)
        res.send({
            status:'failed',
            message:err.message
        })
    }
}

exports.fetchEvent=async(req,res)=>{
    try{
        const events=await Event.find().sort({createdAt:-1})
        res.send(events)
    }catch(err){
        res.status(400)
        res.send({
            status:'failed',
            message:err.message
        })
    }
}


