export interface PatientHeaderContext {
  id: number;
  firstName: string;
  lastName: string;
  uhid: number;
  phoneNumber: string;
  age: number;
  gender: string;
  orderNumber: string;
  orderStatus: string;
}

export interface PatientSearch {
  firstName: string;
  lastName: string;
  uhid: number;
  phoneNumber: string;
  orderNumber: string;
  email: string;
}

export interface PatientSearchDto {
  patientId: number;
  firstName: string;
  lastName: string;
  uhid: number;
  gender: string;
  phoneNumber: string;
  orderNumber: string;
  sequenceNumber: string;
  billNumber: string;
  orderDate: Date;
  amountPaid: number;
  dueAmount: number;
  status: string;
}
