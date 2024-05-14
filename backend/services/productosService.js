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
          nombre: sheetItem[1],
          universo: sheetItem[2],
          personaje: sheetItem[3],
          link: sheetItem[4],
          descripcion: sheetItem[5],
          vendedor: sheetItem[6],
          categoria: sheetItem[7],
          tags: sheetItem[8],
          precio: sheetItem[9],
          imgProducto: sheetItem[10],
          imgEscena: sheetItem[11],
          imgModelo: sheetItem[12],
          imgExtra: sheetItem[13],
          estatus: sheetItem[14],
          masVendido: sheetItem[15],
          masReciente: sheetItem[16]
        });
        console.log(`New item added to MongoDB (productos): ${sheetItem[0]}`);
      } else {
        const fieldsToCheck = [
          "codigo", "nombre", "universo", "personaje", "link", "descripcion",
          "vendedor", "categoria", "tags", "precio", "imgProducto", "imgEscena", "imgModelo", "imgExtra", "estatus",
          "masVendido", "masReciente"
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
                nombre: sheetItem[1],
                universo: sheetItem[2],
                personaje: sheetItem[3],
                link: sheetItem[4],
                descripcion: sheetItem[5],
                vendedor: sheetItem[6],
                categoria: sheetItem[7],
                tags: sheetItem[8],
                precio: sheetItem[9],
                imgProducto: sheetItem[10],
                imgEscena: sheetItem[11],
                imgModelo: sheetItem[12],
                imgExtra: sheetItem[13],
                estatus: sheetItem[14],
                masVendido: sheetItem[15],
                masReciente: sheetItem[16]
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
