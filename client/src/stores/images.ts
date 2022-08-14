import { writable } from 'svelte/store';
import type {
  StrapiGallery,
  ImageData,
  StrapiGalleryItem
} from '../components/gallery/types';
import axios from 'axios';

export type IData = ImageData['formats'] & {
  full: ImageData['url'];
  name: string;
  height: number;
  width: number;
  index: number;
} & Pick<
    StrapiGalleryItem['attributes'],
    'sortOrder' | 'class' | 'description' | 'date'
  >;

export const imageGallery = writable<{
  images: IData[];
  index: number | null;
  status: 'loading' | 'loaded' | 'error';
}>({
  status: 'loading',
  index: null,
  images: []
});

export const loadImages = (): void => {
  axios
    .get<StrapiGallery>(
      import.meta.env.VITE_CMS_URL +
        '/api/wedding-galleries?populate=*&sort=sortOrder&pagination[page]=1&pagination[pageSize]=100',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CMS_JWT}`
        }
      }
    )
    .then(({ data }) => {
      imageGallery.set({
        status: 'loaded',
        index: null,
        images: data.data.map<IData>((item, i) => {
          return {
            index: i,
            height: item.attributes.image.data.attributes.height,
            width: item.attributes.image.data.attributes.width,
            sortOrder: item.attributes.sortOrder,
            date: item.attributes.date,
            description: item.attributes.description,
            class: item.attributes.class,
            name: item.attributes.image.data.attributes.name,
            full: item.attributes.image.data.attributes.url,
            ...item.attributes.image.data.attributes.formats
          };
        })
      });
    })
    .catch((err) => {
      imageGallery.set({ status: 'error', index: null, images: [] });
    });
};
