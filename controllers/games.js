const Game = require('../models/Game');

// @desc  Get All Games
// @route GET api/v1/games
// @access Public
exports.getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    res.status(200).json({
      success: true,
      data: games
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
