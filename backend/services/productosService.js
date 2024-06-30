const { getData } = require("./googleSheets");
const mongoose = require('mongoose');

async function updateProductosCollection() {
  try {
    const productos = await getData("Productos");
    console.log('productos service:'+ productos)
    const db = mongoose.connection;
    const productosCollection = db.collection("productos");

    const dataFromDB = await productosCollection.find({}).toArray();
    console.log(`Data from MongoDB (productos):`, dataFromDB);

    for (let i = 1; i < productos.length; i++) {
      const sheetItem = productos[i];
      const matchInDB = dataFromDB.find(dbItem => dbItem.codigo === sheetItem[0]);

      if (!matchInDB) {
        await productosCollection.insertOne({
          codigo: sheetItem[0],
          codigoUniverso: sheetItem[1],
          nombre: sheetItem[2],
          universo: sheetItem[3],
          personaje: sheetItem[4],
          link: sheetItem[5],
          descripcion: sheetItem[6],
          vendedor: sheetItem[7],
          categoria: sheetItem[8],
          tags: sheetItem[9],
          precio: sheetItem[10],
          imgProducto: sheetItem[11],
          imgEscena: sheetItem[12],
          imgModelo: sheetItem[13],
          imgExtra: sheetItem[14],
          estatus: sheetItem[15],
          masVendido: sheetItem[16],
          masReciente: sheetItem[17],
          tallas: sheetItem[18]
        });
        console.log(`New item added to MongoDB (productos): ${sheetItem[0]}`);
      } else {
        const fieldsToCheck = [
          "codigo", "codigoUniverso", "nombre", "universo", "personaje", "link", "descripcion",
          "vendedor", "categoria", "tags", "precio", "imgProducto", "imgEscena", "imgModelo", "imgExtra", "estatus",
          "masVendido", "masReciente", "tallas"
        ];
        let hasChanges = false;
        for (const field of fieldsToCheck) {
          if (matchInDB[field] !== sheetItem[fieldsToCheck.indexOf(field)]) {
            hasChanges = true;
            break;
          }
        }

        if (hasChanges) {
          await productosCollection.updateOne(
            { _id: matchInDB._id },
            {
              $set: {
                codigo: sheetItem[0],
                codigoUniverso: sheetItem[1],
                nombre: sheetItem[2],
                universo: sheetItem[3],
                personaje: sheetItem[4],
                link: sheetItem[5],
                descripcion: sheetItem[6],
                vendedor: sheetItem[7],
                categoria: sheetItem[8],
                tags: sheetItem[9],
                precio: sheetItem[10],
                imgProducto: sheetItem[11],
                imgEscena: sheetItem[12],
                imgModelo: sheetItem[13],
                imgExtra: sheetItem[14],
                estatus: sheetItem[15],
                masVendido: sheetItem[16],
                masReciente: sheetItem[17],
                tallas: sheetItem[18]
              },
            }
          );
          console.log(`Document updated in MongoDB (productos): ${sheetItem[0]}`);
        } else {
          console.log(`No changes detected for document (productos): ${sheetItem[0]}`);
        }
      }
    }

  } catch (error) {
    console.error("Error updating productos collection:", error);
  }
}

module.exports = { updateProductosCollection };
