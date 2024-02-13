import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerfilInsertComponentComponent } from './detalle-perfil-insert-component.component';

describe('DetallePerfilInsertComponentComponent', () => {
  let component: DetallePerfilInsertComponentComponent;
  let fixture: ComponentFixture<DetallePerfilInsertComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePerfilInsertComponentComponent]
    });
    fixture = TestBed.createComponent(DetallePerfilInsertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
