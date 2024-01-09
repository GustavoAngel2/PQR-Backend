import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasInsertComponent } from './rutas-insert.component';

describe('RutasInsertComponent', () => {
  let component: RutasInsertComponent;
  let fixture: ComponentFixture<RutasInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RutasInsertComponent]
    });
    fixture = TestBed.createComponent(RutasInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
