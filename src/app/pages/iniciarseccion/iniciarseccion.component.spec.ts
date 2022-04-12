import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarseccionComponent } from './iniciarseccion.component';

describe('IniciarseccionComponent', () => {
  let component: IniciarseccionComponent;
  let fixture: ComponentFixture<IniciarseccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarseccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
