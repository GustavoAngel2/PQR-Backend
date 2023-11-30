import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosUpdateComponent } from './articulos-update.component';

describe('ArticulosUpdateComponent', () => {
  let component: ArticulosUpdateComponent;
  let fixture: ComponentFixture<ArticulosUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticulosUpdateComponent]
    });
    fixture = TestBed.createComponent(ArticulosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
