import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  // Datos iniciales para los gráficos (gastos principales y secundarios)
  public chartDataPie = [
    ['Gasto', 'Monto (en pesos)'],
    ['Energía', 2000],
    ['Agua', 1500],
    ['Gas', 1000],
    ['Mercado', 5000],
    ['Internet', 2500],
    ['Servicio de Televisión y señal', 3000]
  ];

  public chartDataBar = [
    ['Energía', 2000],
    ['Agua', 52000],
    ['Gas', 45000],
    ['Mercado', 500000],
    ['Internet', 80000],
    ['Servicio de Televisión y señal', 56500]
  ];

  // Columnas del gráfico
  public chartColumns = [
    { id: 'gasto', label: 'Gasto', type: 'string' },
    { id: 'monto', label: 'Monto', type: 'number' },
  ];

  // Opciones para el gráfico de pie
  public chartOptionsPie = {
    pieHole: 0.4,
    width: 800,
    height: 600,
    colors: ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99', '#C2C2F0', '#FFB3E6'],
    tooltip: { trigger: 'focus', isHtml: true },  // Mostrar montos en el tooltip
    pieSliceText: 'none'  // No mostrar el texto en el gráfico (solo en el tooltip)
  };

  // Opciones para el gráfico de barras
  public chartOptionsBar = {
    hAxis: { title: 'Gasto' },
    vAxis: { 
      title: 'Monto en pesos',  // Título del eje vertical
      minValue: 0,  // Valor mínimo del eje
      maxValue: 6000,  // Valor máximo del eje basado en los montos
      ticks: [100000, 200000, 300000, 400000, 500000, 600000]  // Niveles de precios en pesos
    },
    width: 800,
    height: 600,
    colors: ['#808080'],  // Color gris para las barras
    tooltip: { isHtml: true, trigger: 'focus' }  // Mostrar el monto al pasar el cursor
  };

  // Tipos de gráficos
  public chartTypePie: ChartType = ChartType.PieChart;
  public chartTypeBar: ChartType = ChartType.ColumnChart;

  // Nuevo gasto a agregar
  nuevoGasto: { nombre: string; monto: number } = { nombre: '', monto: 0 };

  constructor() {}

  // Función para agregar un nuevo gasto
  agregarGasto() {
    if (this.nuevoGasto.nombre && this.nuevoGasto.monto > 0) {
      // Agregar el nuevo gasto a los datos del gráfico
      this.chartDataPie.push([this.nuevoGasto.nombre, this.nuevoGasto.monto]);
      this.chartDataBar.push([this.nuevoGasto.nombre, this.nuevoGasto.monto]);

      // Reiniciar el formulario del nuevo gasto
      this.nuevoGasto = { nombre: '', monto: 0 };
    }
  }
}
