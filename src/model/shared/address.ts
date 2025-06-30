export interface Address {
  street: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  floor?: number;
  apartmentNumber?: string;
  latitude?: number;
  longitude?: number;
}
