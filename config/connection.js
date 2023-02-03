const mongoose = require("mongoose");

const server = 'mongodb://127.0.0.1:27017';
const database = 'socialNetDB';


mongoose.set('strictQuery', false);

const connectionString =
  process.env.MONGODB_URI || `${server}/${database}`;

  mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;