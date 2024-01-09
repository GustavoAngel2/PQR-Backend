import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasInsertComponent } from './personas-insert.component';

describe('PersonasInsertComponent', () => {
  let component: PersonasInsertComponent;
  let fixture: ComponentFixture<PersonasInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasInsertComponent]
    });
    fixture = TestBed.createComponent(PersonasInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
