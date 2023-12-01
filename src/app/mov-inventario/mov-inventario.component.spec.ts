import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovInventarioComponent } from './mov-inventario.component';

describe('MovInventarioComponent', () => {
  let component: MovInventarioComponent;
  let fixture: ComponentFixture<MovInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovInventarioComponent]
    });
    fixture = TestBed.createComponent(MovInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
