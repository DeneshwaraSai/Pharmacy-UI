export interface OrderInfo {
  orderNumber: string;
  uhid: number;
  sequenceNumber: string;
  billNumber: string;
  transactionId: string;
  orderDate: Date;
  lastModifiedDate: Date;
  createdBy: string;
  lastModifiedBy?: string;
  amountPaid: number;
  dueAmount?: number;
  status: string;
  orderDetails: OrderDetails[];
}

export interface OrderDetails {
  id?: number;
  supplierCode: string;
  batchNumber: string;
  drugId: string;
  expiryDate: Date;
  drugName?: string; // Transient field
  hsnCode?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount?: number;
  discountPerc?: number;
  billReceivableDetailsId?: string;
  sgst?: number;
  cgst?: number;
}

export interface CashReceipt {
  transactionId: string;
  billNumber: string;
  amountPaid: number;
  paymentType?: string;
  bankName?: string;
  receiptType: string;
  notes?: string;
  receivedDate?: Date;
  receivedBy?: string;
}


export interface OrderLineItem {
  drugName: string;
  supplierName: string;
  batchNumber: string;
  expiryDate: string | Date;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  discountPerc: number;
  discountAmount: number;
  netAmount: number;
}
