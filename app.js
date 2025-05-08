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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(expressLayouts);
app.set("layout", "./layout");

//API
app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/actors", actorsRoutes);
app.use("/posters", express.static(path.join(__dirname, "public", "posters")));

//MONOLITH
app.use("/movies", monolithMoviesRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "La URL indicada no existe en este servidor",
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server corriendo en el puerto ${process.env.PORT} (http://localhost:${process.env.PORT})`
  );
});
