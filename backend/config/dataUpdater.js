const { updateUniversosCollection } = require("../services/universosService");
const { updateNoticiasCollection } = require("../services/noticiasService");
const { updateProductosCollection } = require("../services/productosService");

async function updateDatabaseIfNeeded() {
  try {
    console.log("Checking for spreadsheet updates...");
    await updateUniversosCollection();
    await updateNoticiasCollection();
    await updateProductosCollection();
    console.log("Database update complete.");
  } catch (error) {
    console.error("Error updating database:", error);
  }
}

module.exports = { updateDatabaseIfNeeded };
