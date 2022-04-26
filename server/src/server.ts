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
import { Group, People, Person, readData, slimObjects } from './googleUtil';
import { escapeRegExp } from './util';
import { google } from 'googleapis';

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

app.get('/guestList', async (req, res) => {
  const people = (await readData('Person_db')) as People;
  const keys = ['code', 'fullName'] as Array<keyof Person>;
  const slimData = slimObjects(people, keys);
  return res.status(200).send(slimData);
});

app.get('/userInfo', async (req, res) => {
  const { userCode } = req.query;
  const people = (await readData('Person_db')) as People;
  const groups = (await readData('Group_db')) as Group[];
  const person = people.find((p) => p.code === userCode);
  if (person === undefined) return res.status(400).send('Person not found');

  const group = groups.find((g) => g.groupCode === person.groupCode) ?? {};
  const peopleInGroup = people.filter(
    (p) => p.groupCode === person.groupCode && p.code !== person.code
  );

  return res.status(200).send({
    person,
    group,
    peopleInGroup
  });
});

const expressPort = process.env.EXPRESS_PORT || 5000;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
