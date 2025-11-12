export class MasterData {
  static GENDER_TYPE: SimpleCodeValue[] = [
    { code: 'F', value: 'Female' },
    { code: 'M', value: 'Male' },
    { code: 'O', value: 'Others' },
  ];

  static BLOOD_TYPE: SimpleCodeValue[] = [
    { code: 'A+', value: 'A+' },
    { code: 'A-', value: 'A-' },
    { code: 'B+', value: 'B+' },
    { code: 'B-', value: 'B-' },
    { code: 'AB+', value: 'AB+' },
    { code: 'AB-', value: 'AB-' },
    { code: 'O+', value: 'O+' },
    { code: 'O-', value: 'O-' },
    { code: 'Rh+', value: 'Rh+' },
    { code: 'Rh-', value: 'Rh-' },
  ];

  static DRUG_TYPE: SimpleCodeValue[] = [
    { code: 'TBT', value: 'Tablet' },
    { code: 'SYP', value: 'Syrup(Liquid)' },
    { code: 'CPS', value: 'Capsules' },
    { code: 'DRP', value: 'Drops' },
    { code: 'INH', value: 'Inhalers' },
    { code: 'INJ', value: 'Injections' },
    { code: 'CRE', value: 'Cream' },
    { code: 'GEL', value: 'Gel' },
    { code: 'JEL', value: 'Jelly' },
    { code: 'SPR', value: 'Spray' },
    { code: 'TOO', value: 'Tooth Paste' },
    { code: 'PK', value: 'Pain Killer' },
    { code: 'SUS', value: 'Suspension' },
    { code: 'HD', value: 'Heart Disease' },
    { code: 'BLT', value: 'Belts' },
    { code: 'CTN', value: 'Cotton' },
    { code: 'FLD', value: 'Fluid' },
    { code: 'GUM', value: 'Gum' },
    { code: 'IMP', value: 'Implants' },
    { code: 'IVS', value: 'IV Set' },
    { code: 'MSK', value: 'Mask' },
    { code: 'PAD', value: 'Pads' },
    { code: 'SYR', value: 'Syringes' },
    { code: 'THR', value: 'Thermometer' },
    { code: 'LIQ', value: 'Liquid' },
    { code: 'LOT', value: 'Lotion' },
  ];

  static DRUG_STATUS: SimpleCodeValue[] = [
    { code: 'A', value: 'Active' },
    { code: 'I', value: 'InActive' },
  ];


  static SUPPLIER_STATUS: SimpleCodeValue[] = [
    { code: 'A', value: 'Active' },
    { code: 'I', value: 'InActive' },
  ];
}

export type SimpleCodeValue = {
  code: string;
  value: string;
};
