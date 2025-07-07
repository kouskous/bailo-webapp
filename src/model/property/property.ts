import {Address} from '../shared/address';

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
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: Address;
}

export interface Property {
  id: string
  name: string;
  type: 'APARTMENT' | 'HOUSE' | 'STUDIO' | 'DUPLEX' | 'VILLA' | 'ROOM' | 'COMMERCIAL' | 'LAND' | 'OTHER';
  addressId?: string;
  address: Address;
  yearOfConstruction?: number;
  yearOfRenovation?: string;
  energyLabel?: string; // DPE par ex. : A, B, C, ...
  features?: PropertyFeature;
  description?: string;

  //surfaces
  livingArea: string;
  totalArea?: string;
  landArea?: string;
  balconyArea?: string;
  terraceArea?: string;
  gardenArea?: string;

  //room details
  rooms: string;
  bedrooms: string;
  bathrooms: string;
  toilets: string;

  // heating
  heatingType: 'ELECTRIC' | 'GAS' | 'FUEL' | 'HEAT_PUMP' | 'DISTRICT' | 'WOOD' | 'SOLAR' | 'OTHER';
  heatingDistribution: 'RADIATOR' | 'UNDERFLOOR' | 'AIR' | 'OTHER';

  landlords: Landlord[];

  // timestamps
  createdAt: Date;
  updatedAt: Date;
}
