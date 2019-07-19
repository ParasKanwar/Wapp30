const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const SharedLocation = path.join(__dirname, "../Shared");
const ViewLocation = path.join(__dirname, "../Templates/Views");
const partialLocation = path.join(__dirname, "../Templates/Partials");
const port = process.env.PORT || 3000;
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");
app.set("view engine", "hbs");
app.set("views", ViewLocation);
hbs.registerPartials(partialLocation);
app.use(express.static(SharedLocation));

app.get("/", (req, res) => {
  res.render("index", { Title: "HomePage", Name: "Paras" });
});

app.get("/index", (req, res) => {
  res.render("index", { Title: "HomePage", Name: "Paras" });
});

app.get("/help", (req, res) => {
  res.render("help", { Title: "Help", Name: "Paras", Home: "Get Weather" });
});

app.get("/about", (req, res) => {
  res.render("about", { Title: "About", Name: "Paras Kanwar" });
});
app.get("/weather", (req, res) => {
  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) res.send({ error });
    else {
      forecast(latitude, longitude, (error, { body }) => {
        if (error) res.send({ error });
        else {
          res.send({
            weather_details: body.currently,
            Location: location
          });
        }
      });
    }
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    Title: "Error 404",
    Name: "Paras",
    Error:
      "This Web_page is not reachable,Besides if you are looking For help Visit Help tab above you."
  });
});
app.get("/*", (req, res) => {
  res.render("404", {
    Title: "Error 404",
    Name: "Paras",
    Error: "This Web_page is not reachable"
  });
});
app.listen(port, () => {
  console.log("listening on port" + port);
});
