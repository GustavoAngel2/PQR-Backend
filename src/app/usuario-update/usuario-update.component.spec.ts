import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUpdateComponent } from './usuario-update.component';

describe('UsuarioUpdateComponent', () => {
  let component: UsuarioUpdateComponent;
  let fixture: ComponentFixture<UsuarioUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioUpdateComponent]
    });
    fixture = TestBed.createComponent(UsuarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
