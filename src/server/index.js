require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
const { Map } = require("immutable");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/roverinfo", async (req, res) => {
  try {
    let roverinfo = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?sol=1000&api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(roverinfo);
  } catch (err) {
    console.log("error:", err);
  }
});
app.get("/curiosity", async (req, res) => {
  try {
    let curiosity = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(curiosity);
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
