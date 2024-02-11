import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestosUpdateComponent } from './puestos-update.component';

describe('PuestosUpdateComponent', () => {
  let component: PuestosUpdateComponent;
  let fixture: ComponentFixture<PuestosUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuestosUpdateComponent]
    });
    fixture = TestBed.createComponent(PuestosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
