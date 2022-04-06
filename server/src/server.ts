import express, {
  Request,
  Response,
  NextFunction,
  Application as ExpressApplication,
  RequestHandler,
  application
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './keyfile.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const prisma = new PrismaClient();
dotenv.config();

const isProductionEnv = false;
const endpoint = isProductionEnv
  ? 'https://auth.stolte.us'
  : 'http://localhost:5001';

const app: ExpressApplication = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const syncDatabaseToSheets = async () => {
  const authClient = await auth.getClient();
  const googleSheetsInstance = google.sheets({
    version: 'v4',
    auth: authClient
  });

  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId: process.env['SPREADSHEET_ID'], // spreadsheet id
    range: 'Person_db!A2:Z2' //range of cells to read from.
  });
  console.log(readData.data.values);
  return readData.data.values;
};

app.get('/', async (req, res) => {
  const data = await syncDatabaseToSheets();
  res.send(data);
});

const expressPort = process.env.EXPRESS_PORT || 5000;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
