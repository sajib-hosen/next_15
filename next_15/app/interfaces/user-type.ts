export interface LocationTy {
  lat: string;
  lng: string;
}

export interface AddressTy {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: LocationTy;
}

export interface CompanyTy {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressTy;
  phone: string;
  website: string;
  company: CompanyTy;
}
