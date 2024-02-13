import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModuloInsertComponent } from './categoria-modulo-insert.component';

describe('CategoriaModuloInsertComponent', () => {
  let component: CategoriaModuloInsertComponent;
  let fixture: ComponentFixture<CategoriaModuloInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaModuloInsertComponent]
    });
    fixture = TestBed.createComponent(CategoriaModuloInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
