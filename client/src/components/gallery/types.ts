export interface StrapiGallery {
  data: StrapiGalleryItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiGalleryItem {
  id: number;
  attributes: {
    date: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    class: 'none' | 'tall' | 'big' | 'wide';
    sortOrder: number;
    image: {
      data: {
        id: number;
        attributes: ImageData;
      };
    };
  };
}

export interface ImageData {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    large: ImageFormats;
    medium: ImageFormats;
    small: ImageFormats;
    thumbnail: ImageFormats;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}
