import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesInsertComponent } from './clientes-insert.component';

describe('ClientesInsertComponent', () => {
  let component: ClientesInsertComponent;
  let fixture: ComponentFixture<ClientesInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesInsertComponent]
    });
    fixture = TestBed.createComponent(ClientesInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
