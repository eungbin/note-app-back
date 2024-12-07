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

app.post('/note', (req, res) => {
  const { title, content } = req.body;
  if(!title || !content) return res.status(400).json({ error: 'title 및 content는 필수 항목입니다.' })
  const sql = "insert into note(title, content) values(?, ?)";

  conn.query(sql, [title, content], (err, result) => {
    if(err) return res.status(500).json({ error: "데이터 삽입 실패" });

    res.status(201).json({ message: "노트 추가 성공" });
  })
})

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});