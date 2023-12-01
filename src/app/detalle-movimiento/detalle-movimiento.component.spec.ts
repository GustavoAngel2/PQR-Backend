import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMovimientoComponent } from './detalle-movimiento.component';

describe('DetalleMovimientoComponent', () => {
  let component: DetalleMovimientoComponent;
  let fixture: ComponentFixture<DetalleMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMovimientoComponent]
    });
    fixture = TestBed.createComponent(DetalleMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
