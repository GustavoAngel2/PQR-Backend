import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModuloComponent } from './categoria-modulo.component';

describe('CategoriaModuloComponent', () => {
  let component: CategoriaModuloComponent;
  let fixture: ComponentFixture<CategoriaModuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaModuloComponent]
    });
    fixture = TestBed.createComponent(CategoriaModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
