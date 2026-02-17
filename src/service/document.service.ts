import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/shared/page';
import {LeaseDocument} from '../model/document/lease-document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly apiRoot = 'https://api.bailo.ch';
  private readonly basePath = '/document-management';
  private readonly documentsBaseUrl = `${this.apiRoot}${this.basePath}/documents`;

  constructor(private readonly httpClient: HttpClient) {
  }

  findByLease(leaseId: string, page = 0, size = 50): Observable<Page<LeaseDocument>> {
    return this.httpClient.get<Page<LeaseDocument>>(
      `${this.documentsBaseUrl}?leaseId=${encodeURIComponent(leaseId)}&page=${page}&size=${size}`
    );
  }

  getViewUrl(documentId: string): string {
    return `${this.documentsBaseUrl}/${encodeURIComponent(documentId)}/view`;
  }

  getDownloadUrl(documentId: string): string {
    return `${this.documentsBaseUrl}/${encodeURIComponent(documentId)}/download`;
  }

  getLeasePreviewUrl(leaseId: string): string {
    return `${this.apiRoot}${this.basePath}/leases/${encodeURIComponent(leaseId)}/preview`;
  }

  getLeasePreviewBlob(leaseId: string): Observable<Blob> {
    return this.httpClient.get(this.getLeasePreviewUrl(leaseId), {responseType: 'blob'});
  }

  getDocumentViewBlob(documentId: string): Observable<Blob> {
    return this.httpClient.get(this.getViewUrl(documentId), {responseType: 'blob'});
  }

  getDocumentDownloadBlob(documentId: string): Observable<Blob> {
    return this.httpClient.get(this.getDownloadUrl(documentId), {responseType: 'blob'});
  }

  openBlobInNewTab(blob: Blob): void {
    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }

  triggerBlobDownload(blob: Blob, fileName: string): void {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}
