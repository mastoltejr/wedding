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
import { People, Person, readData, slimObjects } from './googleUtil';
import { escapeRegExp } from './util';

dotenv.config();

const app: ExpressApplication = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get('/', async (req, res) => {
  const data = await readData();
  res.send(data);
});

app.get('/names', async (req, res) => {
  const { partialName } = req.query;
  const people = (await readData('Person_db')) as People;
  const keys = ['code', 'fullName'] as Array<keyof Person>;
  const searchRegex = new RegExp(escapeRegExp(String(partialName)), 'i');
  const slimData = slimObjects(people, keys).filter((x) =>
    searchRegex.test(String(x.fullName))
  );

  return res.status(200).send(slimData);
});

const expressPort = process.env.EXPRESS_PORT || 5000;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
