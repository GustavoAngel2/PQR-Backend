import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovInventarioInsertComponent } from './mov-inventario-insert.component';

describe('MovInventarioInsertComponent', () => {
  let component: MovInventarioInsertComponent;
  let fixture: ComponentFixture<MovInventarioInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovInventarioInsertComponent]
    });
    fixture = TestBed.createComponent(MovInventarioInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
