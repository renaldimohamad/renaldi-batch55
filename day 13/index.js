const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");

const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

const app = express();
const port = 5000;

const projects = [
  {
    id: 1,
    name: "Dumbways Mobile App",
    start_date: "2024-01-05",
    end_date: "2024-02-08",
    description:
      "App that used for dumbways student, it was deployed and can downloaded on playstore. Happy Download.",
    technologies: ["reactjs", "nodejs", "typescript"],
    image: "./assets/Image/images.jpg",
  },
  {
    id: 2,
    name: "Dumbways Website",
    start_date: "2024-02-09",
    end_date: "2024-05-21",
    description: "Web that used for dumbways student.",
    technologies: ["nextjs", "nodejs", "typescript"],
    image: "./assets/Image/images.jpg",
  },
  {
    id: 3,
    name: "Dumbways Website",
    start_date: "2023-09-01",
    end_date: "2023-12-28",
    description: "Web that used for dumbways student.",
    technologies: ["nextjs", "nodejs", "typescript"],
    image: "./assets/Image/images.jpg",
  },
  {
    id: 4,
    name: "Dumbways Website",
    start_date: "2024-02-05",
    end_date: "2024-06-25",
    description: "Web that used for dumbways student.",
    technologies: ["nextjs", "nodejs", "typescript"],
    image: "./assets/Image/images.jpg",
  },
];
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
app.get("/addProject", addProjectForm);
app.post("/addProject", addProject);
app.get("/editProject/:id", editProjectForm);
app.post("/updateProject", updateProject);
app.post("/deleteProject/:id", deleteProject);
app.get("/detailProject/:id", detailProject);
app.get("/testimonial", testimonial);
app.get("/contact", contact);

function getMonthDuration(startDateStr, endDateStr) {
  const startMonth = startDateStr.split("-")[1]; // ambil value bulan start
  const endMonth = endDateStr.split("-")[1]; // ambil value bulan end

  const totalMonth = endMonth - startMonth + 1;
  return totalMonth;
}

async function home(req, res) {
  const query = `SELECT * FROM "Projects"`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  // tambah properti untuk durasi
  const projects = obj.map((item) => {
    return {
      ...item,
      duration: getMonthDuration(item.start_date, item.end_date),
    };
  });

  res.render("index", { projects });
}

function addProjectForm(req, res) {
  res.render("addProject");
}

function addProject(req, res) {
  const { name, description, start_date, end_date } = req.body;
  const technologies = req.body["tech[]"];

  let newId = 1;

  // jika array projects tidak kosong maka buat id berdasarkan id item terkahir pada array projects
  if (projects.length !== 0) {
    newId = projects.at(-1).id + 1;
  }

  const newProject = {
    id: newId,
    name,
    description,
    start_date,
    end_date,
    technologies,
    image: "./assets/Image/images.jpg", // static image
  };

  projects.unshift(newProject);

  res.redirect("/");
}

function editProjectForm(req, res) {
  const { id } = req.params;

  const editData = projects.find((item) => item.id === parseInt(id));

  const project = {
    ...editData,
    technologies: {
      nodejs: editData.technologies.find((item) => item === "nodejs")
        ? true
        : false,
      reactjs: editData.technologies.find((item) => item === "reactjs")
        ? true
        : false,
      nextjs: editData.technologies.find((item) => item === "nextjs")
        ? true
        : false,
      typescript: editData.technologies.find((item) => item === "typescript")
        ? true
        : false,
    },
  };

  res.render("updateProject", { project });
}

function updateProject(req, res) {
  const { id, name, start_date, end_date, description, image } = req.body;
  const technologies = req.body["tech[]"];

  const updateProject = {
    id,
    name,
    start_date,
    end_date,
    description,
    technologies,
    image: "./assets/Image/images.jpg", // static image
  };

  const tempProjects = projects.filter((item) => item.id !== parseInt(id)); // buat array baru tanpa item dengan id yang mau dihapus
  tempProjects.unshift(updateProject);

  projects.splice(0, projects.length, ...tempProjects);

  res.redirect("/");
}

function deleteProject(req, res) {
  const { id } = req.params;

  const newData = projects.filter((item) => item.id !== parseInt(id)); // buat array baru tanpa item dengan id yang mau dihapus
  projects.splice(0, projects.length, ...newData); // ganti array project dengan array baru

  res.redirect("/");
}

function detailProject(req, res) {
  const { id } = req.params;

  const data = projects.find((item) => item.id === parseInt(id));

  const detail = {
    ...data,
    duration: getMonthDuration(data.start_date, data.end_date),
  };

  res.render("detailProject", { detail });
}

function testimonial(req, res) {
  const rating = parseInt(req.query.rating);
  let filteredTestimonials = testimonials;

  if (rating) {
    filteredTestimonials = testimonials.filter((t) => t.ratting === rating);
  }

  res.render("testimonial", { testimonials: filteredTestimonials });
}

function contact(req, res) {
  res.render("contact");
}

app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
