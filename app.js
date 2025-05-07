const express = require("express");
require("dotenv").config();
const moviesRoutes = require("./src/routes/movies");
const actorsRoutes = require("./src/routes/actors");
const genresRoutes = require("./src/routes/genres");
const categoriesRoutes = require("./src/routes/categories");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src", "public")));

app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/actors", actorsRoutes);
app.use("/posters", express.static(path.join(__dirname, "public", "posters")));

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
