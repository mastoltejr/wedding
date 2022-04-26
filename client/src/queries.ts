import axios from 'axios';
import type { UserData, Person } from './stores/user';

export const slimObject = <T extends Object, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> =>
  keys.reduce((obj, k) => ({ ...obj, [k]: object[k] }), {} as Pick<T, K>);

export const slimObjects = <T extends Object, K extends keyof T>(
  objects: T[],
  keys: K[]
): Array<Pick<T, K>> => objects.map<Pick<T, K>>((o) => slimObject(o, keys));

export type NameQuery = Array<Pick<Person, 'code' | 'fullName'>>;
export const getNames = async (partialName: string): Promise<NameQuery> => {
  return await axios
    .get('http://localhost:5001' + '/names', {
      params: { partialName }
    })
    .then(({ data }) => data);
};

export type Guest = Pick<Person, 'code' | 'fullName'>;
export type GuestList = Guest[];
export const getGuestList = async (): Promise<GuestList> => {
  return await axios
    .get('http://localhost:5001' + '/guestList')
    .then(({ data }) => data)
    .catch(() => []);
};

export const getUserData = async (userCode: string): Promise<UserData> => {
  return await axios
    .get<UserData>('http://localhost:5001' + '/userInfo', {
      params: { userCode }
    })
    .then(({ data }) => data);
};

export const escapeRegExp = (value: string) =>
  value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
