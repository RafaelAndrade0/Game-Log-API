const express = require('express');
const router = express.Router();

// Midlewares
const filteredResults = require('../middleware/filteredResults');
const { protect, authorize } = require('../middleware/auth');

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
  .post(protect, authorize('publisher', 'admin'), addDeveloper);

router
  .route('/:id')
  .get(getDeveloper)
  .put(protect, authorize('publisher', 'admin'), updateDeveloper)
  .delete(protect, authorize('publisher', 'admin'), deleteDeveloper);

module.exports = router;
