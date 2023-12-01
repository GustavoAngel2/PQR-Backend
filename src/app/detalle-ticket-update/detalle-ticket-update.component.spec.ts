import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTicketUpdateComponent } from './detalle-ticket-update.component';

describe('DetalleTicketUpdateComponent', () => {
  let component: DetalleTicketUpdateComponent;
  let fixture: ComponentFixture<DetalleTicketUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleTicketUpdateComponent]
    });
    fixture = TestBed.createComponent(DetalleTicketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
