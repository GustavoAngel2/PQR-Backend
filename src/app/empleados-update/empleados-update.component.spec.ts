import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosUpdateComponent } from './empleados-update.component';

describe('EmpleadosUpdateComponent', () => {
  let component: EmpleadosUpdateComponent;
  let fixture: ComponentFixture<EmpleadosUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadosUpdateComponent]
    });
    fixture = TestBed.createComponent(EmpleadosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
