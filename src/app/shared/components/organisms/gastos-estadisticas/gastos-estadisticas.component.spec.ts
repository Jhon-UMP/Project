import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosEstadisticasComponent } from './gastos-estadisticas.component';

describe('GastosEstadisticasComponent', () => {
  let component: GastosEstadisticasComponent;
  let fixture: ComponentFixture<GastosEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GastosEstadisticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
