// These are all the types I use in the project
// TODO: I will probably move this to a shared folder if I also add the React Native folder to this project.

type StorageInfo = {
  id?: number;
  productInfoId: number;
  locationId: number;
  quantity: number;
  expiration_date?: string;
};

type StorageItem = {
  id: number;
  product: ProductInfo;
  location: LocationInfo;
  quantity: number;
  expirationDate: string;
};

type ProductInfo = {
  id?: number;
  name: string;
  content: number;
  brand?: string;
  unitType?: string;
  category?: string;
  imgUrl?: string;
};

type Location = {
  id: number;
  name: string;
};

type LocationInfo = {
  id: number;
  name: string;
  parentName?: string;
};

export type { StorageInfo, StorageItem, ProductInfo, Location };
