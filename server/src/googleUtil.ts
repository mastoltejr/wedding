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

  invitePhase: number;
  inviteWedding: boolean;
  attendWedding: boolean;
  rsvpWedding: boolean | null;
  weddingUpdated: Date | null;

  email: string | null;
  phone: string | null;
  phoneAlerts: boolean | null;
  mealConsideration: string | null;
  highchair: boolean | null;
  wheelchair: boolean | null;
  saveTheDate: string | null;
  saveTheDateUpdated: Date | null;

  inviteShower1: boolean | null;
  rsvpShower1: boolean | null;
  shower1Updated: Date | null;

  inviteShower2: boolean | null;
  rsvpShower2: boolean | null;
  shower2Updated: Date | null;

  inviteRehearsal: boolean | null;
  rsvpRehearsal: boolean | null;
  rehearsalUpdated: Date | null;

  inviteAfterParty: boolean | null;
  rsvpAfterParty: boolean | null;
  afterPartyUpdated: Date | null;

  inviteSunday: boolean | null;
  rsvpSunday: boolean | null;
  sundayUpdated: Date | null;

  lastUpdated: Date | null;
  fullName: string;
}

export type People = Person[];

export interface Group {
  id: number;
  groupCode: string;
  family: string;
  eInvite: boolean | null;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  mailShower1Invite: boolean | null;
  mailShower2Invite: boolean | null;
  mailWeddingInvite: boolean | null;
  presentIds: number[] | null;
  mailThankyou: boolean | null;
  lastUpdated: Date | null;
  primaryPerson: string | null;
  secondaryPerson: string | null;
  groupTitle: string | null;
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
    fromSheet: (v) => (v === '' ? null : String(v)),
    toSheet: (v: string | null) => (v === null ? '' : v)
  },
  number: {
    fromSheet: (v) => (v === '' ? null : +v),
    toSheet: (v: number | null) => (v === null ? '' : String(v))
  },
  boolean: {
    fromSheet: (v) =>
      v.toLowerCase() === 'yes' ? true : v === '' ? null : false,
    toSheet: (v: boolean | null) => (v === null ? '' : !!v ? 'yes' : 'no')
  },
  date: {
    fromSheet: (a) => (a === '' ? null : parse(a, 'Pp', new Date())),
    toSheet: (a: Date | null) => (a === null ? '' : format(new Date(), 'Pp'))
  },
  numbers: {
    fromSheet: (v) => (v === '' ? [] : v.split(',').map((s) => +s)),
    toSheet: (v: number[]) => (Array.isArray(v) ? v.join(',') : '')
  },
  strings: {
    fromSheet: (v) => (v === '' ? [] : v.split(',')),
    toSheet: (v: string[]) => (Array.isArray(v) ? v.join(',') : '')
  }
};

const personReadRange = 'Person_db!A2:AN';
const personWriteRange = 'Person_db!D2:AM2';
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

  { key: 'invitePhase', type: 'number', readonly: false },
  { key: 'inviteWedding', type: 'boolean', readonly: false },
  { key: 'attendWedding', type: 'boolean', readonly: false },
  { key: 'rsvpWedding', type: 'boolean', readonly: false },
  { key: 'weddingUpdate', type: 'date', readonly: false },

  { key: 'email', type: 'string', readonly: false },
  { key: 'phone', type: 'string', readonly: false },
  { key: 'phoneAlerts', type: 'boolean', readonly: false },
  { key: 'mealConsideration', type: 'string', readonly: false },
  { key: 'highchair', type: 'boolean', readonly: false },
  { key: 'wheelchair', type: 'boolean', readonly: false },
  { key: 'saveTheDate', type: 'string', readonly: false },
  { key: 'saveTheDateUpdate', type: 'date', readonly: false },

  { key: 'inviteShower1', type: 'boolean', readonly: false },
  { key: 'rsvpShower1', type: 'boolean', readonly: false },
  { key: 'shower1Update', type: 'date', readonly: false },

  { key: 'inviteShower2', type: 'boolean', readonly: false },
  { key: 'rsvpShower2', type: 'boolean', readonly: false },
  { key: 'shower2Update', type: 'date', readonly: false },

  { key: 'inviteRehearsal', type: 'boolean', readonly: false },
  { key: 'rsvpRehearsal', type: 'boolean', readonly: false },
  { key: 'rehearsalUpdate', type: 'date', readonly: false },

  { key: 'inviteAfterParty', type: 'boolean', readonly: false },
  { key: 'rsvpAfterParty', type: 'boolean', readonly: false },
  { key: 'afterPartyUpdate', type: 'date', readonly: false },

  { key: 'inviteSunday', type: 'boolean', readonly: false },
  { key: 'rsvpSunday', type: 'boolean', readonly: false },
  { key: 'sundayUpdate', type: 'date', readonly: false },

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
      sheetFunctions[type].toSheet(obj[key as keyof typeof obj])
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
