const mongoose = require("mongoose");
const dotenv = require("dotenv");

// UNCAUGHT EXEPTION
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
//console.log(process.env);

const app = require("./app");

const DB = process.env.CONNECTIONSTRING.replace(
  "<DB_USERNAME>",
  process.env.DB_USERNAME
)
  .replace("<DB_PASSWORD>", process.env.DB_PASSWORD)
  .replace("<DB_CLUSTER>", process.env.DB_CLUSTER)
  .replace("<DB_DATABASE>", process.env.DB_DATABASE);

console.log("DB: ", DB);

mongoose
  .connect(DB, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true,
  })
  .then(() => {
    //console.log(con.connections);
    console.log("DB connection successful!");
  });

// UNHANDLED REJECTIONS
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
