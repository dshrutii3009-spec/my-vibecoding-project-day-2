const express = require('express');
const app = express();
app.use(function(req, res, next) {    console.log("i am middleware");    next(); }); app.use(express.json());
app.get("/", function(req, res) {

res.send("hello i am fine");
});
app.listen(9999);
console.log("running");
console.log("http://localhost:9999");
