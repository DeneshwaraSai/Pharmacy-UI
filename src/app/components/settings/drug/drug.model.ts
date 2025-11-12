export interface DrugSetup {
  id: number;
  name: string;
  type: string;
  unitsPerPack: number;
  hsnCode: string;
  cgst: number;
  igst: number;
  sgst: number;
  status: string;
  composition: string;
  genericName: string;
}

export type TaxCategory = {
  code: string;
  cgst: number;
  igst: number;
  sgst: number;
};
