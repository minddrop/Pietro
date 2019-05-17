const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("hello express");
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Starting server listening to ${port}`);
});
