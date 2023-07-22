const mongoose = require("mongoose");
const password = require("./password");

const connectionString = process.env("MONGO_CREDENTIAL");

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
