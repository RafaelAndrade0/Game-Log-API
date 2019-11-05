const asyncHandler = require('../middleware/asyncHandler');
const Developer = require('../models/Developer');

// @desc  Get All Developers
// @route GET api/v1/developers
// @access Public
exports.getDevelopers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});

// @desc  Get a single Developer
// @route GET api/v1/developer/:id
// @access Public
exports.getDeveloper = asyncHandler(async (req, res, next) => {
  const developer = await Developer.findById(req.params.id);
  if (!developer) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({
    success: true,
    data: developer
  });
});

// @desc  Add a Developer
// @route POST api/v1/developer
// @access Private
exports.addDeveloper = asyncHandler(async (req, res, next) => {
  const developer = await Developer.create(req.body);
  res.status(201).json({ success: true, data: developer });
});

// @desc  Update a Developer
// @route PUT api/v1/developer/:id
// @access Private
exports.updateDeveloper = asyncHandler(async (req, res, next) => {
  const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!developer) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({ success: true, data: developer });
});

// @desc  Delete a Developer
// @route DELETE api/v1/developer/:id
// @access Private
exports.deleteDeveloper = asyncHandler(async (req, res, next) => {
  const developer = await Developer.findByIdAndDelete(req.params.id);
  if (!developer) {
    res.status(404).json({ success: false });
  }
  res.status(200).json({ success: true, data: {} });
});
