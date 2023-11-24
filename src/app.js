import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bycrypt from "bcryptjs";
import createError from "http-errors";

import models from "./models";
import routes from "./routes";

const app = express();

// MongooseDB setup
mongoose.set("strictQuery", false);
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  return await mongoose.connect(mongoDB);
}

// Passport setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await models.User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bycrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.User[1],
  };
  next();
});

// ROUTES
app.use("/", routes.post);
app.use("/user", routes.user);
app.use("/comments", routes.comment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
