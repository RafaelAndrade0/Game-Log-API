const Game = require('../models/Game');
const asyncHandler = require('../middleware/asyncHandler');

// @desc  Get All Games
// @route GET api/v1/games
// @access Public
exports.getGames = asyncHandler(async (req, res, next) => {
  const games = await Game.find();
  res.status(200).json({ success: true, count: games.length, data: games });
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
