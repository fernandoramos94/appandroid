import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPedidosPage } from './mis-pedidos.page';

describe('MisPedidosPage', () => {
  let component: MisPedidosPage;
  let fixture: ComponentFixture<MisPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPedidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
