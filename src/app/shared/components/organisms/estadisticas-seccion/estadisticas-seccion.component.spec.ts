import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasSeccionComponent } from './estadisticas-seccion.component';

describe('EstadisticasSeccionComponent', () => {
  let component: EstadisticasSeccionComponent;
  let fixture: ComponentFixture<EstadisticasSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticasSeccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
