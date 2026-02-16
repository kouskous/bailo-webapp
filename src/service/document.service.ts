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

  resolveUrl(url: string | undefined): string | undefined {
    if (!url) {
      return undefined;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.apiRoot}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}
