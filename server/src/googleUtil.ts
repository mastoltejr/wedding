import { format, parse } from 'date-fns';
import { nanoid } from 'nanoid';
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: './keyfile.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export interface Person {
  id: number;
  code: string;
  groupCode: string;
  title: string;
  firstName: string;
  lastName: string;
  suffix: string;
  family: string;
  comment: string;
  groupLabel: string;

  inviteWedding: boolean;
  attendWedding: boolean;
  rsvpWedding: boolean;

  email: string;
  phone: string;
  phoneAlerts: boolean;
  mealConsideration: string;
  highchair: boolean;
  wheelchair: boolean;
  saveTheDate: string;

  inviteShower1: boolean;
  rsvpShower1: boolean;

  inviteShower2: boolean;
  rsvpShower2: boolean;

  inviteRehearsal: boolean;
  rsvpRehearsal: boolean;

  inviteAfterParty: boolean;
  rsvpAfterParty: boolean;

  inviteSunday: boolean;
  rsvpSunday: boolean;

  lastUpdated: Date;
  fullName: string;
}

export type People = Person[];

export interface Group {
  id: number;
  groupCode: string;
  family: string;
  eInvite: boolean;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  mailShower1Invite: boolean;
  mailShower2Invite: boolean;
  mailWeddingInvite: boolean;
  presentIds: number[];
  mailThankyou: boolean;
  lastUpdated: Date;
  primaryPerson: string;
  secondaryPerson: string;
  groupTitle: string;
}

export interface InviteGroup
  extends Omit<Group, 'primaryPerson' | 'secondaryPerson' | 'others'> {
  primaryPerson: Person;
  secondaryPerson?: Person;
  others: People;
}

export interface AppData {
  person: Person;
  group: Group;
  peopleInGroup: People;
}

type DataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'numbers'
  | 'strings';

export type Sheet = 'Person_db' | 'Group_db';

interface Key {
  key: string;
  type: DataType;
  readonly: boolean;
}

interface SheetFunction {
  fromSheet: (v: string) => any;
  toSheet: (v: any) => string;
}

const sheetFunctions: Record<DataType, SheetFunction> = {
  string: {
    fromSheet: (v) => String(v),
    toSheet: (v: string) => v
  },
  number: {
    fromSheet: (v) => +v,
    toSheet: (v: number) => String(v)
  },
  boolean: {
    fromSheet: (v) =>
      v.toLowerCase() === 'yes' ? true : v === '' ? undefined : false,
    toSheet: (v: boolean | undefined) =>
      v === undefined ? 'maybe' : !!v ? 'yes' : 'no'
  },
  date: {
    fromSheet: (a) => (!!!a ? new Date() : parse(a, 'Pp', new Date())),
    toSheet: (a: Date) => format(new Date(), 'Pp')
  },
  numbers: {
    fromSheet: (v) => v.split(',').map((s) => +s),
    toSheet: (v: number[]) => v.join(',')
  },
  strings: {
    fromSheet: (v) => v.split(','),
    toSheet: (v: string[]) => v.join(',')
  }
};

const personReadRange = 'Person_db!A2:AF';
const personWriteRange = 'Person_db!D2:AE2';
const personDbKeys: Key[] = [
  { key: 'id', type: 'number', readonly: true },
  { key: 'code', type: 'string', readonly: true },
  { key: 'groupCode', type: 'string', readonly: true },
  { key: 'title', type: 'string', readonly: false },
  { key: 'firstName', type: 'string', readonly: false },
  { key: 'lastName', type: 'string', readonly: false },
  { key: 'suffix', type: 'string', readonly: false },
  { key: 'family', type: 'string', readonly: false },
  { key: 'comment', type: 'string', readonly: false },
  { key: 'groupLabel', type: 'string', readonly: false },

  { key: 'inviteWedding', type: 'boolean', readonly: false },
  { key: 'attendWedding', type: 'boolean', readonly: false },
  { key: 'rsvpWedding', type: 'boolean', readonly: false },

  { key: 'email', type: 'string', readonly: false },
  { key: 'phone', type: 'string', readonly: false },
  { key: 'phoneAlerts', type: 'boolean', readonly: false },
  { key: 'mealConsideration', type: 'string', readonly: false },
  { key: 'highchair', type: 'boolean', readonly: false },
  { key: 'wheelchair', type: 'boolean', readonly: false },
  { key: 'saveTheDate', type: 'string', readonly: false },

  { key: 'inviteShower1', type: 'boolean', readonly: false },
  { key: 'rsvpShower1', type: 'boolean', readonly: false },

  { key: 'inviteShower2', type: 'boolean', readonly: false },
  { key: 'rsvpShower2', type: 'boolean', readonly: false },

  { key: 'inviteRehearsal', type: 'boolean', readonly: false },
  { key: 'rsvpRehearsal', type: 'boolean', readonly: false },

  { key: 'inviteAfterParty', type: 'boolean', readonly: false },
  { key: 'rsvpAfterParty', type: 'boolean', readonly: false },

  { key: 'inviteSunday', type: 'boolean', readonly: false },
  { key: 'rsvpSunday', type: 'boolean', readonly: false },

  { key: 'lastUpdated', type: 'date', readonly: false },
  { key: 'fullName', type: 'string', readonly: true }
];

