import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GastosService } from 'auth-backend/services/gastos.service'; // Asegúrate de que la ruta sea correcta

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

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    this.recuperarGastos(); // Recuperar gastos desde localStorage
    // Solo cargar gastos del backend si no hay gastos en localStorage
    if (this.gastosPrincipales.length === 0 && this.gastosSecundarios.length === 0) {
      this.cargarGastos(); 
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
      this.emitirGastosActualizados(); // Emitir actualizaciones después de guardar
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
          this.emitirGastosActualizados(); // Emitir actualizaciones después de agregar
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
      this.emitirGastosActualizados(); // Emitir actualizaciones después de editar
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
    this.emitirGastosActualizados(); // Emitir actualizaciones después de eliminar
  }

  calcularIngresoRestante(): number {
    const totalGastosPrincipales = this.gastosPrincipales.reduce((total, gasto) => total + gasto.monto, 0);
    const totalGastosSecundarios = this.gastosSecundarios.reduce((total, gasto) => total + gasto.monto, 0);
    return this.ingresoTotal - (totalGastosPrincipales + totalGastosSecundarios);
  }

  guardarGastos() {
    const gastos = {
      principales: this.gastosPrincipales,
      secundarios: this.gastosSecundarios
    };
    localStorage.setItem('gastos', JSON.stringify(gastos)); // Guardar gastos en localStorage
  }

  // Este método recupera los gastos de localStorage
  recuperarGastos() {
    const gastos = localStorage.getItem('gastos');
    if (gastos) {
      const { principales, secundarios } = JSON.parse(gastos);
      this.gastosPrincipales = principales || [];
      this.gastosSecundarios = secundarios || [];
    }
  }

  guardarIngresoTotal() {
    localStorage.setItem('ingresoTotal', JSON.stringify(this.ingresoTotal)); // Guardar ingreso total en localStorage
  }

  recuperarIngresoTotal() {
    const ingresoTotal = localStorage.getItem('ingresoTotal');
    if (ingresoTotal) {
      this.ingresoTotal = JSON.parse(ingresoTotal) || 0; // Recuperar ingreso total desde localStorage
    }
  }

  actualizarIngresoRestante() {
    this.calcularIngresoRestante(); // Actualizar el ingreso restante
  }
}
