import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosInsertComponent } from './usuarios-insert.component';

describe('UsuariosInsertComponent', () => {
  let component: UsuariosInsertComponent;
  let fixture: ComponentFixture<UsuariosInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosInsertComponent]
    });
    fixture = TestBed.createComponent(UsuariosInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
