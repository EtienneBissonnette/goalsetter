const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Connection to MongoDB @ " +
        `${conn.connection.host}`.brightMagenta.italic
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
