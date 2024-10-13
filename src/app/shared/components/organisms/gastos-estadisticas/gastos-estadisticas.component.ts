import { Component } from '@angular/core';

@Component({
  selector: 'app-gastos-estadisticas',
  templateUrl: './gastos-estadisticas.component.html',
  styleUrls: ['./gastos-estadisticas.component.scss']
})
export class GastosEstadisticasComponent {
  mostrarGastosEstadisticas = false;

  // Método para mostrar el componente
  mostrar(): void {
    this.mostrarGastosEstadisticas = true;
  }

  // Método para ocultar el componente
  ocultar(): void {
    this.mostrarGastosEstadisticas = false;
  }
}
