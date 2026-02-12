import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'paymentFrequency'
})
export class PaymentFrequencyPipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    WEEKLY: 'Hebdomadaire',
    BIWEEKLY: 'Toutes les 2 semaines',
    MONTHLY: 'Mensuel',
    BIMONTHLY: 'Bimestriel',
    QUARTERLY: 'Trimestriel',
    SEMIANNUAL: 'Semestriel',
    YEARLY: 'Annuel'
  };

  transform(value: string | undefined | null): string {
    if (!value) {
      return 'Mensuel';
    }

    return this.translations[value] || value;
  }
}
