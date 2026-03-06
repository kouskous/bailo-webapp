import {Address} from '../shared/address';
import {Contractor} from '../lease/contractor';

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

export interface Property {
  accountId?: string;
  id?: string;
  publicId?: string;
  name?: string;
  landlords?: Contractor[];
  type?: string;
  address?: Address;
  yearOfConstruction?: number;
  yearOfRenovation?: number;
  energyLabel?: string;
  features?: PropertyFeature;
  description?: string;
  livingArea?: number;
  totalArea?: number;
  landArea?: number;
  balconyArea?: number;
  terraceArea?: number;
  gardenArea?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  heatingType?: string;
  heatingDistribution?: string;
  createdAt?: string;
  updatedAt?: string;
}
