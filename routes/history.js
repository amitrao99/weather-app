const route = require("express").Router();
const fetch = require("node-fetch");
require('plotly')("amitrao99", "UIvsKjAYuah3PDUErm2b");
route.post("/", (req, res) => {
//   var latitude = req.body.Latitude;
//   var longitude = req.body.Longitude;
var latitude = 51.5085;
var longitude = -0.1257;
  var time=1609709343;
  var url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${time}&appid=4b52bb5d095a9a4c3387d9d5a261cd99`;
  (async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(url);
    //   console.log(json);
      var l=json.hourly.length;
      x=[];
      var ii;
      for (ii = 0; ii < l; ii++) {
        // console.log(json.hourly[ii].dt);
        var dateTime = new Date(json.hourly[ii].dt);
        var time = dateTime.toISOString();
        var n=time.length;
        var i = time.indexOf("T");
        var ntime = time.substring(0, i) + ' ' + time.substring(i+1,n-4);
        x.push(ntime);
      }
      y=[];
      for (ii = 0; ii < l; ii++) {
        var tp=json.hourly[ii].temp;
        y.push(tp);
      }
      var data = [
        {
          x,
          y,
          type:"scatter"
        }
      ];
      console.log(data);
      var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
      plotly.plot(data, graphOptions, function (err, msg) {
      console.log(msg);
      });
      res.render("plots.hbs",{data:data});
    } catch (error) {
      console.log(error);
    }
  })();
});

exports = module.exports = route;
