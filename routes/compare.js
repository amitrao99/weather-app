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
  var firstCity = req.body.firstCity;
  var secondCity = req.body.secondCity;

  var firstUrl = `https://api.openweathermap.org/data/2.5/weather?q=${firstCity}&appid=4b52bb5d095a9a4c3387d9d5a261cd99&units=${req.body.unit}`;
  var  secondUrl = `https://api.openweathermap.org/data/2.5/weather?q=${secondCity}&appid=4b52bb5d095a9a4c3387d9d5a261cd99&units=${req.body.unit}`;

  (async () => {
    try {
      const renderdata = () => {
        res.render("compare", { data: data,unit:req.body.unit});
      };

      const firstResponse = await fetch(firstUrl);
      const firstJson = await firstResponse.json();

      const secondResponse = await fetch(secondUrl);
      const secondJson = await secondResponse.json();

      var firstData = {};
      var secondData = {};
      parsedata(firstJson, firstData);
      parsedata(secondJson, secondData);

      var data={firstData,secondData}

      console.log("first : ",firstData )
      console.log("second : ",secondData )

      renderdata();
    } catch (error) {
      console.log(error);
    }
  })();
});

exports = module.exports = route;
