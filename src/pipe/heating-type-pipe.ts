import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heatingType'
})
export class HeatingTypePipe implements PipeTransform {

  private readonly translations: { [key: string]: string } = {
    ELECTRIC: 'Électrique',
    GAS: 'Gaz',
    FUEL: 'Fioul',
    HEAT_PUMP: 'Pompe à chaleur',
    DISTRICT: 'Chauffage urbain',
    WOOD: 'Bois',
    SOLAR: 'Solaire',
    OTHER: 'Autre'
  };

  transform(value: string | undefined): string {
    if (!value) return '';
    return this.translations[value] || value;
  }

}
