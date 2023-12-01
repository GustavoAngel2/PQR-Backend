import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMovimientoUpdateComponent } from './detalle-movimiento-update.component';

describe('DetalleMovimientoUpdateComponent', () => {
  let component: DetalleMovimientoUpdateComponent;
  let fixture: ComponentFixture<DetalleMovimientoUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMovimientoUpdateComponent]
    });
    fixture = TestBed.createComponent(DetalleMovimientoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
