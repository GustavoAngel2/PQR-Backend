import { TestBed } from "@angular/core/testing";

import { AlmacenesService, DetalleMovService,EmpleadosService, PersonasService, PuestosService, RutasService, TicketsSevice, UsuarioSevice, CategoriaModuloService, RolesService } from './data.service';
import { ClientesService } from './data.service';
import { ArticulosService } from './data.service';
import { ExistenciasService } from './data.service';
import { movInventarioService } from './data.service';
import { DetalleTicketService } from './data.service';
import { ModulosService } from './data.service';



describe("DataService", () => {
  let service: AlmacenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: ClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: ArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: PersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: RutasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutasService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------describe('DataService', () => {
describe("DataService", () => {
  let service: DetalleMovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleMovService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: TicketsSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsSevice);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: UsuarioSevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSevice);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: ExistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistenciasService);
  });
  //-------------------------------------------------------------------------------------------------------------
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
/* ------------------------------------------------------------------------------------------------------------------------- */
describe('DataService', () => {
  let service: ModulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: movInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(movInventarioService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//-------------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: DetalleTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleTicketService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//---------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: EmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//--------------------------------------------------------------------------------------------------------
describe("DataService", () => {
  let service: PuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestosService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
  //-------------------------------------------------------------------------------------------------------------
  describe('DataService', () => {
    let service: CategoriaModuloService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(CategoriaModuloService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
  //-------------------------------------------------------------------------------------------------------------
  describe('DataService', () => {
    let service: RolesService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(RolesService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
})
