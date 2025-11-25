/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotPotatoComponent } from './hot-potato.component';

describe('HotPotatoComponent', () => {
  let component: HotPotatoComponent;
  let fixture: ComponentFixture<HotPotatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotPotatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotPotatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
