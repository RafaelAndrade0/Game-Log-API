const Game = require('../models/Game');
const asyncHandler = require('../middleware/asyncHandler');

const querystring = require('querystring');

// @desc  Get All Games
// @route GET api/v1/games
// @access Public
exports.getGames = asyncHandler(async (req, res, next) => {
  let query;
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 2;

  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'limit', 'page'];

  // Loop reqQuery and delete them from reqQuery
  removeFields.forEach(field => delete reqQuery[field]);

  query = Game.find(reqQuery);

  // Select Field (Filter Results)
  if (req.query.select) {
    const fieldsToShow = req.query.select.split(',');
    query.select(fieldsToShow);
  }

  // Sort Field (Sort Results)
  if (req.query.sort) {
    const fieldsToSort = req.query.sort.split(',').join(' ');
    query.sort(fieldsToSort);
  } else {
    query.sort('title');
  }

  // Pagination
  query.skip(limit * page - limit).limit(limit);

  const games = await query;

  const pagination = {};

  // Base Url
  pagination.baseUrl = `http://${req.headers.host}${req.baseUrl}`;

  // Prev Page
  if (page - 1 > 0) {
    const query = { ...req.query };
    query.page = page - 1;
    pagination.prevPage = `${req.baseUrl}?${querystring.stringify(query)}`;
  }

  // Next Page
  if (page * limit < (await Game.countDocuments())) {
    const query = { ...req.query };
    query.page = page + 1;
    pagination.nextPage = `${req.baseUrl}?${querystring.stringify(query)}`;
  }

  // Actual Page
  pagination.page = page;

  res.status(200).json({
    success: true,
    count: games.length,
    pagination,
    data: games
  });
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