const groupReadRange = 'Group_db!A2:S';
const groupWriteRange = 'Group_db!D2:P2';
const groupDbKeys: Key[] = [
  { key: 'id', type: 'number', readonly: true },
  { key: 'groupCode', type: 'string', readonly: true },
  { key: 'family', type: 'string', readonly: true },
  { key: 'eInvite', type: 'boolean', readonly: false },
  { key: 'address', type: 'string', readonly: false },
  { key: 'address2', type: 'string', readonly: false },
  { key: 'city', type: 'string', readonly: false },
  { key: 'state', type: 'string', readonly: false },
  { key: 'zip', type: 'string', readonly: false },
  { key: 'country', type: 'string', readonly: false },
  { key: 'mailShower1Invite', type: 'boolean', readonly: false },
  { key: 'mailShower2Invite', type: 'boolean', readonly: false },
  { key: 'mailWeddingInvite', type: 'boolean', readonly: false },
  { key: 'presentIds', type: 'numbers', readonly: false },
  { key: 'mailThankyou', type: 'boolean', readonly: false },
  { key: 'lastUpdated', type: 'date', readonly: false },
  { key: 'primaryPerson', type: 'string', readonly: true },
  { key: 'secondaryPerson', type: 'string', readonly: true },
  { key: 'groupTitle', type: 'string', readonly: true }
];

export const sheetToDB = (data: Array<string[]>, sheet: Sheet = 'Person_db') =>
  data
    .filter((row) => !!row[0])
    .reduce<Object[]>((objs, row, i) => {
      let obj = (sheet === 'Person_db' ? personDbKeys : groupDbKeys).reduce(
        (obj, { key, type }, k) => ({
          ...obj,
          [key]: sheetFunctions[type].fromSheet(row[k])
        }),
        {}
      );
      return [...objs, obj];
    }, []);

export const dbToSheet = (obj: {}, sheet: Sheet = 'Person_db') =>
  (sheet === 'Person_db' ? personDbKeys : groupDbKeys)
    .filter((k) => !k.readonly)
    .map(({ key, type }) =>
      sheetFunctions[type].toSheet(obj[key as keyof typeof obj] ?? '')
    );

export const readData = async (sheet: Sheet = 'Person_db') => {
  const authClient = await auth.getClient();
  const googleSheetsInstance = google.sheets({
    version: 'v4',
    auth: authClient
  });

  // Read data from google sheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId: String(process.env.SPREADSHEET_ID), // spreadsheet id
    range: sheet === 'Person_db' ? personReadRange : groupReadRange //range of cells to read from.
  });

  return sheetToDB(readData.data.values, sheet);
};

export const writeData = async (data: Array<Person | Group>) => {
  if (data.length === 0) return;
  const authClient = await auth.getClient();
  const googleSheetsInstance = google.sheets({
    version: 'v4',
    auth: authClient
  });

  const value = await Promise.all(
    data.map(async (d) => {
      const sheet = isPerson(d) ? 'Person_db' : 'Group_db';
      const sheetValues = dbToSheet(d, sheet);
      const range = (isPerson(d) ? personWriteRange : groupWriteRange).replace(
        /2/g,
        String(d.id)
      );
      // console.log(`Writing ${sheet} id: ${d.id} to ${range}`);
      return await googleSheetsInstance.spreadsheets.values.update({
        auth, //auth object
        spreadsheetId: String(process.env.SPREADSHEET_ID), // spreadsheet id
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [sheetValues]
        }
      });
    })
  )
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

  return value;
};

export const isPerson = (x: any): x is Person =>
  Object.keys(x).some((k) => k === 'code');
export const isGroup = (x: any): x is Group =>
  Object.keys(x).some((k) => k === 'address');

export const slimObjects = <T extends Person | Group, K extends keyof T>(
  objects: T[],
  keys: K[]
): Array<Pick<T, K>> =>
  objects.map<Pick<T, K>>((o) =>
    keys.reduce((obj, k) => ({ ...obj, [k]: o[k] }), {} as Pick<T, K>)
  );
