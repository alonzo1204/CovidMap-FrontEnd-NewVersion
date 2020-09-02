import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: TokenStorageService = TestBed.get(TokenStorageService);
    expect(service).toBeTruthy();
  });
});
