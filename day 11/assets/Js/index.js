// ini adalah inisiasi cara pemanggilan package, express

const express = require("express");
const app = express();

// ini adalah route atau pemanggilan sebuah fungsi
app.get("/", function (req, res) {
  res.send("Hello World");
});

// 3000 ini adalah secara default kita gunakan karena tidak terpakai
app.listen(3000);
