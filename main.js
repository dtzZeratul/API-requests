const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
// when user goes to root of server
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


//when user posts something on page
app.post("/", function(req, res) {
  var city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5b56fa2d31b50db9cc9fc94bad0ad9f2&units=metric";

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDescription = weat herData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius!!</h1>");
      res.write("<p>The sky currently has " + weatherDescription + ".</p>");
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("server started on port 3000.");
});
