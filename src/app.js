const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const SharedLocation = path.join(__dirname, "../Shared");
const ViewLocation = path.join(__dirname, "../Templates/Views");
const partialLocation = path.join(__dirname, "../Templates/Partials");

app.set("view engine", "hbs");
app.set("views", ViewLocation);
hbs.registerPartials(partialLocation);
app.use(express.static(SharedLocation));
app.get("", (req, res) => {
  res.render("index", { Title: "HomePage", Name: "Paras" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
