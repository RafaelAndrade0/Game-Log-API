const Game = require('../models/Game');
const asyncHandler = require('../middleware/asyncHandler');

const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

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
    return next(new ErrorResponse('Resource Not Found', 404));
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
  // LoggedIn User is the user creating the review
  req.body.user = req.user.id;

  const game = await Game.create(req.body);
  res.status(201).json({ success: true, data: game });
});

// @desc  Update a Game
// @route PUT api/v1/games/:id
// @access Private
exports.updateGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id);
  if (!game) {
    return next(new ErrorResponse('Resource Not Found', 404));
  }

  // Verify if the game belongs to the logged User
  if (game.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse('This user is not authorized to update this game', 403)
    );
  }

  const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: updatedGame });
});

// @desc  Delete a Game
// @route DELETE api/v1/games/:id
// @access Private
exports.deleteGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    return next(new ErrorResponse('Resource Not Found', 404));
  }

  // Verify if the game belongs to the logged User
  if (game.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse('This user is not authorized to delete this games', 403)
    );
  }

  await game.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc  Upload Photo for Game
// @route PUT api/v1/games/:id/photo
// @access Private
exports.gamePhotoUpload = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    return next(new ErrorResponse('Resource Not Found', 404));
  }

  // Verify if the game belongs to the logged User
  if (game.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        'This user is not authorized to add a photo to this game',
        403
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please Upload a File', 400));
  }

  const file = req.files.file;

  // Make sure that the file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please Upload an Image', 400));
  }

  file.name = `photo_${game._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Game.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
