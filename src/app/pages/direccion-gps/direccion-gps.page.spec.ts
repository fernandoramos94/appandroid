import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionGpsPage } from './direccion-gps.page';

describe('DireccionGpsPage', () => {
  let component: DireccionGpsPage;
  let fixture: ComponentFixture<DireccionGpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionGpsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionGpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
