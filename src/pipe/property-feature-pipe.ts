import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyFeature'
})
export class PropertyFeaturePipe implements PipeTransform {

  private readonly translations: { [key: string]: string } = {
    elevator: 'Ascenseur',
    balcony: 'Balcon',
    terrace: 'Terrasse',
    garden: 'Jardin',
    cellar: 'Cave',
    garage: 'Garage',
    parking: 'Parking',
    attic: 'Grenier',
    accessible: 'Accès PMR',
    intercom: 'Interphone',
    swimmingPool: 'Piscine',
    fireplace: 'Cheminée'
  };

  transform(key: string | undefined): string {
    if (!key) return '';
    return this.translations[key] || key;
  }

}
