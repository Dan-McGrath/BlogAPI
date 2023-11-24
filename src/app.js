import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { connectDb } from "./models";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  });
  