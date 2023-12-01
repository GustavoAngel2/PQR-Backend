import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovInventarioUpdateComponent } from './mov-inventario-update.component';

describe('MovInventarioUpdateComponent', () => {
  let component: MovInventarioUpdateComponent;
  let fixture: ComponentFixture<MovInventarioUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovInventarioUpdateComponent]
    });
    fixture = TestBed.createComponent(MovInventarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
