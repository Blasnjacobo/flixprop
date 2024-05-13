const { updateUniversosCollection } = require("../services/universosService");
const { updateNoticiasCollection } = require("../services/noticiasServices");

async function updateDatabaseIfNeeded() {
  try {
    console.log("Checking for spreadsheet updates...");
    await updateUniversosCollection();
    await updateNoticiasCollection();
    console.log("Database update complete.");
  } catch (error) {
    console.error("Error updating database:", error);
  }
}

module.exports = { updateDatabaseIfNeeded };
