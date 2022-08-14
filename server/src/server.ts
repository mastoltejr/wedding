import express, {
  Application as ExpressApplication,
  RequestHandler
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  AppData,
  Group,
  People,
  Person,
  readData,
  slimObjects,
  writeData
} from './googleUtil';
import { escapeRegExp } from './util';
import { sendDataEmail, sendEmail, SendEmailProps } from './sendgrid';

dotenv.config();

const app: ExpressApplication = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const denyOptions: RequestHandler = (req, res, next) => {
  if (req.method == 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
  }
  next();
};

const logger: RequestHandler = (req, _, next) => {
  console.log('================================');
  console.log(`${req.route.path}: ${new Date()}`);
  console.log(req.method === 'POST' ? req.body : req.query);
  console.log('--------------------------------');
  next();
};

app.get('/', logger, async (_, res) => {
  const data = await readData();
  res.send(data);
});

app.get('/names', logger, async (req, res) => {
  const { partialName } = req.query;
  const people = (await readData('Person_db')) as People;
  const keys = ['code', 'fullName'] as Array<keyof Person>;
  const searchRegex = new RegExp(escapeRegExp(String(partialName)), 'i');
  const slimData = slimObjects(people, keys).filter((x) =>
    searchRegex.test(String(x.fullName))
  );

  return res.status(200).send(slimData);
});

app.get('/guestList', logger, async (_, res) => {
  const people = (await readData('Person_db')) as People;
  const keys = ['code', 'fullName'] as Array<keyof Person>;
  const slimData = slimObjects(
    people.filter((p) => p.comment !== 'Plus 1' && !!p.firstName),
    keys
  );
  return res.status(200).send(slimData);
});

app.get('/userInfo', logger, async (req, res) => {
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

app.post('/userInfo', denyOptions, logger, async (req, res) => {
  const { person, group, peopleInGroup } = req.body as AppData;
  const result = await writeData([person, group, ...peopleInGroup]);
  sendDataEmail(
    { person, group, peopleInGroup, success: result },
    {
      to: 'stoltewedding23@gmail.com',
      subject: 'Data From: ' + person.fullName
    }
  );
  return res.status(200).send(result);
});

app.post('/sendEmail', denyOptions, logger, async (req, res) => {
  const { person, group, peopleInGroup, emailType } = req.body as AppData &
    Pick<SendEmailProps, 'emailType'>;
  sendEmail({
    people: [person, ...peopleInGroup],
    group: group,
    emailType: emailType
  });
  res.status(200).send(true);
});

const expressPort = process.env.EXPRESS_PORT || 5000;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
