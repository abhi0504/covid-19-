const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require('https');
const { getCode, getName } = require('country-list');
var Request = require("request");


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


      res.render("layout" , { country:"GLOBAL" , deaths:deaths , treated:treated , infected:infected})
  })
  });

});

app.post("/" , function(req , res)
{
  var country = req.body.country;
  var countrycode = getCode(country);
  var url = "https://thevirustracker.com/free-api?countryTotal=" + countrycode

  Request.get(url, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
  var data = JSON.parse(body);
  var infected = data.countrydata[0].total_cases;
  var treated = data.countrydata[0].total_recovered;
  var deaths = data.countrydata[0].total_deaths;


  res.render("layout" , { country:country , deaths:deaths , treated:treated , infected:infected})

});

  // https.get(url, function(response)
  // {
  // response.on("data" , function(data)
  // {
  //     var apidata = JSON.parse(data);
  //     console.log(apidata.countrydata);
  //     // const deaths = apidata.deaths.value;
  //     // const treated = apidata.recovered.value;
  //     // const infected = apidata.confirmed.value;
  //
  //
  //     // res.render("layout" , { deaths:deaths , treated:treated , infected:infected})
  // })
  // });


  //res.redirect("https://thevirustracker.com/free-api?countryTotal=" + countrycode)
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
