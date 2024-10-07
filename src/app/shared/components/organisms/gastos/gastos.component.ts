import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  ingresoTotal: number = 0;
  isIngresoEditable: boolean = false;

  // Inicializa con los gastos predeterminados
  gastosPrincipales = [
    { nombre: 'Energía', monto: 0, isEditable: false },
    { nombre: 'Agua', monto: 0, isEditable: false },
    { nombre: 'Gas', monto: 0, isEditable: false },
    { nombre: 'Mercado', monto: 0, isEditable: false }
  ];

  gastosSecundarios = [
    { nombre: 'Internet', monto: 0, isEditable: false },
    { nombre: 'Servicio de Televisión y señal', monto: 0, isEditable: false }
  ];

  nuevoGasto: { nombre: string; monto: number } = { nombre: '', monto: 0 };
  mostrarAgregarGastoPrincipal: boolean = false;
  mostrarAgregarGastoSecundario: boolean = false;

  ngOnInit(): void {
    this.cargarGastos(); // Cargamos los gastos guardados al iniciar
  }

  editIngreso() {
    this.isIngresoEditable = !this.isIngresoEditable;
    if (!this.isIngresoEditable) {
      console.log("Ingreso Total actualizado: ", this.ingresoTotal);
    }
  }

  editGasto(gasto: { nombre: string; monto: number; isEditable: boolean }) {
    gasto.isEditable = !gasto.isEditable;
    if (!gasto.isEditable) {
      console.log(`${gasto.nombre} actualizado: `, gasto.monto);
      this.guardarGastos(); // Guardamos los gastos cuando se editan
    }
  }

  toggleAgregarGasto(tipo: string) {
    if (tipo === 'principal') {
      this.mostrarAgregarGastoPrincipal = !this.mostrarAgregarGastoPrincipal;
    } else {
      this.mostrarAgregarGastoSecundario = !this.mostrarAgregarGastoSecundario;
    }
  }

  agregarGasto(tipo: string) {
    if (this.nuevoGasto.nombre && this.nuevoGasto.monto) {
      const nuevoGasto = { ...this.nuevoGasto, isEditable: false };

      if (tipo === 'principal') {
        this.gastosPrincipales.push(nuevoGasto);
        this.mostrarAgregarGastoPrincipal = false;
      } else {
        this.gastosSecundarios.push(nuevoGasto);
        this.mostrarAgregarGastoSecundario = false;
      }

      this.nuevoGasto = { nombre: '', monto: 0 };
      this.guardarGastos(); // Guardamos los gastos al agregar un nuevo gasto
    }
  }

  deleteGasto(gasto: { nombre: string; monto: number }, tipo: string) {
    if (tipo === 'principal') {
      this.gastosPrincipales = this.gastosPrincipales.filter(item => item !== gasto);
    } else if (tipo === 'secundario') {
      this.gastosSecundarios = this.gastosSecundarios.filter(item => item !== gasto);
    }

    this.guardarGastos(); // Guardamos los cambios después de eliminar un gasto
    console.log(`${gasto.nombre} eliminado.`);
  }

  calcularIngresoRestante(): number {
    const totalGastos = this.gastosPrincipales.reduce((sum, gasto) => sum + gasto.monto, 0)
                      + this.gastosSecundarios.reduce((sum, gasto) => sum + gasto.monto, 0);
    return this.ingresoTotal - totalGastos;
  }

  // Guardar los gastos en localStorage
  guardarGastos(): void {
    const todosGastos = {
      principales: this.gastosPrincipales,
      secundarios: this.gastosSecundarios
    };
    localStorage.setItem('gastos', JSON.stringify(todosGastos));
  }

  // Cargar los gastos desde localStorage
  cargarGastos(): void {
    const gastosGuardados = localStorage.getItem('gastos');
    if (gastosGuardados) {
      const { principales, secundarios } = JSON.parse(gastosGuardados);
      this.gastosPrincipales = principales || this.gastosPrincipales;
      this.gastosSecundarios = secundarios || this.gastosSecundarios;
    }
  }
}
