// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
// app
const app = express();

app.get('/', (req, res) => {
  res.send('shaxzod aliyorov')
})

// app use
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// app use Route
app.use('/api/auth', require('./Routes/AuthRouter'))
app.use('/api/user', require('./Routes/UserRouter'))
app.use('/api/comments', require('./Routes/CommentsRouter'))
app.use('/api/posts', require('./Routes/PostRouter'))
// url database
// process.env.DATA_BASE_URL
const URL = process.env.DATA_BASE_URL;
// mongo db connect
mongoose
  .connect(URL)
  .then(() => console.log("successfully data base connectioned"))

// port
const PORT = process.env.PORT || 8080;
// app listen
app.listen(PORT, () => console.log("server runing..."));