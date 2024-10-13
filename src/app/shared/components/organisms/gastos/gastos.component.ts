import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GastosService } from 'auth-backend/services/gastos.service'; // Ruta correcta para importar el servicio

// Definir la interfaz Gasto
interface Gasto {
  nombre: string;
  monto: number;
  tipo: string;
  isEditable: boolean;
}

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  @Output() gastosActualizados = new EventEmitter<{ principales: Gasto[], secundarios: Gasto[] }>();

  ingresoTotal: number = 0;
  isIngresoEditable: boolean = false;
  nuevoGasto: Gasto = { nombre: '', monto: 0, tipo: '', isEditable: false };

  mostrarAgregarGastoPrincipal: boolean = false;
  mostrarAgregarGastoSecundario: boolean = false;

  gastosPrincipales: Gasto[] = [];
  gastosSecundarios: Gasto[] = [];

  constructor(private gastosService: GastosService) {} // Inyección del servicio

  ngOnInit(): void {
    this.recuperarGastos(); // Recuperar gastos desde localStorage
    if (this.gastosPrincipales.length === 0 && this.gastosSecundarios.length === 0) {
      this.cargarGastos(); // Solo cargar gastos del backend si no hay gastos en localStorage
    }
    this.recuperarIngresoTotal(); // Recuperar el ingreso total desde localStorage
    this.emitirGastosActualizados();
  }

  // Cargar los gastos desde el backend
  cargarGastos() {
    this.gastosService.getGastos().subscribe(
      (data: Gasto[]) => {
        this.gastosPrincipales = data.filter((g: Gasto) => g.tipo === 'principal');
        this.gastosSecundarios = data.filter((g: Gasto) => g.tipo === 'secundario');
        this.emitirGastosActualizados(); // Emitir los gastos al componente de estadísticas
        this.guardarGastos(); // Guardar los gastos en localStorage
      },
      (error) => {
        console.error('Error al cargar gastos:', error); // Manejo del error al cargar gastos
      }
    );
  }

  emitirGastosActualizados() {
    this.gastosActualizados.emit({ principales: this.gastosPrincipales, secundarios: this.gastosSecundarios });
  }

  editIngreso() {
    this.isIngresoEditable = !this.isIngresoEditable;
    if (!this.isIngresoEditable) {
      this.actualizarIngresoRestante();
      this.guardarIngresoTotal();
    }
  }

  toggleAgregarGasto(tipo: string) {
    if (tipo === 'principal') {
      this.mostrarAgregarGastoPrincipal = !this.mostrarAgregarGastoPrincipal;
    } else if (tipo === 'secundario') {
      this.mostrarAgregarGastoSecundario = !this.mostrarAgregarGastoSecundario;
    }
  }

  agregarGasto(tipo: string) {
    if (this.nuevoGasto.nombre && this.nuevoGasto.monto > 0) {
      const nuevoGasto: Gasto = { 
        nombre: this.nuevoGasto.nombre, 
        monto: this.nuevoGasto.monto, 
        tipo, 
        isEditable: false 
      };

      // Agregar el nuevo gasto al arreglo correspondiente
      if (tipo === 'principal') {
        this.gastosPrincipales.push(nuevoGasto);
        this.mostrarAgregarGastoPrincipal = false;
      } else if (tipo === 'secundario') {
        this.gastosSecundarios.push(nuevoGasto);
        this.mostrarAgregarGastoSecundario = false;
      }

      // Llamar al servicio para agregar el gasto
      this.gastosService.agregarGasto(nuevoGasto).subscribe(
        () => {
          this.guardarGastos(); // Guardar en localStorage
          this.nuevoGasto = { nombre: '', monto: 0, tipo: '', isEditable: false }; // Reiniciar el gasto nuevo
          this.actualizarIngresoRestante();
          this.emitirGastosActualizados();
        },
        (error) => {
          console.error('Error al agregar gasto:', error); // Manejo del error al agregar gasto
        }
      );
    }
  }

  editGasto(gasto: Gasto) {
    gasto.isEditable = !gasto.isEditable;
    if (!gasto.isEditable) {
      this.actualizarIngresoRestante();
      this.guardarGastos(); // Guardar en localStorage
      this.emitirGastosActualizados();
    }
  }

  deleteGasto(gasto: Gasto, tipo: string) {
    // Eliminar el gasto del arreglo correspondiente
    if (tipo === 'principal') {
      this.gastosPrincipales = this.gastosPrincipales.filter(item => item !== gasto);
    } else if (tipo === 'secundario') {
      this.gastosSecundarios = this.gastosSecundarios.filter(item => item !== gasto);
    }

    this.actualizarIngresoRestante();
    this.guardarGastos(); // Guardar en localStorage después de eliminar
    this.emitirGastosActualizados();
  }

  calcularIngresoRestante(): number {
    const totalGastosPrincipales = this.gastosPrincipales.reduce((total, gasto) => total + gasto.monto, 0);
    const totalGastosSecundarios = this.gastosSecundarios.reduce((total, gasto) => total + gasto.monto, 0);
    return this.ingresoTotal - (totalGastosPrincipales + totalGastosSecundarios);
  }

  actualizarIngresoRestante() {
    console.log('Ingreso restante actualizado:', this.calcularIngresoRestante());
  }

  // Guardar los gastos en localStorage
  guardarGastos() {
    const gastos = {
      principales: this.gastosPrincipales,
      secundarios: this.gastosSecundarios
    };
    localStorage.setItem('gastos', JSON.stringify(gastos)); // Guardar ambos tipos de gastos juntos
  }

  // Recuperar los gastos de localStorage
  recuperarGastos() {
    const gastosGuardados = localStorage.getItem('gastos');
    if (gastosGuardados) {
      const { principales, secundarios } = JSON.parse(gastosGuardados);
      this.gastosPrincipales = principales || [];
      this.gastosSecundarios = secundarios || [];
    }
  }

  // Guardar el ingreso total en localStorage
  guardarIngresoTotal() {
    localStorage.setItem('ingresoTotal', JSON.stringify(this.ingresoTotal));
  }

  // Recuperar el ingreso total de localStorage
  recuperarIngresoTotal() {
    const ingresoTotalGuardado = localStorage.getItem('ingresoTotal');
    if (ingresoTotalGuardado) {
      this.ingresoTotal = JSON.parse(ingresoTotalGuardado);
    }
  }
}
