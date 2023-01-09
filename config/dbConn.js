const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const handleDbString = process.env.DATABASE_URI;
    await mongoose.connect(`${handleDbString}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
