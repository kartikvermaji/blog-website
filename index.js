const express = require("express");
const bodyparser = require("body-parser");
const _ = require("lodash");
const app = express();

//setting up mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const blogschema = new mongoose.Schema({
  title: String,
  post: String,
});
const blog = new mongoose.model("blog", blogschema);

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("assets"));

const contenthome =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contentabout =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contentcontact =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

//TEMPORARY DATABASE
let posts = [];

app.get("/", function (req, res) {
  blog
    .find()
    .then((tasks) => {
    //   console.log("Tasks: ", tasks);
      res.render("home", {
        wpage: "HOME",
        homecontent: contenthome,
        pos: tasks,
      });
    })
    .catch((err) => {
      console.error("Error while querying: " + err);
    });
});
app.get("/about", function (req, res) {
  res.render("about", { wpage: "ABOUT", homecontent: contentabout });
});
app.get("/contact-us", function (req, res) {
  res.render("compose");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/posts/:postname", function (req, res) {
  const newreqe = _.lowerCase(req.params.postname);
  blog
    .find()
    .then((tasks) => {  
      tasks.forEach(function(task){
        const storedtit = _.lowerCase(task.title);
        if (storedtit === newreqe) {
            res.render("posti", { titles: task.title, description: task.post });
          }
      })
      
    })
    .catch((err) => {
      console.error("Error while querying: " + err);
    });
});

app.get("/blog", function (req, res) {
  res.render("blo", { tit: "yo", dex: "bo" });
});

//COMPOSE
app.post("/compose", function (req, res) {
  const newblog = new blog({
    title: req.body.title,
    post: req.body.post,
  });
  newblog
    .save()
    .then(() => {
      console.log("Task saved successfully.");
    })
    .catch((err) => {
      console.error("Error while saving: " + err);
    });
  res.redirect("/");
});

app.listen(3000, function (err) {
  if (err) {
    console.log("here is the error: ", err);
    return;
  }
  console.log("server is up and running");
});
