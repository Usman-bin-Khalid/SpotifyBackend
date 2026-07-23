const express = require('express');
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require('multer');


const upload = multer({
  storage : multer.memoryStorage()
}) 
const router = express.Router();
router.post("/upload" , authMiddleware.authArtist, upload.single('music'),  musicController.createMusic);
router.post('/album' , authMiddleware.authArtist, musicController.createAlbum);
router.get('/', )



module.exports = router   ;
