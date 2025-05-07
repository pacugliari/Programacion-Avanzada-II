const fs = require("fs");
const path = require("path");
const {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
} = require("../services/movies");

const getmoviesController = async (req, res) => {
  let movies = [];
  try {
    movies = await getmovies();
    const host = req.headers.host;

    const moviesConHost = movies.map((p) => ({
      ...p,
      poster: `http://${host}${p.poster}`,
    }));

    res.status(200).json({ payload: moviesConHost });
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

const getPeliculaByIdController = async (req, res) => {
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

    res.status(200).json({ payload: peliculaConHost });
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

const createPeliculaController = async (req, res) => {
  const { titulo, idCategoria, resumen, genres, actors } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Falta la imagen del poster" });
    }

    if (!titulo || !idCategoria || !resumen || !genres || !actors) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ message: "Faltan datos relevantes" });
    }

    const posterPath = `/posters/${req.file.filename}`;

    const data = {
      ...req.body,
      idCategoria: Number(idCategoria),
      poster: `${posterPath}`,
      genres: JSON.parse(genres),
      actors: JSON.parse(actors),
    };

    const pelicula = await createPelicula(data);

    res.status(201).json({ message: "Película creada", payload: pelicula });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

const updatePeliculaController = async (req, res) => {
  const { id } = req.params;
  const { titulo, idCategoria, resumen, genres, actors } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Falta la imagen del poster" });
    }

    if (!titulo || !idCategoria || !resumen || !genres || !actors) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).json({ message: "Faltan datos relevantes" });
    }

    const pelicula = await getPeliculaById(id);

    if (!pelicula) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).json({
        message: "El ID no corresponde a una película registrada",
      });
    }

    const oldPosterPath = path.join(
      "public",
      "posters",
      pelicula.poster.split("/").pop()
    );

    if (fs.existsSync(oldPosterPath)) {
      fs.unlinkSync(oldPosterPath);
    }

    const posterPath = `/posters/${req.file.filename}`;

    const data = {
      ...req.body,
      idCategoria: Number(idCategoria),
      poster: `${posterPath}`,
      genres: JSON.parse(genres),
      actors: JSON.parse(actors),
    };

    const updated = await updatePelicula(id, data);

    res.status(200).json({
      message: "Película actualizada",
      payload: updated,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

const deletePeliculaController = async (req, res) => {
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
      res.status(200).json({ message: "Pelicula eliminada" });
    } else {
      res.status(400).json({
        message: "El código no corresponde a una pelicula registrada",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Se ha generado un error en el servidor",
      error: error.message,
    });
  }
};

module.exports = {
  getmoviesController,
  getPeliculaByIdController,
  createPeliculaController,
  updatePeliculaController,
  deletePeliculaController,
};
