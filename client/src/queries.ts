import axios, { AxiosResponse } from 'axios';
import type { Person } from './stores/user';

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
    .get(import.meta.env.VITE_API_URL + '/names', {
      params: { partialName }
    })
    .then(({ data }) => data);
};

export type Guest = Pick<Person, 'code' | 'fullName'>;
export type GuestList = Guest[];
export const getGuestList = async (): Promise<GuestList> => {
  return await axios
    .get(import.meta.env.VITE_API_URL + '/guestList')
    .then(({ data }) => data)
    .catch(() => []);
};

export const escapeRegExp = (value: string) =>
  value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export const sendEmail = (
  data: any,
  emailType: 'saveTheDate' | 'rsvp' | 'registry' | 'finalCountdown'
) => {
  // console.log('sendEmail', data, emailType);
  axios.post(import.meta.env.VITE_API_URL + '/sendEmail', {
    ...data,
    emailType
  });
};

interface CMSParagraph {
  data: {
    id: number;
    attributes: {
      paragraph: string;
      createdAt: string;
      updatedAt: string;
      locale: 'en' | 'mx';
      description: string;
    };
  };
  meta: {};
}

export const getParagraph = async (
  id: number,
  local: CMSParagraph['data']['attributes']['locale'] = 'en'
) => {
  const text = axios
    .get<CMSParagraph>(
      import.meta.env.VITE_CMS_URL + '/api/wedding-paragraphs/1',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CMS_JWT}`
        }
      }
    )
    .then(({ data }) => data.data.attributes.paragraph)
    .catch(() => 'Could not load...');
  return text;
};
