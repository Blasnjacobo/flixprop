const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema(
  {
    codigo: String,
    titulo: String,
    universo: String,
    fecha: String,
    descripcion: String,
    tags: String,
    img: String
  },
  {
    timestamps: true,
  }
);

module.exports.Noticias = mongoose.model(
  "Noticia",
  noticiaSchema,
  "noticias"
);
