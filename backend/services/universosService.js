const { getData } = require("./googleSheets");
const mongoose = require('mongoose');

async function updateUniversosCollection() {
  try {
    const universos = await getData("Universos");
    const db = mongoose.connection;
    const universosCollection = db.collection("universos");

    const dataFromDB = await universosCollection.find({}).toArray();
    console.log(`Data from MongoDB (universos):`, dataFromDB);

    for (let i = 1; i < universos.length; i++) {
      const sheetItem = universos[i];
      const matchInDB = dataFromDB.find(dbItem => dbItem.codigo === sheetItem[3]);

      if (!matchInDB) {
        await universosCollection.insertOne({
          categoria: sheetItem[0],
          universo: sheetItem[1],
          descripcion: sheetItem[2],
          codigo: sheetItem[3],
          activo: sheetItem[4],
          url: sheetItem[5],
        });
        console.log(`New item added to MongoDB (universos): ${sheetItem[3]}`);
      } else {
        const fieldsToCheck = ["categoria", "universo", "descripcion", "codigo", "activo", "url"];
        let hasChanges = false;
        for (const field of fieldsToCheck) {
          if (matchInDB[field] !== sheetItem[fieldsToCheck.indexOf(field)]) {
            hasChanges = true;
            break;
          }
        }

        if (hasChanges) {
          await universosCollection.updateOne(
            { _id: matchInDB._id },
            {
              $set: {
                categoria: sheetItem[0],
                universo: sheetItem[1],
                descripcion: sheetItem[2],
                codigo: sheetItem[3],
                activo: sheetItem[4],
                url: sheetItem[5],
              },
            }
          );
          console.log(`Document updated in MongoDB (universos): ${sheetItem[3]}`);
        } else {
          console.log(`No changes detected for document (universos): ${sheetItem[3]}`);
        }
      }
    }

  } catch (error) {
    console.error("Error updating universos collection:", error);
  }
}

module.exports = { updateUniversosCollection };
