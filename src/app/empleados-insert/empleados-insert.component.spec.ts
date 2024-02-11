import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosInsertComponent } from './empleados-insert.component';

describe('EmpleadosInsertComponent', () => {
  let component: EmpleadosInsertComponent;
  let fixture: ComponentFixture<EmpleadosInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosInsertComponent]
    });
    fixture = TestBed.createComponent(EmpleadosInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
