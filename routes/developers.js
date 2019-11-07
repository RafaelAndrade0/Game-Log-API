const express = require('express');
const router = express.Router();

// Midlewares
const filteredResults = require('../middleware/filteredResults');
const { protect } = require('../middleware/auth');

// Models
const Developer = require('../models/Developer');

const {
  getDevelopers,
  addDeveloper,
  getDeveloper,
  updateDeveloper,
  deleteDeveloper
} = require('../controllers/developers');

router
  .route('/')
  .get(
    filteredResults(Developer, [
      {
        path: 'games',
        select: 'title description -_id'
      }
    ]),
    getDevelopers
  )
  .post(protect, addDeveloper);

router
  .route('/:id')
  .get(getDeveloper)
  .put(protect, updateDeveloper)
  .delete(protect, deleteDeveloper);

module.exports = router;
