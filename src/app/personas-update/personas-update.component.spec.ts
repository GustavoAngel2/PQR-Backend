import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasUpdateComponent } from './personas-update.component';

describe('PersonasUpdateComponent', () => {
  let component: PersonasUpdateComponent;
  let fixture: ComponentFixture<PersonasUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasUpdateComponent]
    });
    fixture = TestBed.createComponent(PersonasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
