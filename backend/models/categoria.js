const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    categorias: String,
    codigo: String,
    descripcion: String,
    descripcion: String,
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
