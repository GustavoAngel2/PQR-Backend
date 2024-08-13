import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteComponent } from './corte.component';

describe('CorteComponent', () => {
  let component: CorteComponent;
  let fixture: ComponentFixture<CorteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorteComponent]
    });
    fixture = TestBed.createComponent(CorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
