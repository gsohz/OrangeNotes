const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB conectado! ${connect.connection.host}`);
  } catch (err) {
    console.log(`Erro ao se conectar ao MongoDB ${err}`);
    process.exit();
  }
};

module.exports = connectDB;
