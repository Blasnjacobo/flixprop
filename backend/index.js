const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config();
const { connectToMongoDB } = require("./db/mongodb");
const { updateDatabaseIfNeeded } = require("./config/dataUpdater");
const universos = require("./routes/universos")
const noticias = require("./routes/noticias")

const PORT = process.env.PORT || 5000;

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/universos", universos)
app.use("/noticias", noticias)

connectToMongoDB()
  .then(() => {
    console.log("Connected to MongoDB");
    // Schedule a task to run every hour
    cron.schedule("0 * * * *", async () => {
      console.log("Checking for spreadsheet updates...");
      await updateDatabaseIfNeeded();
    });
    app.listen(PORT, () =>
      console.log(`Server Port: ${PORT}, you are connected to database`)
    );
  })
  .catch((error) => console.log(`${error} did not connect to MongoDB`));