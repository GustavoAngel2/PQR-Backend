import { TestBed } from '@angular/core/testing';

import { AlmacenesService } from './data.service';
import { ClientesService } from './data.service';

describe('DataService', () => {
  let service: AlmacenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



describe('DataService', () => {
  let service: ClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});