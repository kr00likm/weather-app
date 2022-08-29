const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=506dd5fb93f93b2b471c08cd7ce0bc28&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("you have no access to weather services", undefined);
    } else if (body.error) {
      callback("incorrect location", undefined);
    } else {
      (currTemp = body.current.temperature),
        (feelTemp = body.current.feelslike),
        (description = body.current.weather_descriptions[0]),
        callback(
          undefined,

          "it is " +
            currTemp +
            " degrees and it feels like it is " +
            feelTemp +
            " and it is  " +
            description
        );
    }
  });
};

module.exports = forecast;
