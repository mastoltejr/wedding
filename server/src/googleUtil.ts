import { format, parse } from 'date-fns';
import { nanoid } from 'nanoid';
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './keyfile.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

interface Key {
  key: string;
  fromSheet: (a: string) => any;
  toSheet: (a: any) => string;
}

const stringKey: Pick<Key, 'fromSheet' | 'toSheet'> = {
  fromSheet: (a) => a,
  toSheet: (a) => (a === undefined || a === null ? '' : String(a))
};

const intKey: Pick<Key, 'fromSheet' | 'toSheet'> = {
  fromSheet: (a) => +a,
  toSheet: (a) => (a === undefined || a === null ? '' : String(a))
};

const dateKey: Pick<Key, 'fromSheet' | 'toSheet'> = {
  fromSheet: (a) => (!!!a ? new Date() : parse(a, 'Pp', new Date())),
  toSheet: (a) => format(new Date(), 'Pp')
};

const booleanKey: Pick<Key, 'fromSheet' | 'toSheet'> = {
  fromSheet: (a) => (a === 'TRUE' ? true : false),
  toSheet: (a) => (a === undefined || a === null ? '' : a ? 'TRUE' : 'FALSE')
};

const personDbKeys: Key[] = [
  { key: 'id', ...intKey },
  {
    key: 'shortCode',
    ...stringKey,
    fromSheet: (a) => (a === '' ? nanoid(6) : a)
  },
  { key: 'lastName', ...stringKey },
  { key: 'firstName', ...stringKey },
  { key: 'suffix', ...stringKey },
  { key: 'title', ...stringKey },
  { key: 'family', ...stringKey },
  { key: 'comment', ...stringKey },
  { key: 'groupLabel', ...stringKey },
  { key: 'email', ...stringKey },
  { key: 'phone', ...stringKey },
  { key: 'phoneAlerts', ...booleanKey },
  { key: 'mealConsideration', ...stringKey },
  { key: 'highchair', ...booleanKey },
  { key: 'wheelchair', ...booleanKey },
  { key: 'inviteRehearsal', ...booleanKey },
  { key: 'inviteWedding', ...booleanKey },
  { key: 'inviteAfterParty', ...booleanKey },
  { key: 'inviteSunday', ...booleanKey },
  { key: 'saveTheDate', ...stringKey },
  { key: 'rsvpRehearsal', ...booleanKey },
  { key: 'rsvpWedding', ...booleanKey },
  { key: 'rsvpAfterParty', ...booleanKey },
  { key: 'rsvpSunday', ...booleanKey },
  { key: 'lastUpdated', ...dateKey }
];

const groupDbKeys: Key[] = [
  { key: 'id', ...intKey },
  { key: 'groupLabel', ...stringKey },
  { key: 'language', ...stringKey },
  { key: 'paperless', ...booleanKey },
  { key: 'address', ...stringKey },
  { key: 'address2', ...stringKey },
  { key: 'city', ...stringKey },
  { key: 'state', ...stringKey },
  { key: 'zip', ...intKey },
  { key: 'country', ...stringKey },
  { key: 'mailInvite', ...booleanKey },
  { key: 'mailThankyou', ...booleanKey }
];

export const sheetToDB = (
  data: Array<string[]>,
  type: 'person' | 'group' = 'person'
) =>
  data
    .filter((row) => !!row[0])
    .reduce<Object[]>((objs, row, i) => {
      let obj = (type === 'person' ? personDbKeys : groupDbKeys).reduce(
        (obj, { key, fromSheet }, k) => ({ ...obj, [key]: fromSheet(row[k]) }),
        {}
      );
      return [...objs, obj];
    }, []);

export const dbToSheet = (
  data: Array<{}>,
  type: 'person' | 'group' = 'person'
) =>
  data.reduce<Array<string[]>>((rows, obj) => {
    let row = (type === 'person' ? personDbKeys : groupDbKeys).map(
      ({ key, toSheet }) => toSheet(obj[key as keyof typeof obj])
    );
    return [...rows, row];
  }, []);

export const readData = async () => {
  const authClient = await auth.getClient();
  const googleSheetsInstance = google.sheets({
    version: 'v4',
    auth: authClient
  });

  // Read data from google sheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId: process.env['SPREADSHEET_ID'], // spreadsheet id
    range: 'Person_db!A2:Z500' //range of cells to read from.
  });

  return sheetToDB(readData.data.values);
};
