const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    categorias: String,
    codigo: String,
    url: String
  },
  {
    timestamps: true,
  }
);

module.exports.Categoria = mongoose.model(
  "Categoria",
  categoriaSchema,
  "categorias"
);
