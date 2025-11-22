export type Patient = {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  uhid: number;
  dateOfBirth: Date;
  gender: string;
  email?: string;
  phoneNumber: string;
  bloodType?: string;
  address: Address;
};

export type Address = {
  id?: number;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
};
