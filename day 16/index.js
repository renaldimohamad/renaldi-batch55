const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");

const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./src/middleware/uploadFile");

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
const { error } = require("console");
const { hasSubscribers } = require("diagnostics_channel");
const { hash } = require("crypto");

const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/assets", express.static(path.join(__dirname, "src/assets")));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads"))); // pengambilan secara statist
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    name: "data",
    secret: "rahasiabgtcui",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", home);

app.get("/addProject", addProjectForm);
app.post("/addProject", upload.single("image"), addProject);

app.get("/detailProject/:id", detailProject);

app.get("/editProject/:id", editProjectForm);
app.post("/updateProject", upload.single("image"), updateProject);

app.post("/deleteProject/:id", deleteProject);

app.get("/testimonial", testimonial);
app.get("/contact", contact);

app.get("/login", loginForm);
app.post("/login", login);
app.get("/register", registerForm);
app.post("/register", register);
app.get("/logout", logout);

// fungsi untuk hitung durasi bulan
function getMonthDuration(startDateStr, endDateStr) {
  const startMonth = startDateStr.split("-")[1]; // ambil value bulan start
  const endMonth = endDateStr.split("-")[1]; // ambil value bulan end

  const totalMonth = endMonth - startMonth + 1;
  return totalMonth;
}

// HOME
async function home(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  if (isLogin === undefined) {
    return res.redirect("login");
  }

  const query = `SELECT "Users".name, "Projects".* FROM "Users" RIGHT JOIN "Projects" ON "Users".name = "Projects".name ORDER BY "Users".name`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  // tambah properti untuk durasi
  const projects = obj.map((item) => {
    return {
      ...item,
      duration: getMonthDuration(item.start_date, item.end_date),
    };
  });

  res.render("index", { projects, user, isLogin });
}

// ADD PROJECT
function addProjectForm(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  if (isLogin === undefined) {
    return res.redirect("login");
  }

  res.render("addProject", { isLogin, user });
}

async function addProject(req, res) {
  const { name, description, start_date, end_date, tech } = req.body;

  const technologies = `{${tech.map((tech) => `"${tech}"`).join(",")}}`;
  const imagesrc = `http://localhost:${port}/uploads/${req.file.filename}`;
  const authorName = req.session.user.name;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `INSERT INTO "Projects" (name, author, start_date, end_date, description, technologies, image, "createdAt", "updatedAt")
      VALUES ('${name}', '${authorName}','${start_date}', '${end_date}', '${description}', '${technologies}', '${imagesrc}', '${dateString}', '${dateString}')`;

  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

// EDIT PROJECT
async function editProjectForm(req, res) {
  const { id } = req.params;
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  if (isLogin === undefined) {
    return res.redirect("login");
  }

  const query = `SELECT * FROM "Projects" WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  const project = {
    ...obj[0],
    technologies: {
      nodejs: obj[0].technologies.find((item) => item === "nodejs")
        ? true
        : false,
      reactjs: obj[0].technologies.find((item) => item === "reactjs")
        ? true
        : false,
      nextjs: obj[0].technologies.find((item) => item === "nextjs")
        ? true
        : false,
      typescript: obj[0].technologies.find((item) => item === "typescript")
        ? true
        : false,
    },
  };

  res.render("editProject", { project, isLogin, user });
}

// UPDATE PROJECT
async function updateProject(req, res) {
  const { id, name, start_date, end_date, description, tech } = req.body;

  const technologies = `{${tech.map((tech) => `"${tech}"`).join(",")}}`;
  const imagesrc = `http://localhost:${port}/uploads/${req.file.filename}`;

  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace("T", " ");

  const query = `UPDATE "Projects" 
    SET name='${name}', start_date='${start_date}', end_date='${end_date}', description='${description}', technologies='${technologies}', image='${imagesrc}', "updatedAt"='${dateString}' 
    WHERE id='${id}'`;

  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/");
}

// DELETE
async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM "Projects" WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

// DETAIL PROJECT
async function detailProject(req, res) {
  const { id } = req.params;
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  if (isLogin === undefined) {
    return res.redirect("login");
  }

  const query = `SELECT * FROM "Projects" WHERE id='${id}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  const detail = {
    ...obj[0],
    duration: getMonthDuration(obj[0].start_date, obj[0].end_date),
  };

  res.render("detailProject", { detail, isLogin, user });
}

// TESTIMONIAL
function testimonial(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  if (isLogin === undefined) {
    return res.redirect("login");
  }

  const rating = parseInt(req.query.rating);
  let filteredTestimonials = testimonials;

  if (rating) {
    filteredTestimonials = testimonials.filter((t) => t.ratting === rating);
  }

  res.render("testimonial", {
    testimonials: filteredTestimonials,
    isLogin,
    user,
  });
}

// CONTACT
function contact(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("contact", { isLogin, user });
}

// LOGIN
function loginForm(req, res) {
  const isLogin = req.session.isLogin;

  if (isLogin) {
    return res.redirect("/");
  }

  res.render("login-form");
}

async function login(req, res) {
  const { email, password } = req.body;

  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!obj.length) {
    console.error("user not found");
    req.flash("danger", "Login Failed: Email is wrong!");
    return res.redirect("/login");
  }

  // bandingin password
  bcrypt.compare(password, obj[0].password, (err, resault) => {
    if (err) {
      req.flash("danger", "Login Failed: Internal Server Error");
      return res.redirect("/login");
    }

    if (!resault) {
      req.flash("danger", "Login Failed: Password is wrong!");
      return res.redirect("/login");
    }

    req.flash("success", "Login Success!");
    req.session.isLogin = true;
    req.session.user = {
      name: obj[0].name,
      email: obj[0].email,
    };

    res.redirect("/");
  });
}

function registerForm(req, res) {
  const isLogin = req.session.isLogin;

  if (isLogin) {
    return res.redirect("/");
  }

  res.render("register-form");
}

// REGISTER
async function register(req, res) {
  const { name, email, password } = req.body;

  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (obj.length === 1) {
    req.flash("failed", "Register Failed: Email Already Use!");
    return res.redirect("/register");
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash(
        "danger",
        "Register Failed : password failed to be encyptionsss!"
      );
      return res.redirect("/register");
    }

    const date = new Date();
    const dateString = date.toISOString().slice(0, 19).replace("T", " ");

    const query = `INSERT INTO "Users"(name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}','${hash}','${dateString}','${dateString}')`;
    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Register Success!");
    res.redirect("/login");
  });
}

// LOGOUT
function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
}

app.listen(port, function () {
  console.log(`Server berjalan di port ${port}`);
});
