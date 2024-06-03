const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cron = require("node-cron");
const passport = require("passport");
const passportSetup = require("./passport.js");
dotenv.config();
const { updateDatabaseIfNeeded } = require("./config/dataUpdater")
const universos = require("./routes/universos");
const noticias = require("./routes/noticias");
const productos = require("./routes/productos");
const auth = require("./routes/auth.js");
const cart = require("./routes/cart.js");
const payments = require("./routes/payments.js")

const app = express();
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/payments", payments)
app.use("/auth", auth);
app.use("/universos", universos);
app.use("/noticias", noticias);
app.use("/productos", productos);
app.use("/cart", cart);

const PORT = process.env.PORT;
mongoose
  .connect(process.env.mongoDBURL, {})
  .then(() => {
    // Schedule cron job
    cron.schedule("* * * * *", async () => {
      console.log("Checking for spreadsheet updates...");
      await updateDatabaseIfNeeded();
    });

    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}, you are connected to database`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
