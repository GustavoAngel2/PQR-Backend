import { TestBed } from '@angular/core/testing';

import { AlmacenesService } from './data.service';
import { ExistenciasService } from './data.service';
import { movInventarioService } from './data.service';
import { DetalleTicketService } from './data.service';

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
  let service: ExistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DataService', () => {
  let service: movInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(movInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DataService', () => {
  let service: DetalleTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});