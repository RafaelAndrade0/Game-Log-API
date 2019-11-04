const colors = require('colors');
const mongoose = require('mongoose');

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(
    colors.bgGreen.black(`MongoDb Connected ${conn.connection.host}`)
  );
};

module.exports = connectDb;
