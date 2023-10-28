const express = require('express');
const multer = require('multer');
const {postEvent,fetchEvent,postNotification,fetchNotification}  = require('../Controller/event_controller')

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/postevent', upload.single('file'),postEvent).
get('/fetchEvent',fetchEvent).post
('/postNotification',upload.single('file'),postNotification).get
('/fetchNotification',fetchNotification);

//list me all api endpoints

module.exports =router;
