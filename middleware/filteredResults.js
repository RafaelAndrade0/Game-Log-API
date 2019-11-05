const querystring = require('querystring');

const filteredResults = (Model, populate) => async (req, res, next) => {
  let query;
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 5;

  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'limit', 'page'];

  // Loop reqQuery and delete them from reqQuery
  removeFields.forEach(field => delete reqQuery[field]);

  query = Model.find(reqQuery);

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
    query.sort('-createdAt');
  }

  // Pagination
  query.skip(limit * page - limit).limit(limit);

  // Referencing documents in others collections
  if (populate) {
    query.populate(populate);
  }

  const games = await query;

  const pagination = {};

  // Base Url
  pagination.baseUrl = `http://${req.headers.host}`;

  // Prev Page
  if (page - 1 > 0 && games.length > 0) {
    const query = { ...req.query };
    query.page = page - 1;
    pagination.prevPage = `${req.baseUrl}?${querystring.stringify(query)}`;
  }

  // Next Page
  if (page * limit < (await Model.countDocuments())) {
    const query = { ...req.query };
    query.page = page + 1;
    pagination.nextPage = `${req.baseUrl}?${querystring.stringify(query)}`;
  }

  // Actual Page
  pagination.page = page;

  res.filteredResults = {
    success: true,
    count: games.length,
    pagination,
    data: games
  };
  next();
};

module.exports = filteredResults;
