const cors = require("cors");
const HttpError = require("../utils/http-error");

const allowedOrigins = [
  "http://localhost:5173",
  "https://programacion-avanzada-ii-react.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new HttpError(
          401,
          "No se ha proporcionado un origen permitido",
          "auth/login"
        ).setErrors([{ origin: "El origen no está autorizado por CORS" }])
      );
    }
  },
  credentials: true,
};

module.exports = cors(corsOptions);
