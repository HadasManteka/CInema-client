const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/', require('./routes/movies'));
app.use('/', require('./routes/reviews'));

app.get('*', (req, res) => {
  res.statusCode = 404
  res.end()
})

module.exports = app;