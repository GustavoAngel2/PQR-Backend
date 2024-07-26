import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMoviemientoViewComponent } from './detalle-moviemiento-view.component';

describe('DetalleMoviemientoViewComponent', () => {
  let component: DetalleMoviemientoViewComponent;
  let fixture: ComponentFixture<DetalleMoviemientoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleMoviemientoViewComponent]
    });
    fixture = TestBed.createComponent(DetalleMoviemientoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
