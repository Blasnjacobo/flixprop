const { getData } = require("./googleSheets");
const mongoose = require('mongoose');

async function updateCategoriasCollection() {
  try {
    const categorias = await getData("Categorias");
    const db = mongoose.connection;
    const categoriasCollection = db.collection("categorias");

    const dataFromDB = await categoriasCollection.find({}).toArray();
    console.log(`Data from MongoDB (categorias):`, dataFromDB);

    for (let i = 1; i < categorias.length; i++) {
      const sheetItem = categorias[i];
      const matchInDB = dataFromDB.find(dbItem => dbItem.codigo === sheetItem[1]);

      if (!matchInDB) {
        await categoriasCollection.insertOne({
          categorias: sheetItem[0],
          codigo: sheetItem[1],
          url: sheetItem[2],
        });
      } else {
        const fieldsToCheck = ["categorias", "codigo", "url"];
        let hasChanges = false;
        for (const field of fieldsToCheck) {
          if (matchInDB[field] !== sheetItem[fieldsToCheck.indexOf(field)]) {
            hasChanges = true;
            break;
          }
        }

        if (hasChanges) {
          await categoriasCollection.updateOne(
            { _id: matchInDB._id },
            {
              $set: {
                categoria: sheetItem[0],
                codigo: sheetItem[1],
                url: sheetItem[2],
              },
            }
          );
        } else {
          console.log(`No changes detected for document (categorias): ${sheetItem[0]}`);
        }
      }
    }

  } catch (error) {
    console.error("Error updating categorias collection:", error);
  }
}

module.exports = { updateCategoriasCollection };
