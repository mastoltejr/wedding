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

  invitePhase: number;
  inviteWedding: boolean;
  attendWedding: boolean;
  rsvpWedding: boolean | null;
  weddingUpdate: Date | null;

  email: string | null;
  phone: string | null;
  phoneAlerts: boolean | null;
  mealConsideration: string | null;
  highchair: boolean | null;
  wheelchair: boolean | null;
  saveTheDate: string | null;
  saveTheDateUpdate: Date | null;

  inviteShower1: boolean | null;
  rsvpShower1: boolean | null;
  shower1Update: Date | null;

  inviteShower2: boolean | null;
  rsvpShower2: boolean | null;
  shower2Update: Date | null;

  inviteRehearsal: boolean | null;
  rsvpRehearsal: boolean | null;
  rehearsalUpdate: Date | null;

  inviteAfterParty: boolean | null;
  rsvpAfterParty: boolean | null;
  afterPartyUpdate: Date | null;

  inviteSunday: boolean | null;
  rsvpSunday: boolean | null;
  sundayUpdate: Date | null;

  lastUpdated: Date | null;
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
    .get<UserData>(import.meta.env.VITE_API_URL + '/userInfo', {
      params: { userCode }
    })
    .then(({ data }) => {
      // console.log('Data Recieved', data);
      user.set({ ...data, doNotSync: true });
      return true;
    });
};

const syncUserToDB = (data: UserStore) => {
  if (!!data.person && !!!data.doNotSync) {
    // console.log('SYNCING TO DB', data);
    axios.post<boolean>(import.meta.env.VITE_API_URL + '/userInfo', {
      ...data
    });
  }
};
user.subscribe(syncUserToDB);
