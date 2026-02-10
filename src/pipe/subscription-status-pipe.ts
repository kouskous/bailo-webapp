import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'subscriptionStatus'
})
export class SubscriptionStatusPipe implements PipeTransform {

  private readonly translations: { [key: string]: string } = {
    ACTIVE: 'Actif',
    PAST_DUE: 'Paiement en retard',
    CANCELED: 'Annule',
    INCOMPLETE: 'Incomplet',
    INCOMPLETE_EXPIRED: 'Incomplet expire',
    TRIALING: 'Periode d essai',
    UNPAID: 'Impaye',
    PAUSED: 'Suspendu',
    UNKNOWN: 'Inconnu'
  };

  transform(value: string | undefined): string {
    if (!value) return '';
    return this.translations[value] || value;
  }
}
