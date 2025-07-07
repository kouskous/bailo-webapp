import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyType'
})
export class PropertyTypePipe implements PipeTransform {

  private readonly translations: { [key: string]: string } = {
    APARTMENT: 'Appartement',
    HOUSE: 'Maison',
    STUDIO: 'Studio',
    DUPLEX: 'Duplex',
    VILLA: 'Villa',
    ROOM: 'Chambre',
    COMMERCIAL: 'Local commercial',
    LAND: 'Terrain',
    OTHER: 'Autre'
  };

  transform(value: string | undefined): string {
    if (!value) return '';
    return this.translations[value] || value;
  }
}
