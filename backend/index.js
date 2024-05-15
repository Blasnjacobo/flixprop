const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cron = require("node-cron");
dotenv.config();
// const { updateDatabaseIfNeeded } = require("./config/dataUpdater");
const universos = require("./routes/universos");
const noticias = require("./routes/noticias");
const productos = require("./routes/productos");

const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/universos", universos);
app.use("/noticias", noticias);
app.use("/productos", productos);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.mongoDBURL, {})
  .then(() => {
    // Schedule cron job
    cron.schedule("0 * * * *", async () => {
      console.log("Checking for spreadsheet updates...");
      // await updateDatabaseIfNeeded();
    });

    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}, you are connected to database`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
