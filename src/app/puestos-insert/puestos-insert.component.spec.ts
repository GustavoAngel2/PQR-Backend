import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosInsertComponent } from './puestos-insert.component';

describe('PuestosInsertComponent', () => {
  let component: PuestosInsertComponent;
  let fixture: ComponentFixture<PuestosInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuestosInsertComponent]
    });
    fixture = TestBed.createComponent(PuestosInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
