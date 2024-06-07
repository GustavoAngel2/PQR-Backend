import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerfilInsertComponent } from './detalle-perfil-insert-component.component';

describe('DetallePerfilInsertComponentComponent', () => {
  let component: DetallePerfilInsertComponent;
  let fixture: ComponentFixture<DetallePerfilInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePerfilInsertComponent]
    });
    fixture = TestBed.createComponent(DetallePerfilInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
