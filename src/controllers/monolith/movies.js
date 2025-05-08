const { getactors } = require("../../services/actors");
const { getcategories } = require("../../services/categories");
const { getgenres } = require("../../services/genres");
const path = require("path");
const {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
} = require("../../services/movies");

exports.index = async (req, res) => {
  let movies = [];
  try {
    movies = await getmovies();
    res.render("movies/index", { movies, title: "Lista de peliculas" });
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

exports.detail = async (req, res) => {
  const { id } = req.params;
  try {
    const pelicula = await getPeliculaById(id);
    const host = req.headers.host;

    const peliculaConHost = {
      ...pelicula,
      poster: `http://${host}${pelicula.poster}`,
    };

    if (!pelicula)
      return res.status(400).json({
        message: "El ID no corresponde a una pelicula registrada",
      });

    res.render("movies/detail", {
      movie: peliculaConHost,
      title: "Detalle de pelicula",
    });
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

exports.create = async (req, res) => {
  let actors = [];
  let categories = [];
  let genres = [];
  try {
    actors = await getactors();
    categories = await getcategories();
    genres = await getgenres();
    res.render("movies/create", {
      title: "Crear pelicula",
      actors,
      genres,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const pelicula = await getPeliculaById(id);
    if (pelicula) {
      await deletePelicula(id);
      const oldPosterPath = path.join(
        "public",
        "posters",
        pelicula.poster.split("/").pop()
      );

      if (fs.existsSync(oldPosterPath)) {
        fs.unlinkSync(oldPosterPath);
      }

      // Redirigir después de la eliminación
      res.redirect("/movies"); // O redirigir a donde necesites
    } else {
      res.status(400).json({
        message: "El código no corresponde a una película registrada",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};
