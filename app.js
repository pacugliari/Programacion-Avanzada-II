const express = require("express");
require("dotenv").config();
const moviesRoutes = require("./src/routes/api/movies");
const actorsRoutes = require("./src/routes/api/actors");
const genresRoutes = require("./src/routes/api/genres");
const categoriesRoutes = require("./src/routes/api/categories");
const monolithMoviesRoutes = require("./src/routes/monolith/movies");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const fs = require("fs");
const { getMovies } = require("./src/services/movies");
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(expressLayouts);
app.set("layout", "./layout");
app.use(methodOverride('_method'));

//API
app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/actors", actorsRoutes);
app.use("/posters", express.static(path.join(__dirname, "public", "posters")));

//MONOLITH
app.use("/movies", monolithMoviesRoutes);

//RUTAS DE ERROR
app.use(async (err, req, res, next) => {
  console.error(err.stack); // Log interno

  const statusCode = err.status || 500;
  const title = err.title || "Error";
  const message =
    err.message || "Se ha generado un error inesperado en el servidor.";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      error: true,
      message,
    });
  }

  if (req.file && req.file.path) {
    fs.unlink(req.file.path, () => {});
  }

  res.status(statusCode).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    errorMessage: message,
    errorCode: statusCode,
  });
});

app.use("/", (req, res) => {
  res.redirect("/movies");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server corriendo en el puerto ${process.env.PORT} (http://localhost:${process.env.PORT})`
  );
});
