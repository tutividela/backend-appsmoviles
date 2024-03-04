import express, { json } from "express";
import bodyParser from "body-parser";
import familyRouter from "./routes/families.routes.js";
import encuestaRouter from "./routes/encuestas.routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const { connect, connection } = mongoose;
const { json: _json, urlencoded } = bodyParser;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(json());

app.use("/families", familyRouter);
app.use("/encuestas", encuestaRouter);

app.use("/images", express.static("images"));

app.use(_json());
app.use(urlencoded({ limit: "10mb", extended: false }));

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
