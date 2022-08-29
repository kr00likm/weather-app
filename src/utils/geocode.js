const request = require("request");

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?country=pl&proximity=ip&types=place%2Cpostcode%2Caddress&language=pl&access_token=pk.eyJ1Ijoia3JvbGlrbSIsImEiOiJjbDZ4aWJ3czEwMDMwM2pxbTF3cm82a3J1In0.AEe-g4Djph_-QTdsjb7yHA&limit=1";
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("unable to connect to location services", undefined);
//     } else if (response.body.features.length === 0) {
//       callback("incorrect location try another search", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].geometry.coordinates[1],
//         longitude: response.body.features[0].geometry.coordinates[0],
//         location: response.body.features[0].text_pl,
//       });
//     }
//   });
// };

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?proximity=ip&types=place%2Cpostcode%2Caddress&language=pl&access_token=pk.eyJ1Ijoia3JvbGlrbSIsImEiOiJjbDZ4aWJ3czEwMDMwM2pxbTF3cm82a3J1In0.AEe-g4Djph_-QTdsjb7yHA&limit=1";
  // country=pl&

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("incorrect location try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].text_pl,
      });
    }
  });
};

module.exports = geocode;
