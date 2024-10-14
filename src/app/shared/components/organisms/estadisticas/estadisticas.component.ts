import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnChanges {
  @Input() gastosActualizados: {
    principales: { nombre: string; monto: number }[],
    secundarios: { nombre: string; monto: number }[]
  } = { principales: [], secundarios: [] };

  public chartDataPie: any[] = [];
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

  constructor() {}

  ngOnInit(): void {
    this.inicializarGraficas(); // Inicializa las gráficas al cargar el componente
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Asegurarse de que el cambio de gastosActualizados se haya realizado
    if (changes['gastosActualizados'] && changes['gastosActualizados'].currentValue) {
      this.actualizarGraficas();
    }
  }

  inicializarGraficas() {
    // Inicializa las gráficas con valores predeterminados
    this.chartDataBar = [['Gasto', 'Monto (en pesos)']];
  }

  actualizarGraficas() {
    // Limpiar los datos de las gráficas existentes
    this.inicializarGraficas();

    // Agregar gastos secundarios a la gráfica de barra
    if (this.gastosActualizados.secundarios.length > 0) {
      this.gastosActualizados.secundarios.forEach(gasto => {
        this.chartDataBar.push([gasto.nombre, gasto.monto]);
      });
    }

    // Agregar gastos principales a la gráfica de barra
    if (this.gastosActualizados.principales.length > 0) {
      this.gastosActualizados.principales.forEach(gasto => {
        this.chartDataBar.push([gasto.nombre, gasto.monto]);
      });
    }

    console.log('Datos de la gráfica actualizados:', this.chartDataBar);
  }
}
