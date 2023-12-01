import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenciasUpdateComponent } from './existencias-update.component';

describe('ExistenciasUpdateComponent', () => {
  let component: ExistenciasUpdateComponent;
  let fixture: ComponentFixture<ExistenciasUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExistenciasUpdateComponent]
    });
    fixture = TestBed.createComponent(ExistenciasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
