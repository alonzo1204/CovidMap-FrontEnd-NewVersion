import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataCountryService } from './dataCountry.service';

describe('DataCountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: DataCountryService = TestBed.get(DataCountryService);
    expect(service).toBeTruthy();
  });
});
