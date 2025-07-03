export interface Address {
  id?: string;
  street: string;
  additional: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  building?: string
  floor?: string;
}
