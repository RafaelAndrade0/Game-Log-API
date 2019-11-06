const Game = require('../models/Game');
const asyncHandler = require('../middleware/asyncHandler');

const path = require('path');

// @desc  Get All Games
// @route GET api/v1/games
// @route GET api/v1/developers/:developerId/games
// @access Public
exports.getGames = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc  Get a single Game
// @route GET api/v1/games/:id
// @access Public
exports.getGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id);
  if (!game) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({
    success: true,
    data: game
  });
});

// @desc  Add a Game
// @route POST api/v1/games
// @access Private
exports.addGame = asyncHandler(async (req, res, next) => {
  const game = await Game.create(req.body);
  res.status(201).json({ success: true, data: game });
});

// @desc  Update a Game
// @route PUT api/v1/games/:id
// @access Private
exports.updateGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!game) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({ success: true, data: game });
});

// @desc  Delete a Game
// @route DELETE api/v1/games/:id
// @access Private
exports.deleteGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findByIdAndDelete(req.params.id);
  if (!game) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc  Upload Photo for Game
// @route PUT api/v1/games/:id/photo
// @access Private
exports.gamePhotoUpload = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    res.status(404).json({ success: false });
  }

  if (!req.files) {
    res.status(400).json({ success: false, message: 'Please Add a Photo!' });
  }

  const file = req.files.file;

  // Make sure that the file is an image
  if (!file.mimetype.startsWith('image')) {
    res
      .status(400)
      .json({ success: false, message: 'Please upload an image!' });
  }

  file.name = `photo_${game._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: 'Problem with photo upload!' });
    }

    await Game.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
