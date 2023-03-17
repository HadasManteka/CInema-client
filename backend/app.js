const express = require("express");
const app = express();
const cors = require('cors'); 
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://movies-atlas-db:yjP8NyM9kh4GX7H@cluster0.kdvj33y.mongodb.net/?retryWrites=true&w=majority")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use('/', require('./routes/movies'));
app.use('/', require('./routes/reviews'));
app.use('/', require('./routes/users'));

app.get('*', (req, res) => {
  res.statusCode = 404
  res.end()
})

module.exports = app;