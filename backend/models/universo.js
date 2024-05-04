const mongoose = require("mongoose");

// Define the allowed values for the 'universo' field
const allowedUniversos = ["Pelicula", "Serie", "Anime"];

const universoSchema = new mongoose.Schema(
  {
    categoria: {
      type: String,
      enum: allowedUniversos,
    },
    universo: String,
    descripcion: String,
    codigo: String,
    activo: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports.Universo = mongoose.model(
  "Universo",
  universoSchema,
  "universos"
);
