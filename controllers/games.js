const Game = require('../models/Game');

// @desc  Get All Games
// @route GET api/v1/games
// @access Public
exports.getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(200).json({
      success: true,
      count: games.length,
      data: games
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
};

// @desc  Get a single Game
// @route GET api/v1/games/:id
// @access Public
exports.getGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
};

// @desc  Delete a Game
// @route DELETE api/v1/games/:id
// @access Private
exports.deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: game
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
};

// @desc  Add a Game
// @route POST api/v1/games
// @access Private
exports.addGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({
      success: true,
      data: game
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false
    });
  }
};
