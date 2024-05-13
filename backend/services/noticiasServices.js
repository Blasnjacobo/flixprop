const { getData } = require("./googleSheets");
const mongoose = require('mongoose');

async function updateNoticiasCollection() {
  try {
    const noticias = await getData("Noticias");
    console.log(noticias)
    const db = mongoose.connection;
    const noticiasCollection = db.collection("noticias");

    const dataFromDB = await noticiasCollection.find({}).toArray();
    console.log(`Data from MongoDB (noticias):`, dataFromDB);

    for (let i = 1; i < noticias.length; i++) {
      const sheetItem = noticias[i];
      const matchInDB = dataFromDB.find(dbItem => dbItem.codigo === sheetItem[0]);

      if (!matchInDB) {
        await noticiasCollection.insertOne({
          codigo: sheetItem[0],
          titulo: sheetItem[1],
          universo: sheetItem[2],
          fecha: sheetItem[3],
          descripcion: sheetItem[4],
          tags: sheetItem[5],
          img: sheetItem[6],
        });
        console.log(`New item added to MongoDB (noticias): ${sheetItem[0]}`);
      } else {
        const fieldsToCheck = ["codigo", "titulo", "universo", "fecha", "descripcion", "tags", "img"];
        let hasChanges = false;
        for (const field of fieldsToCheck) {
          if (matchInDB[field] !== sheetItem[fieldsToCheck.indexOf(field)]) {
            hasChanges = true;
            break;
          }
        }

        if (hasChanges) {
          await noticiasCollection.updateOne(
            { _id: matchInDB._id },
            {
              $set: {
                codigo: sheetItem[0],
                titulo: sheetItem[1],
                universo: sheetItem[2],
                fecha: sheetItem[3],
                descripcion: sheetItem[4],
                tags: sheetItem[5],
                img: sheetItem[6],
              },
            }
          );
          console.log(`Document updated in MongoDB (noticias): ${sheetItem[0]}`);
        } else {
          console.log(`No changes detected for document (noticias): ${sheetItem[0]}`);
        }
      }
    }

  } catch (error) {
    console.error("Error updating noticias collection:", error);
  }
}

module.exports = { updateNoticiasCollection };
