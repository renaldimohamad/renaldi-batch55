const express = require("express");
const { sequelize } = require("sequelize");

const path = require("path");
const app = express();
const port = 5000;

const data = [];
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
  res.render("testimonial", { testimonials });
}
function contact(req, res) {
  res.render("contact");
}
app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
