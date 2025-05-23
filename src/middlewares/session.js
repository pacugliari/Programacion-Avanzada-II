const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 1,
    httpOnly: true,
    secure: false,
    path: "/",
  },
});

function userState(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

module.exports = {
  sessionMiddleware,
  userState,
};
