const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDb();

// Body Parser (acess to req.body)
app.use(express.json());

// Sanitize Data
app.use(mongoSanitize());

// Using Helmet to add some security
app.use(helmet());

// Middleware to sanitize user input (like <script></script)
app.use(xss());

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

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

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Enable CORS
app.use(cors());

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
