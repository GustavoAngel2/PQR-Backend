import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenesUpdateComponent } from './almacenes-update.component';

describe('AlmacenesUpdateComponent', () => {
  let component: AlmacenesUpdateComponent;
  let fixture: ComponentFixture<AlmacenesUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenesUpdateComponent]
    });
    fixture = TestBed.createComponent(AlmacenesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
