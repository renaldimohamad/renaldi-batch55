const express = require("express");
const { sequelize, QueryTypes } = require("sequelize");

const sequelize = new sequelize(config.development);
const config = require("./config/config.json");

const path = require("path");
const { type } = require("os");
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
app.get("/detailProject/:id", detailProject);
app.get("/testimonial", testimonial);
app.get("/contact", contact);

// app.get("/updateProject/:id", editProjectView);

function home(req, res) {
  res.render("index");
}
async function myProject(req, res) {
  const query = `SELECT * FROM "Blogs"`;

  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("myProject", { data: obj });
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

  // const data = {
  //   id,
  //   title,
  //   content,
  // };

  const detail = data[id];

  console.log("check :", detail);
  res.render("detailProject", { detail });
}

//detail project
// function editProjectView(req, res) {
//   const { id } = req.params;

//   const dataFilter = data[parseInt(id)];
//   dataFilter.id = parseInt(id);

//   res.render("updateProject", { data: dataFilter });
// }

function detailProject(req, res) {
  res.render("detailProject");
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
