/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EncontreObjetoComponent } from './encontreobjeto.component';

describe('EncontreObjetoComponent', () => {
  let component: EncontreObjetoComponent;
  let fixture: ComponentFixture<EncontreObjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncontreObjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncontreObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
