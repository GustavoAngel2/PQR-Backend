import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMoviemientoInsertComponent } from './detalle-moviemiento-insert.component';

describe('DetalleMoviemientoInsertComponent', () => {
  let component: DetalleMoviemientoInsertComponent;
  let fixture: ComponentFixture<DetalleMoviemientoInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMoviemientoInsertComponent]
    });
    fixture = TestBed.createComponent(DetalleMoviemientoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
