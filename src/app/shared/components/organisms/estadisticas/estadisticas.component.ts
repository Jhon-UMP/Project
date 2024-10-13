import { Component, OnInit } from '@angular/core';
import { GastosService } from 'auth-backend/services/gastos.service';

interface Gasto {
  nombre: string;
  monto: number;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  gastos: Gasto[] = [];
  chartData: number[] = []; 
  chartLabels: string[] = []; 
  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Estadísticas de Gastos'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monto'
        }
      }
    }
  };

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    this.obtenerGastosYActualizarGrafica();
  }

  obtenerGastosYActualizarGrafica(): void {
    this.gastosService.getGastos().subscribe(
      (response: Gasto[]) => {
        this.gastos = response;
        this.actualizarGrafica();
      },
      (error) => {
        console.error('Error al obtener los gastos:', error);
      }
    );
  }

  actualizarGrafica(): void {
    this.chartLabels = this.gastos.map(gasto => gasto.nombre);
    this.chartData = this.gastos.map(gasto => gasto.monto);
  }
}
