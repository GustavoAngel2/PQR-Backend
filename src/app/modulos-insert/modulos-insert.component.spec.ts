import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosInsertComponent } from './modulos-insert.component';

describe('ModulosInsertComponent', () => {
  let component: ModulosInsertComponent;
  let fixture: ComponentFixture<ModulosInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulosInsertComponent]
    });
    fixture = TestBed.createComponent(ModulosInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
