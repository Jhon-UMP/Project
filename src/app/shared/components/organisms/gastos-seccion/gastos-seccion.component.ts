import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-gastos-seccion',
  templateUrl: './gastos-seccion.component.html',
  styleUrls: ['./gastos-seccion.component.scss']
})
export class GastosSeccionComponent implements OnInit {
  @Output() actualizarGrafica = new EventEmitter<void>();  // Emitir evento para actualizar la gráfica

  ingresoTotal: number = 0;
  isIngresoEditable: boolean = false;
  mostrarAgregarGastoPrincipal: boolean = false;
  mostrarAgregarGastoSecundario: boolean = false;
  nuevoGasto: any = { nombre: '', monto: 0 };
  gastosPrincipales: any[] = [];
  gastosSecundarios: any[] = [];

  ngOnInit() {
    // Cargar los datos desde localStorage al iniciar
    const gastosPrincipalesGuardados = localStorage.getItem('gastosPrincipales');
    const gastosSecundariosGuardados = localStorage.getItem('gastosSecundarios');
    const ingresoTotalGuardado = localStorage.getItem('ingresoTotal');

    if (gastosPrincipalesGuardados) {
      this.gastosPrincipales = JSON.parse(gastosPrincipalesGuardados);
    }

    if (gastosSecundariosGuardados) {
      this.gastosSecundarios = JSON.parse(gastosSecundariosGuardados);
    }

    if (ingresoTotalGuardado) {
      this.ingresoTotal = +ingresoTotalGuardado; // Convertir a número
    }
  }

  editIngreso() {
    this.isIngresoEditable = !this.isIngresoEditable;
    // Guardar el ingreso total en localStorage cuando se edita
    localStorage.setItem('ingresoTotal', this.ingresoTotal.toString());
    this.actualizarGrafica.emit();  // Emitir evento para actualizar la gráfica
  }

  toggleAgregarGasto(tipo: string) {
    if (tipo === 'principal') {
      this.mostrarAgregarGastoPrincipal = !this.mostrarAgregarGastoPrincipal;
    } else {
      this.mostrarAgregarGastoSecundario = !this.mostrarAgregarGastoSecundario;
    }
  }

  agregarGasto(tipo: string) {
    if (tipo === 'principal') {
      this.gastosPrincipales.push({ ...this.nuevoGasto, isEditable: false });
      this.actualizarLocalStorage('gastosPrincipales', this.gastosPrincipales);
    } else {
      this.gastosSecundarios.push({ ...this.nuevoGasto, isEditable: false });
      this.actualizarLocalStorage('gastosSecundarios', this.gastosSecundarios);
    }
    this.nuevoGasto = { nombre: '', monto: 0 };
    this.actualizarGrafica.emit();  // Emitir evento para actualizar la gráfica
  }

  editGasto(gasto: any) {
    gasto.isEditable = !gasto.isEditable;
    // Actualizar los datos cuando se editan
    this.actualizarLocalStorage('gastosPrincipales', this.gastosPrincipales);
    this.actualizarLocalStorage('gastosSecundarios', this.gastosSecundarios);
    this.actualizarGrafica.emit();  // Emitir evento para actualizar la gráfica
  }

  deleteGasto(gasto: any, tipo: string) {
    if (tipo === 'principal') {
      this.gastosPrincipales = this.gastosPrincipales.filter(g => g !== gasto);
      this.actualizarLocalStorage('gastosPrincipales', this.gastosPrincipales);
    } else {
      this.gastosSecundarios = this.gastosSecundarios.filter(g => g !== gasto);
      this.actualizarLocalStorage('gastosSecundarios', this.gastosSecundarios);
    }
    this.actualizarGrafica.emit();  // Emitir evento para actualizar la gráfica
  }

  calcularIngresoRestante() {
    const gastosTotal = [...this.gastosPrincipales, ...this.gastosSecundarios].reduce((total, gasto) => total + gasto.monto, 0);
    return this.ingresoTotal - gastosTotal;
  }

  // Método auxiliar para actualizar localStorage
  private actualizarLocalStorage(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
  