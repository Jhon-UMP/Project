import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  movimientos = [
    { fecha: '9 De Agosto De 2024', descripcion: 'Movimientos', monto: 78000 },
    { fecha: '19 De Agosto De 2024', descripcion: 'Movimientos', monto: -8000 },
    { fecha: '19 De Agosto De 2024', descripcion: 'Movimientos', monto: -10000 }
  ];

  ngOnInit() {
    // Cargar movimientos guardados en localStorage al iniciar
    const movimientosGuardados = localStorage.getItem('movimientos');
    if (movimientosGuardados) {
      this.movimientos = JSON.parse(movimientosGuardados);
    }
  }

  // Función para crear un nuevo movimiento
  crearMovimiento() {
    const nuevoMovimiento = { 
      fecha: this.getFechaActual(), // Se genera la fecha actual
      descripcion: '', // Descripción vacía inicialmente
      monto: 0 // Monto inicializado en 0
    };
    this.movimientos.push(nuevoMovimiento);
    // Guardar movimientos en localStorage
    this.guardarMovimientos(); // Llamada a un método separado para guardar
  }

  // Función para eliminar un movimiento manualmente
  eliminarMovimiento(index: number) {
    this.movimientos.splice(index, 1);
    // Actualizar localStorage después de eliminar
    this.guardarMovimientos(); // Llamada a un método separado para guardar
  }

  // Función para obtener la fecha actual en formato "D de Mes de Año"
  getFechaActual(): string {
    const hoy = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return hoy.toLocaleDateString('es-ES', opciones);
  }

  // Método para guardar movimientos en localStorage
  guardarMovimientos() {
    localStorage.setItem('movimientos', JSON.stringify(this.movimientos));
  }
}
