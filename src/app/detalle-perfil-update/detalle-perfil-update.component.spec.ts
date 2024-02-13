import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerfilUpdateComponent } from './detalle-perfil-update.component';

describe('DetallePerfilUpdateComponent', () => {
  let component: DetallePerfilUpdateComponent;
  let fixture: ComponentFixture<DetallePerfilUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePerfilUpdateComponent]
    });
    fixture = TestBed.createComponent(DetallePerfilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
