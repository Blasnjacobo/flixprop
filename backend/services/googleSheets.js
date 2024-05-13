const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config();

const config = {
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/gsheets%40flixprop.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
  credentials: config,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

async function getData(range) {
  try {
    const spreadsheetId = process.env.SPREAD_SHEET_ID;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    throw new Error("Error fetching data from Google Sheets: " + error);
  }
}

module.exports = { getData };
