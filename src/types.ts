export interface AddressDetails {
  division: string;
  region: string;
  district: string;
  upozila: string;
  unionOrWard?: string;
  mouzaMoholla?: string;
  villageOrRoad?: string;
  homeOrHoldingNo?: string;
  postOffice?: string;
  postalCode?: string;
  addressLine: string;
}

export interface NidData {
  name: string;
  nameEn: string;
  father: string;
  mother: string;
  spouse?: string;
  nationalId: string;
  pin: string;
  formNo?: string;
  voterArea: string;
  dateOfBirth: string;
  age?: string;
  birthDay?: string;
  gender: string;
  occupation?: string;
  birthPlace: string;
  Nationality?: string;
  religion: string;
  photo?: string;
  presentAddress: AddressDetails;
  permanentAddress: AddressDetails;
}

export interface ApiResponseFormat {
  api?: string;
  http_status?: number;
  success?: boolean;
  credits_charged?: number;
  balance_left?: number;
  response?: {
    "Api Owner"?: string;
    code?: number;
    success?: boolean;
    message?: string;
    data?: Partial<NidData>;
  };
  data?: Partial<NidData>;
}
