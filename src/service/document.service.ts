import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../model/shared/page';
import {LeaseDocument} from '../model/document/lease-document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly baseUrl = 'https://api.bailo.ch/document-management/documents';

  constructor(private readonly httpClient: HttpClient) {
  }

  findByLease(leaseId: string, page = 0, size = 50): Observable<Page<LeaseDocument>> {
    return this.httpClient.get<Page<LeaseDocument>>(
      `${this.baseUrl}?leaseId=${encodeURIComponent(leaseId)}&page=${page}&size=${size}`
    );
  }

  getViewUrl(documentId: string): string {
    return `${this.baseUrl}/${encodeURIComponent(documentId)}/view`;
  }

  getDownloadUrl(documentId: string): string {
    return `${this.baseUrl}/${encodeURIComponent(documentId)}/download`;
  }
}
