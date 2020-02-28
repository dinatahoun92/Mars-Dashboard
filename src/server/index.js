require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/roverinfo/curiosity", async (req, res) => {
  try {
    let roverinfoCuriosity = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity?sol=1000&api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(roverinfoCuriosity);
  } catch (err) {
    console.log("error:", err);
  }
});
app.get("/roverinfo/opportunity", async (req, res) => {
  try {
    let roverinfoopportunity = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity?sol=1000&api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(roverinfoopportunity);
  } catch (err) {
    console.log("error:", err);
  }
});
app.get("/roverinfo/spirit", async (req, res) => {
  try {
    let roverinfospirit = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit?sol=1000&api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(roverinfospirit);
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
app.get("/opportunity", async (req, res) => {
  try {
    let opportunity = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(opportunity);
  } catch (err) {
    console.log("error:", err);
  }
});
app.get("/spirit", async (req, res) => {
  try {
    let spirit = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=${process.env.API_KEY}`
    ).then(res => res.json());
    res.send(spirit);
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
