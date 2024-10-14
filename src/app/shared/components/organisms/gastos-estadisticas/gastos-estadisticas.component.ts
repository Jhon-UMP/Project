import { Component } from '@angular/core';

interface Gastos {
  principales: { nombre: string; monto: number; }[];
  secundarios: { nombre: string; monto: number; }[];
}

@Component({
  selector: 'app-gastos-estadisticas',
  templateUrl: './gastos-estadisticas.component.html',
  styleUrls: ['./gastos-estadisticas.component.scss']
})
export class GastosEstadisticasComponent {
  // Inicializa gastosActualizados con un objeto vacío que coincide con el tipo
  gastosActualizados: Gastos = {
    principales: [],
    secundarios: []
  };

  actualizarGastos(event: Gastos) {
    this.gastosActualizados = event; // Actualiza la propiedad con los nuevos gastos
    console.log('Gastos actualizados:', this.gastosActualizados); // Para depuración
  }
}
