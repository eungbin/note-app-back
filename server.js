const express = require('express');
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");
const app = express();
const conn = db.init();
require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/note', (req, res) => {
  const sql = "select * from note";
  conn.query(sql, function (err, result) {
    if(err) console.log(err);
    else res.send(result);
  })
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});