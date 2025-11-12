export type Patient = {
  id?: number;
  firstName: string;
  lastName?: string;
  uhid: number;
  dateOfBirth: Date;
  gender: string;
  email?: string;
  phoneNumber: string;
};
