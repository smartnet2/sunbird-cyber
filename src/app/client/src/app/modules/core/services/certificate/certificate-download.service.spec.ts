import { TestBed, inject } from '@angular/core/testing';

import { CertificateDownloadService } from './certificate-download.service';

describe('CertificateDownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificateDownloadService]
    });
  });

  it('should be created', inject([CertificateDownloadService], (service: CertificateDownloadService) => {
    expect(service).toBeTruthy();
  }));
});
