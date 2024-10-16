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
  gastosActualizados: Gastos = {
    principales: [
      { nombre: 'Alquiler', monto: 200000 },
      { nombre: 'Servicios', monto: 50000 },
    ],
    secundarios: [
      { nombre: 'Comida', monto: 30000 },
      { nombre: 'Transporte', monto: 20000 },
    ]
  };

  actualizarGastos(nuevosGastos: Gastos) {
    console.log('Datos recibidos del componente gastos:', nuevosGastos);

    // Forzar la reactividad cambiando la referencia del objeto completo
    this.gastosActualizados = {
      ...nuevosGastos,
      principales: [...nuevosGastos.principales],
      secundarios: [...nuevosGastos.secundarios]
    };
  }
}
