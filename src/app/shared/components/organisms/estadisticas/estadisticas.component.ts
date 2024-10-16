import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnChanges {
  @Input() gastosActualizados: {
    principales: { nombre: string; monto: number }[],
    secundarios: { nombre: string; monto: number }[]
  } = { principales: [], secundarios: [] };

  public chartDataBar: any[] = [];

  public chartColumns = [
    { id: 'gasto', label: 'Gasto', type: 'string' },
    { id: 'monto', label: 'Monto', type: 'number' },
  ];

  public chartOptionsBar = {
    hAxis: { title: 'Gasto' },
    vAxis: { 
      title: 'Monto en pesos',
      minValue: 0,
      maxValue: 600000,
      ticks: [0, 100000, 200000, 300000, 400000, 500000, 600000]
    },
    width: 800,
    height: 600,
    colors: ['#808080'],
    tooltip: { isHtml: true, trigger: 'focus' }
  };

  public chartTypeBar: ChartType = ChartType.ColumnChart;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gastosActualizados'] && changes['gastosActualizados'].currentValue) {
      this.actualizarGraficas();
    }
  }

  actualizarGraficas() {
    this.chartDataBar = [['Gasto', 'Monto (en pesos)']];

    this.gastosActualizados.principales.forEach(gasto => {
      this.chartDataBar.push([gasto.nombre, gasto.monto]);
    });

    this.gastosActualizados.secundarios.forEach(gasto => {
      this.chartDataBar.push([gasto.nombre, gasto.monto]);
    });

    this.chartDataBar = [...this.chartDataBar];

    // Forzar la detección de cambios para actualizar la gráfica
    this.cdr.detectChanges();
  }
}
