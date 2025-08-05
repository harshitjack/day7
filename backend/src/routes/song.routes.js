const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const Song = require('../models/song.model'); 
const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


router.post('/songs', upload.single('audio'), async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('Mood received:', req.body.mood);

    const fileData = await uploadFile(req.file);

    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,
      mood: req.body.mood, 
    });

    res.status(201).json({
      message: 'Song created successfully',
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});


router.get('/songs', async (req, res) => {
  try {
    const { mood } = req.query;
    const songs = await Song.find({ mood }); 
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
