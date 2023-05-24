import { GeoPoint } from '~/types/storeLocator';

export type FriendList = {
  friends: Friends[];
};

export type Friends = {
  name: string;
  tel: string;
  address: string;
  favFood?: string[];
  geoLocation?: GeoPoint;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  email?: string;
};
