const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");

const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/7545185/pexels-photo-7545185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    contens: "Build a foundation for the future with every piece learned",
    author: "Antonio Elz",
    ratting: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/8929332/pexels-photo-8929332.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    contens:
      "Flowing with harmony, letting the soul fly free along with the violin melody",
    author: "Agatha Christie",
    ratting: 3,
  },
  {
    image:
      "https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    contens:
      "Anchored in the digital world, chasing dreams one click at a time",
    author: "Surya Elidanto",
    ratting: 4,
  },
  {
    image:
      "https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=600",
    contens: "It's time to embrace the day with a cup of warmth",
    author: "Ethan Blackwood",
    ratting: 4,
  },
  {
    image:
      "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    contens: "Ayo jelajahi dunia, topi bulatku akan menuntun langkahku",
    author: "Garrett Hart",
    ratting: 3,
  },
  {
    image:
      "https://images.pexels.com/photos/10973825/pexels-photo-10973825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    contens:
      "When the eyes are glued to the page, the soul explores the beauty of the words",
    author: "Lucas Archer",
    ratting: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/3761513/pexels-photo-3761513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    contens:
      "In this world, education is the key to opening the door to the future",
    author: "Ruby Wells",
    ratting: 2,
  },
  {
    image:
      "https://images.pexels.com/photos/3638045/pexels-photo-3638045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    contens: "Classic never goes out of style: style with a round hat.",
    author: "Brett Sayles",
    ratting: 1,
  },
];

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

  const query = `INSERT INTO "Blogs" (title, content, "createdAt", "updatedAt") VALUES ('${title}', '${content}', '${dateString}', '${dateString}')`;

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("myProject");
}

async function editProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "Blogs" WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("editProject", { data: obj[0] }); // obj[0] data array pertama
}

// UPDATE PROJECT

async function updateProject(req, res) {
  const { title, content, id } = req.body;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `UPDATE "Blogs" SET title='${title}', content='${content}', "updatedAt"='${dateString}' WHERE id='${id}'`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/myProject");
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

  res.render("detailProject", { detail: obj[0] });
}

// TESTIMONIAL

function testimonial(req, res) {
  const rating = parseInt(req.query.rating);
  let filteredTestimonials = testimonials;

  if (rating) {
    filteredTestimonials = testimonials.filter((t) => t.ratting === rating);
  }

  res.render("testimonial", { testimonials: filteredTestimonials });
}

// CONTACT

function contact(req, res) {
  res.render("contact");
}
app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
