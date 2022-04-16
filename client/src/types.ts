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
  paperless: boolean;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
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
  others: string[];
}

export interface InviteGroup
  extends Omit<Group, 'primaryPerson' | 'secondaryPerson' | 'others'> {
  primaryPerson: Person;
  secondaryPerson?: Person;
  others: People;
}
