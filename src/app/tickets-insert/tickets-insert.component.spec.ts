import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsInsertComponent } from './tickets-insert.component';

describe('TicketsInsertComponent', () => {
  let component: TicketsInsertComponent;
  let fixture: ComponentFixture<TicketsInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsInsertComponent]
    });
    fixture = TestBed.createComponent(TicketsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
