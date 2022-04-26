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
  paperInvite: boolean;
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

const personRange = 'Person_db!A2:AF';
const personDbKeys: Key[] = [
  { key: 'id', type: 'number' },
  { key: 'code', type: 'string' },
  { key: 'groupCode', type: 'string' },
  { key: 'title', type: 'string' },
  { key: 'firstName', type: 'string' },
  { key: 'lastName', type: 'string' },
  { key: 'suffix', type: 'string' },
  { key: 'family', type: 'string' },
  { key: 'comment', type: 'string' },
  { key: 'groupLabel', type: 'string' },

  { key: 'inviteWedding', type: 'boolean' },
  { key: 'attendWedding', type: 'boolean' },
  { key: 'rsvpWedding', type: 'boolean' },

  { key: 'email', type: 'string' },
  { key: 'phone', type: 'string' },
  { key: 'phoneAlerts', type: 'boolean' },
  { key: 'mealConsideration', type: 'string' },
  { key: 'highchair', type: 'boolean' },
  { key: 'wheelchair', type: 'boolean' },
  { key: 'saveTheDate', type: 'string' },

  { key: 'inviteShower1', type: 'boolean' },
  { key: 'rsvpShower1', type: 'boolean' },

  { key: 'inviteShower2', type: 'boolean' },
  { key: 'rsvpShower2', type: 'boolean' },

  { key: 'inviteRehearsal', type: 'boolean' },
  { key: 'rsvpRehearsal', type: 'boolean' },

  { key: 'inviteAfterParty', type: 'boolean' },
  { key: 'rsvpAfterParty', type: 'boolean' },

  { key: 'inviteSunday', type: 'boolean' },
  { key: 'rsvpSunday', type: 'boolean' },

  { key: 'lastUpdated', type: 'date' },
  { key: 'fullName', type: 'string' }
];

const groupRange = 'Group_db!A2:S';
const groupDbKeys: Key[] = [
  { key: 'id', type: 'number' },
  { key: 'groupCode', type: 'string' },
  { key: 'family', type: 'string' },
  { key: 'paperInvite', type: 'boolean' },
  { key: 'address', type: 'string' },
  { key: 'address2', type: 'string' },
  { key: 'city', type: 'string' },
  { key: 'state', type: 'string' },
  { key: 'zip', type: 'string' },
  { key: 'country', type: 'string' },
  { key: 'mailShower1Invite', type: 'boolean' },
  { key: 'mailShower2Invite', type: 'boolean' },
  { key: 'mailWeddingInvite', type: 'boolean' },
  { key: 'presentIds', type: 'numbers' },
  { key: 'mailThankyou', type: 'boolean' },
  { key: 'lastUpdated', type: 'date' },
  { key: 'primaryPerson', type: 'string' },
  { key: 'secondaryPerson', type: 'string' },
  { key: 'groupTitle', type: 'string' }
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

export const dbToSheet = (data: Array<{}>, sheet: Sheet = 'Person_db') =>
  data.reduce<Array<string[]>>((rows, obj) => {
    let row = (sheet === 'Person_db' ? personDbKeys : groupDbKeys).map(
      ({ key, type }) =>
        sheetFunctions[type].toSheet(obj[key as keyof typeof obj] ?? '')
    );
    return [...rows, row];
  }, []);

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
    range: sheet === 'Person_db' ? personRange : groupRange //range of cells to read from.
  });

  return sheetToDB(readData.data.values, sheet);
};

export const slimObjects = <T extends Person | Group, K extends keyof T>(
  objects: T[],
  keys: K[]
): Array<Pick<T, K>> =>
  objects.map<Pick<T, K>>((o) =>
    keys.reduce((obj, k) => ({ ...obj, [k]: o[k] }), {} as Pick<T, K>)
  );
