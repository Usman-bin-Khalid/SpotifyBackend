const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service");
const jwt = require('jsonwebtoken');

async function createMusic (req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({message : 'Unauthorized'});
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'artist') {
      return res.status(403).json({message : 'You do not have access to create music'});
    }
    

    const {title} = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString('base64'));
    const music = await musicModel.create({
      uri : result.url,
      title,
      artist : decoded.id
    });
    res.status(201).json({
      message : "Music Created Successfully",

      music : {
        id : music._id,
        uri : music.uri,
        title : music.title,
        artist : music.title
      }
    })

  }
  catch (e) {
return res.status(401).json({message : 'Unauthorized'});
    }
}

}


async function createAlbum(req , res) {
  const token = req.cookies.token,
  if(!token) {
    return res.status(401).json({message : ''})
  }
  try {
         const decoded = jwt.verify(token , process.env.JWT_SECRET);
         if (decoded.role !== 'artist') {
          return res.status(403).json({message : 'You do not have access to create album'});

         }
         const {title, musicIds} = req.body;
         const album = await albumModel.create({title, artist : decoded.id, musics : musicIds});
         res.status(201).json({
          message : 'Album created successfully',
          album : {
            id : album._id,
            title : album.title,
            artist : album.artist,
            music : album.musics
          }
         })
  } catch (error) {
     console.log(error);
     return res.status(401).json({message : 'Unauthorized'});
  }
}
module.exports = {createMusic};