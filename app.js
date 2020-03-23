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
      var apidata = JSON.parse(data);
      const deaths = apidata.deaths.value;
      const treated = apidata.recovered.value;
      const infected = apidata.confirmed.value;
      res.render("layout" , { deaths:deaths , treated:treated , infected:infected})
  })
  });
});

app.post("/" , function(req , res)
{

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
