import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModUsuarioInsertComponent } from './mod-usuario-insert.component';

describe('ModUsuarioInsertComponent', () => {
  let component: ModUsuarioInsertComponent;
  let fixture: ComponentFixture<ModUsuarioInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModUsuarioInsertComponent]
    });
    fixture = TestBed.createComponent(ModUsuarioInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
