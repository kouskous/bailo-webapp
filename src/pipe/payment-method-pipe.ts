import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'paymentMethodLabel'
})
export class PaymentMethodPipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    BANK_TRANSFER: 'Virement bancaire',
    DIRECT_DEBIT: 'Prelevement automatique',
    CREDIT_CARD: 'Carte bancaire',
    CASH: 'Especes',
    CHECK: 'Cheque',
    OTHER: 'Autre'
  };

  transform(value: string | undefined | null): string {
    if (!value) {
      return 'Non renseigne';
    }
    return this.translations[value] || value;
  }
}
