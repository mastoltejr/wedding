import { writable } from 'svelte/store';
import axios from 'axios';

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

export interface UserData {
  person?: Person;
  group?: Group;
  peopleInGroup: Person[];
}

type UserStore = Partial<UserData> & { doNotSync?: boolean };

export const user = writable<UserStore>({
  person: undefined,
  group: undefined,
  peopleInGroup: []
});

export const getUserData = (userCode: string): Promise<boolean> => {
  return axios
    .get<UserData>('http://localhost:5001' + '/userInfo', {
      params: { userCode }
    })
    .then(({ data }) => {
      console.log('Data Recieved', data);
      user.set({ ...data, doNotSync: true });
      return true;
    });
};

const syncUserToDB = (data: UserStore) => {
  if (!!data.person && !!!data.doNotSync) {
    console.log('SYNCING TO DB', data);
    axios.post<boolean>('http://localhost:5001' + '/userInfo', {
      ...data
    });
  }
};
user.subscribe(syncUserToDB);
