import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsUpdateComponent } from './tickets-update.component';

describe('TicketsUpdateComponent', () => {
  let component: TicketsUpdateComponent;
  let fixture: ComponentFixture<TicketsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsUpdateComponent]
    });
    fixture = TestBed.createComponent(TicketsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
