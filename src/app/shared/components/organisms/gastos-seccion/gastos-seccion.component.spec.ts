import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosSeccionComponent } from './gastos-seccion.component';

describe('GastosSeccionComponent', () => {
  let component: GastosSeccionComponent;
  let fixture: ComponentFixture<GastosSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GastosSeccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
