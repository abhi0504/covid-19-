const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require('https');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/" , function(req , res)
{
  https.get("https://covid19.mathdro.id/api/" , function(response)
{
  response.on("data" , function(data)
{
  const apidata = JSON.parse(data);
  console.log(apidata);
})
})

  res.render("layout")
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
