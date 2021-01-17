const route = require("express").Router();
const fetch = require("node-fetch");
function parsedata(json, reqdata) {
  reqdata.latitude = json.coord.lat;
  reqdata.longitude = json.coord.lon;
  reqdata.weather_type = json.weather[0].main;
  reqdata.weather_desc = json.weather[0].description;

  reqdata.temp = json.main.temp;
  reqdata.feels_like = json.main.feels_like;
  reqdata.temp_min = json.main.temp_min;
  reqdata.temp_max = json.main.temp_max;
  reqdata.pressure = json.main.pressure;
  reqdata.humidity = json.main.humidity;

  reqdata.visibility = json.visibility;
  reqdata.wind_speed = json.wind.speed;
  reqdata.wind_deg = json.wind.deg;
  reqdata.time_of_collection = json.dt;
  reqdata.country = json.sys.country;
  reqdata.name = json.name;
  return reqdata;
}
route.post("/", (req, res) => {
  var city = req.body.city;
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b52bb5d095a9a4c3387d9d5a261cd99&units=metric`;
  (async () => {
    try {
      const renderdata = () => {
        res.render("metric", { data: data });
      };

      const response = await fetch(url);
      const json = await response.json();
      var data = {};
      parsedata(json, data);
      renderdata();
    } catch (error) {
      console.log(error);
    }
  })();
});

exports = module.exports = route;
