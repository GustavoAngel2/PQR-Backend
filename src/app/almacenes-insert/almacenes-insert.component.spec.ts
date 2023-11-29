import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenesInsertComponent } from './almacenes-insert.component';

describe('AlmacenesInsertComponent', () => {
  let component: AlmacenesInsertComponent;
  let fixture: ComponentFixture<AlmacenesInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenesInsertComponent]
    });
    fixture = TestBed.createComponent(AlmacenesInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
