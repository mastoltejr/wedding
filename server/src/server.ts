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
import { readData } from './googleUtil';

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

const expressPort = process.env.EXPRESS_PORT || 5000;
app.listen(expressPort, () =>
  console.log(`Server running on port ${expressPort}`)
);
