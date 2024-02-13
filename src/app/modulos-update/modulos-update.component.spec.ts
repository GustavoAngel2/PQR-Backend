import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosUpdateComponent } from './modulos-update.component';

describe('ModulosUpdateComponent', () => {
  let component: ModulosUpdateComponent;
  let fixture: ComponentFixture<ModulosUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulosUpdateComponent]
    });
    fixture = TestBed.createComponent(ModulosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
