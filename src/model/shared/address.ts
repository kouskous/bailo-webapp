export interface Address {
  street: string;
  additional: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  building?: string
  floor?: number;
  apartmentNumber?: string;
}
