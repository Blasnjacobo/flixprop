const { getData } = require("./googleSheets");
const mongoose = require('mongoose');

// Compare data and update MongoDB if needed
async function updateDatabaseIfNeeded() {
    try {
      console.log("Checking for spreadsheet updates...");
  
      // Fetch data from Google Sheets
      const dataFromSheet = await getData();
      console.log("Data from Google Sheets:", dataFromSheet);
  
      // Connect to MongoDB
      const db = mongoose.connection;
      const collection = db.collection("universos");
  
      // Fetch data from MongoDB
      const dataFromDB = await collection.find({}).toArray();
      console.log("Data from MongoDB:", dataFromDB);
  
      // Update or insert data into MongoDB
      for (let i = 1; i < dataFromSheet.length; i++) {
        // Start from index 1 to skip the first row
        const sheetItem = dataFromSheet[i];
  
        const matchInDB = dataFromDB.find(
          (dbItem) => dbItem.codigo === sheetItem[3]
        ); // Assuming codigo is in the fourth column
  
        if (!matchInDB) {
          // If no match is found, insert the new document
          await collection.insertOne({
            categoria: sheetItem[0],
            universo: sheetItem[1],
            descripcion: sheetItem[2],
            codigo: sheetItem[3],
            activo: sheetItem[4],
            url: sheetItem[5],
          });
          console.log(`New item added to MongoDB: ${sheetItem[3]}`);
        } else {
          // If a match is found, check if any fields have changed
          const fieldsToCheck = [
            "categoria",
            "universo",
            "descripcion",
            "codigo",
            "activo",
            "url",
          ];
          let hasChanges = false;
          for (const field of fieldsToCheck) {
            if (matchInDB[field] !== sheetItem[fieldsToCheck.indexOf(field)]) {
              hasChanges = true;
              break;
            }
          }
  
          if (hasChanges) {
            // If any fields have changed, update the document
            await collection.updateOne(
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
            console.log(`Document updated in MongoDB: ${sheetItem[3]}`);
          } else {
            console.log(`No changes detected for document: ${sheetItem[3]}`);
          }
        }
      }
  
      console.log("Database update complete.");
    } catch (error) {
      console.error("Error updating database:", error);
    }
  }
module.exports = { updateDatabaseIfNeeded };
