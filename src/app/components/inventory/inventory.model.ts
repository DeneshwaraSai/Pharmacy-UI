export interface InventoryDetails {
  id?: number | null;
  drugCode: number;
  drugName?: string; // Calculated via @Formula, optional
  batchNumber: string;
  expiryDate: Date;
  stripSize?: number;
  quantity: number;
  hsnCode?: string;
  cgst?: number;
  sgst?: number;
  manufacturerRate: number;
  totalManufacturerRate?: number;
  netAmount?: number;
  invoiceAmount?: number;
  sellingCost: number;
  totalSellingCost?: number;
}

export interface Inventory {
  id: Number;
  supplierCode: string;
  invoiceNumber: string;
  invoiceDate: Date;
  discountPerc?: number;
  discountAmt?: number;
  invoiceAmt?: number;
  notes?: string;
  inventoryNumber: string;
  status: string;
  createdBy: string;
  createdDate: Date;
  inventoryDetails: InventoryDetails[];
}

export const defaultInventoryDetails: InventoryDetails = {
  id: null,
  drugCode: 0,
  drugName: '',
  batchNumber: '',
  expiryDate: new Date(),
  stripSize: 0,
  quantity: 1,
  hsnCode: '',
  cgst: 0,
  sgst: 0,
  manufacturerRate: 1,
  totalManufacturerRate: 0,
  netAmount: 0,
  invoiceAmount: 0,
  sellingCost: 1,
  totalSellingCost: 0,
};
