const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const SharedLocation = path.join(__dirname, "../Shared");
const ViewLocation = path.join(__dirname, "../Templates/Views");
const partialLocation = path.join(__dirname, "../Templates/Partials");
const port = process.env.PORT || 3000;
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
app.listen(port, () => {
  console.log("listening on port" + port);
});
