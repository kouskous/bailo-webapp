import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leaseStatus',
})
export class LeaseStatusPipe implements PipeTransform {
  private readonly translations: Record<string, string> = {
    DRAFT: 'Brouillon',
    ACTIVE: 'Actif',
    ARCHIVED: 'Archive',
    TERMINATED: 'Resilie',
    PENDING: 'En attente',
    CANCELED: 'Annule',
  };

  transform(value: string | undefined | null): string {
    if (!value) {
      return 'Brouillon';
    }
    return this.translations[value] || value;
  }
}
