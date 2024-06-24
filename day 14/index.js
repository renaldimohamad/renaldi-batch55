const express = require("express");
const { sequelize, QueryTypes } = require("sequelize");

const sequelize = new sequelize(config.development);
const config = require("./config/config.json");

const path = require("path");
const { type } = require("os");
const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use(express.urlencoded({ extended: false }));
app.get("/", home);
app.get("/myProject", myProject);
app.get("/addProject", viewproject);
app.post("/addProject", addBlog);
app.get("/detailProject/:id", detailProject);

app.get("/updateProject/:id", editProjectView);
app.post("/updateProject", updateProject);
app.post("/deleteProject/:id", deleteProject);

app.get("/testimonial", testimonial);
app.get("/contact", contact);

// HOME

function home(req, res) {
  res.render("index");
}

// MY PROJECT

async function myProject(req, res) {
  const query = `SELECT * FROM "Blogs"`;

  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("myProject", { data: obj });
}
function viewproject(req, res) {
  res.render("addProject");
}

// ADD

async function addBlog(req, res) {
  const { title, content } = req.body;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `INSERT INTO "Blogs"(title, content, "createdAt", "updatedAt") VALUES ('${title}', '${content}'), '${dateString}'), '${dateString}')`;

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("myProject");
}

async function editProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("updateProject", { data: obj[0] }); // obj[0] data array pertama
}

// UPDATE PROJECT

async function updateProject(req, res) {
  const { title, content, id } = req.body;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `UPDATE "Blogs" SET title='${title}', content='${content}', "createdAt"='${dateString}', "updatedAt"='${dateString} WHERE id=${id}'            `;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/blog");
}

// DELETE

async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM "Blogs" WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/myProject");
}

// DETAIL PROJECT

async function detailProject(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id='${id}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("check :", detail);
  res.render("detailProject", { detail: obj[0] });
}

function detailProject(req, res) {
  res.render("detailProject");
}

// TESTIMONIAL

function testimonial(req, res) {
  res.render("testimonial");
}

// CONTACT

function contact(req, res) {
  res.render("contact");
}
app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
