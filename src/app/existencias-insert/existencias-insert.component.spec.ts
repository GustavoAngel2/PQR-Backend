import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenciasInsertComponent } from './existencias-insert.component';

describe('ExistenciasInsertComponent', () => {
  let component: ExistenciasInsertComponent;
  let fixture: ComponentFixture<ExistenciasInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistenciasInsertComponent]
    });
    fixture = TestBed.createComponent(ExistenciasInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
