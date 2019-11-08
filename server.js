const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDb();

// Body Parser (acess to req.body)
app.use(express.json());

// Cookie Parser to populate (req.cookies)
app.use(cookieParser());

// Route Files
const games = require('./routes/games');
const developers = require('./routes/developers');
const reviews = require('./routes/reviews');
const auth = require('./routes/auth');

// Morgan Middleware
app.use(morgan('dev'));

// File Uploading
app.use(
  fileUpload({
    debug: true
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routes
app.use('/api/v1/games', games);
app.use('/api/v1/developers', developers);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/auth', auth);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    colors.bgBlue(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`)
  );
});
