import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModuloUpdateComponent } from './categoria-modulo-update.component';

describe('CategoriaModuloUpdateComponent', () => {
  let component: CategoriaModuloUpdateComponent;
  let fixture: ComponentFixture<CategoriaModuloUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaModuloUpdateComponent]
    });
    fixture = TestBed.createComponent(CategoriaModuloUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
