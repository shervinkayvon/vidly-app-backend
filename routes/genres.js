const express = require('express');
const router = express.Router();

const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');

router.get('/', async (req, res, next) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const capitalizedName = req.body.name.toLowerCase().trim().replace(/^\w/, (c) => c.toUpperCase());

  const existingGenre = await Genre.findOne({ name: capitalizedName });
  if (existingGenre) {
    return res.status(400).send('Genre already exists.');
  }

  const genre = new Genre({ name: capitalizedName });
  await genre.save();

  res.send(genre);
});



router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const capitalizedName = req.body.name.toLowerCase().trim().replace(/^\w/, (c) => c.toUpperCase());

  const existingGenre = await Genre.findOne({ name: capitalizedName });
  if (existingGenre) {
    return res.status(400).send('Genre already exists.');
  }

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: capitalizedName }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});



router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;