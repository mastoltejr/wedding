import axios from 'axios';
import type { Person } from './types';

export type NameQuery = Array<Pick<Person, 'code' | 'fullName'>>;
export const getNames = async (partialName: string): Promise<NameQuery> => {
  return await axios
    .get(import.meta.env.VITE_SERVER_URL + '/names', {
      params: { partialName }
    })
    .then(({ data }) => data);
};

export const getUserData = async (userCode: string): Promise<any> => {
  return true;
};
