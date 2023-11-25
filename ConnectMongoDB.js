const mongoose = require("mongoose");
require("dotenv").config();

const url =
  "mongodb+srv://petrabayu19:admin123@cluster0.4syp8yg.mongodb.net/user";
const ConnectMongoDB = async () => {
  try {
    const Connect = await mongoose.connect(url);
    console.log(`Mongo Connected : ${Connect.connection.host}`);
  } catch (error) {
    console.log(error);
    // process.exit(1)
  }
};

module.exports = ConnectMongoDB;
