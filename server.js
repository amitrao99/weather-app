const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/", require("./routes").route);




app.get("/", (req, res) => {
  res.render("index.hbs");
});
app.get("/comparision", (req, res) => {
  res.render("comparision.hbs");
});

app.listen(3001||process.env.PORT, () => console.log("Server started at http://localhost:3001"));
