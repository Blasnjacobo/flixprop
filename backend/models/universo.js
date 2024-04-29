const mongoose = require("mongoose");

// Define the allowed values for the 'universo' field
const allowedUniversos = ["Pelicula", "Serie", "Anime"];

const universoSchema = new mongoose.Schema(
  {
    categoria: String,
    universo: {
      type: String,
      enum: allowedUniversos,
    },
    descripcion: String,
    codigo: String,
    activo: Boolean,
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
