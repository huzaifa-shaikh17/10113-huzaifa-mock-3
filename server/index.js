import express from "express";
import db from "./config/db.js";
import bodyParser from "body-parser";
import "dotenv/config";
import slotRouter from "./routes/slotRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const port = process.env.PORT || 8081;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

db();

app.use("/api/slots", slotRouter);
app.use("/api", bookingRouter);

app.listen(port, (error) => {
  if (!error) {
    console.log("server start...");
    console.log("http://localhost:" + port);
  }
});
