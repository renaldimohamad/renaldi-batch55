const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/myProject", myProject);
app.get("/addProject", viewproject);
app.post("/addProject", addBlog);
app.post("/detailProject/:id", detailProject);
app.get("/testimonial", testimonial);
app.get("/contact", contact);

function home(req, res) {
  res.render("index");
}
function myProject(req, res) {
  res.render("myProject", { data });
}
function viewproject(req, res) {
  res.render("addProject");
}
function addBlog(req, res) {
  const { title, content } = req.body;

  console.log("title :", title);
  console.log("content :", content);

  const dataProject = { title, content };

  const test = data.unshift(dataProject);

  res.redirect("myProject");
  console.log(test);
}
function detailProject(req, res) {
  const { id } = req.params;

  const data = {
    id,
    title,
    content,
  };

  res.render("detailProject", { data });
}

function testimonial(req, res) {
  res.render("testimonial");
}
function contact(req, res) {
  res.render("contact");
}
app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
