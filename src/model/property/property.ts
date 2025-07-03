import {Address} from '../shared/address';

export interface PropertySurface {
  livingArea: number;
  totalArea?: number;
  landArea?: number;
  balconyArea?: number;
  terraceArea?: number;
  gardenArea?: number;
}

export interface RoomDetails {
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
}

export interface Heating {
  type: 'ELECTRIC' | 'GAS' | 'FUEL' | 'HEAT_PUMP' | 'DISTRICT' | 'WOOD' | 'SOLAR' | 'OTHER';
  distribution: 'RADIATOR' | 'UNDERFLOOR' | 'AIR' | 'OTHER';
}

export interface PropertyFeature {
  elevator?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  garden?: boolean;
  cellar?: boolean;
  garage?: boolean;
  parking?: boolean;
  attic?: boolean;
  accessible?: boolean;
  intercom?: boolean;
  swimmingPool?: boolean;
  fireplace?: boolean;
}

export interface Landlord {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: Address;
}

export interface Property {
  id: string
  name: string;
  type: 'APARTMENT' | 'HOUSE' | 'STUDIO' | 'DUPLEX' | 'VILLA' | 'ROOM' | 'COMMERCIAL' | 'LAND' | 'OTHER';
  landlords: Landlord[];
  address: Address;
  surface: PropertySurface;
  roomDetails: RoomDetails;
  yearOfConstruction?: number;
  yearOfRenovation?: number;
  heating?: Heating;
  energyLabel?: string; // DPE par ex. : A, B, C, ...
  features?: PropertyFeature;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
