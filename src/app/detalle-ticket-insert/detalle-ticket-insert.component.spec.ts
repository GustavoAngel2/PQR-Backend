import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTicketInsertComponent } from './detalle-ticket-insert.component';

describe('DetalleTicketInsertComponent', () => {
  let component: DetalleTicketInsertComponent;
  let fixture: ComponentFixture<DetalleTicketInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleTicketInsertComponent]
    });
    fixture = TestBed.createComponent(DetalleTicketInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
