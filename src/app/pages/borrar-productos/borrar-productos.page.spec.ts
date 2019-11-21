import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarProductosPage } from './borrar-productos.page';

describe('BorrarProductosPage', () => {
  let component: BorrarProductosPage;
  let fixture: ComponentFixture<BorrarProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarProductosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
