// =======================
// 🌐 Importaciones
// =======================
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./src/config/mongo");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

// Rutas API
const moviesRoutes = require("./src/routes/api/movies");
const actorsRoutes = require("./src/routes/api/actors");
const genresRoutes = require("./src/routes/api/genres");
const authRoutes = require("./src/routes/api/auth");
const categoriesRoutes = require("./src/routes/api/categories");

// Rutas Monolito (views)
const monolithMoviesRoutes = require("./src/routes/monolith/movies");
const monolithAuthRoutes = require("./src/routes/monolith/auth");

// Middleware de errores
const errorHandler = require("./src/middlewares/http-error");
const auth = require("./src/middlewares/auth");
const { sessionMiddleware, userState } = require("./src/middlewares/session");

// =======================
// 🚀 Inicialización
// =======================
connectDB();
const app = express();

// =======================
// 🛠️ Middlewares
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(sessionMiddleware);
app.use(userState);

// =======================
// 🎨 Configuración de vistas
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(expressLayouts);
app.set("layout", "./layout");

// =======================
// 🧭 Rutas API
// =======================
app.use("/api/movies", auth, moviesRoutes);
app.use("/api/genres", auth, genresRoutes);
app.use("/api/categories", auth, categoriesRoutes);
app.use("/api/actors", auth, actorsRoutes);
app.use("/api/auth", authRoutes);

// =======================
// 🧾 Rutas del Monolito (Views)
// =======================
app.use("/auth", monolithAuthRoutes);
app.use("/movies", auth, monolithMoviesRoutes);

// Redirección base
app.use("/", (req, res) => {
  return res.redirect("/auth/login");
});

// =======================
// 🧯 Middleware de errores (al final)
// =======================
app.use(errorHandler);

// =======================
// 🖥️ Servidor
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
