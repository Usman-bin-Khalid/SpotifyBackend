const albumModel = require("../models/album.model");
const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;
  const result = await uploadFile(file.buffer.toString("base64"));
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });
  res.status(201).json({
    message: "Music Created Successfully",

    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });
  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      music: album.musics,
    },
  });
}

async function getAllMusics (req, res) {
  const musics = await musicModel.find();
  res.status(200).json({
    message : 'Musics fetched successfully',
    musics : musics
  })
}

module.exports = { createMusic, createAlbum , getAllMusics};
