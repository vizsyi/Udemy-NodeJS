const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    //console.log(con.connections);
    console.log("DB connection successful!");
  });

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
