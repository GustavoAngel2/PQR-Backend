import { TestBed } from '@angular/core/testing';

import { AlmacenesService, DetalleMovService, PersonasService, RutasService, TicketsSevice, UsuarioSevice } from './data.service';
import { ClientesService } from './data.service';
import { ArticulosService } from './data.service';

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
//-------------------------------------------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------------------
describe('DataService', () => {
  let service: ArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe('DataService', () => {
  let service: PersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe('DataService', () => {
  let service: RutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------describe('DataService', () => {
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