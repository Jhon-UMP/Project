import { Component } from '@angular/core';

@Component({
  selector: 'app-homedos',
  templateUrl: './homedos.component.html',
  styleUrls: ['./homedos.component.scss']
})
export class HomedosComponent {
  mostrarGastos: boolean = false;
  mostrarEstadisticas: boolean = false;
  gastos: { principales: any[], secundarios: any[] } = { principales: [], secundarios: [] };

  toggleGastos() {
    this.mostrarGastos = !this.mostrarGastos;
  }

  toggleEstadisticas() {
    this.mostrarEstadisticas = !this.mostrarEstadisticas;
  }

  actualizarGastos(gastosActualizados: { principales: any[], secundarios: any[] }) {
    this.gastos = gastosActualizados;
    // Aquí puedes realizar cualquier otra lógica si es necesario al actualizar los gastos.
  }
}
