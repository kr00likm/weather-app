const path = require("path");
const express = require("express");
const { title } = require("process");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { runInNewContext } = require("vm");

const app = express();

//define paths for Express config
const dirPublic = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialPath = path.join(__dirname, "/templates/partials");
// setup handlebars engine and views location

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// setup static directory to serve
app.use(express.static(dirPublic));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "M.K" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "M.K" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "there is no hope...",
    name: "M.K",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Andrew",
//       age: 27,
//     },
//     {
//       name: "Sarah",
//     },
//   ]);
// });

app.get("/weather", (req, res) => {
  // res.send("Show the weather");
  if (!req.query.address) {
    return res.send({
      error: "you must provide the address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   location: "Konin",
  //   forecast: "It is 20 degrees",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "help article not found",
    name: "M.K",
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404", msg: "Page not found", name: "M.K" });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
