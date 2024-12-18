const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("./client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/htmlRoutes")(app);

app.listen(PORT, () =>
  console.log(`Now listening on http://localhost:${PORT}`)
);
