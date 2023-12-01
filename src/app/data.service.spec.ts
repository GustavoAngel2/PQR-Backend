import { TestBed } from '@angular/core/testing';
import { DetalleMovService, TicketsSevice, UsuarioSevice } from './data.service';
import { AlmacenesService } from './data.service';

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
  let service: DetalleMovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleMovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DataService', () => {
  let service: TicketsSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('DataService', () => {
  let service: UsuarioSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
