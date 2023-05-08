require('dotenv').config()
const server = require("./src/app");
const { database } = require("./src/db");

const {PORT} = process.env

database.sync({ force: true }).then(() => {
  console.info("Database connected");
  server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
});
