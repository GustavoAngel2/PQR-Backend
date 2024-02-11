import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModUsuarioUpdateComponent } from './mod-usuario-update.component';

describe('ModUsuarioUpdateComponent', () => {
  let component: ModUsuarioUpdateComponent;
  let fixture: ComponentFixture<ModUsuarioUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModUsuarioUpdateComponent]
    });
    fixture = TestBed.createComponent(ModUsuarioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
