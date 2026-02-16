import {Component, Input} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {LeaseDocument} from '../../../../../model/document/lease-document';
import {LucideAngularModule, DownloadIcon, EyeIcon, FileTextIcon} from 'lucide-angular';
import {DocumentService} from '../../../../../service/document.service';

@Component({
  selector: 'app-documents-list',
  imports: [
    DatePipe,
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './documents-list.html'
})
export class DocumentsList {
  @Input()
  documents: LeaseDocument[] = [];
  @Input()
  loadingDocuments = false;

  selectedType: 'ALL' | 'RENT_NOTICE' | 'RENT_RECEIPT' = 'ALL';

  constructor(private readonly documentService: DocumentService) {
  }

  get filteredDocuments(): LeaseDocument[] {
    const scheduleDocuments = this.documents.filter((document) =>
      document.type === 'RENT_NOTICE' || document.type === 'RENT_RECEIPT'
    );
    if (this.selectedType === 'ALL') {
      return scheduleDocuments;
    }
    return scheduleDocuments.filter((document) => document.type === this.selectedType);
  }

  getTypeLabel(type: string | undefined): string {
    if (type === 'LEASE_CONTRACT') return 'Bail';
    if (type === 'RENT_NOTICE') return 'Avis d\'echeance';
    if (type === 'RENT_RECEIPT') return 'Quittance de loyer';
    return 'Document';
  }

  getStatusLabel(status: string | undefined): string {
    if (status === 'READY') return 'Disponible';
    if (status === 'PENDING') return 'Generation en cours';
    if (status === 'FAILED') return 'Echec de generation';
    return 'Disponible';
  }

  openDocument(document: LeaseDocument): void {
    const url = this.documentService.resolveUrl(
      document.viewUrl ?? (document.id ? this.documentService.getViewUrl(document.id) : undefined)
    );
    if (url) {
      window.open(url, '_blank');
    }
  }

  downloadDocument(document: LeaseDocument): void {
    const url = this.documentService.resolveUrl(
      document.downloadUrl ?? (document.id ? this.documentService.getDownloadUrl(document.id) : undefined)
    );
    if (!url) {
      return;
    }
    window.open(url, '_blank');
  }

  protected readonly EyeIcon = EyeIcon;
  protected readonly DownloadIcon = DownloadIcon;
  protected readonly FileTextIcon = FileTextIcon;
}
