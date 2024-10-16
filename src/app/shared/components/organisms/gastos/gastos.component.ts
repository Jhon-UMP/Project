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

  gastosPredeterminados: Gasto[] = [
    // Agregar gastos predeterminados si es necesario
  ];

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    this.recuperarGastos();
    if (this.gastosPrincipales.length === 0 && this.gastosSecundarios.length === 0) {
      this.cargarGastos(); 
    }
    this.recuperarIngresoTotal();
    this.emitirGastosActualizados(); // Emitir al inicio
  }

  cargarGastos() {
    this.gastosService.getGastos().subscribe(
      (data: Gasto[]) => {
        this.gastosPrincipales = data.filter(g => g.tipo === 'principal');
        this.gastosSecundarios = data.filter(g => g.tipo === 'secundario');
        this.emitirGastosActualizados(); // Emitir después de cargar
        this.guardarGastos();
      },
      (error) => {
        console.error('Error al cargar gastos:', error);
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
      this.emitirGastosActualizados(); // Emitir después de editar
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

      if (tipo === 'principal') {
        this.gastosPrincipales.push(nuevoGasto);
        this.mostrarAgregarGastoPrincipal = false;
      } else if (tipo === 'secundario') {
        this.gastosSecundarios.push(nuevoGasto);
        this.mostrarAgregarGastoSecundario = false;
      }

      this.emitirGastosActualizados(); // Emitir después de agregar

      if (!this.esGastoPredeterminado(nuevoGasto)) {
        this.gastosService.agregarGasto(nuevoGasto).subscribe(
          () => {
            this.guardarGastos();
            this.nuevoGasto = { nombre: '', monto: 0, tipo: '', isEditable: false };
            this.actualizarIngresoRestante();
            this.emitirGastosActualizados(); // Emitir después de la llamada al servicio
          },
          (error) => {
            console.error('Error al agregar gasto:', error);
          }
        );
      } else {
        this.nuevoGasto = { nombre: '', monto: 0, tipo: '', isEditable: false };
      }

      this.guardarGastos();
    }
  }

  esGastoPredeterminado(gasto: Gasto): boolean {
    return this.gastosPredeterminados.some(predeterminado => predeterminado.nombre === gasto.nombre);
  }

  editGasto(gasto: Gasto) {
    gasto.isEditable = !gasto.isEditable;
    if (!gasto.isEditable) {
      this.actualizarIngresoRestante();
      this.guardarGastos();
      this.emitirGastosActualizados(); // Emitir después de editar
    }
  }

  deleteGasto(gasto: Gasto, tipo: string) {
    if (tipo === 'principal') {
      this.gastosPrincipales = this.gastosPrincipales.filter(item => item !== gasto);
    } else if (tipo === 'secundario') {
      this.gastosSecundarios = this.gastosSecundarios.filter(item => item !== gasto);
    }

    this.actualizarIngresoRestante();
    this.guardarGastos();
    this.emitirGastosActualizados(); // Emitir después de eliminar
  }

  calcularIngresoRestante(): number {
    const totalGastosPrincipales = this.gastosPrincipales.reduce((acc, gasto) => acc + gasto.monto, 0);
    const totalGastosSecundarios = this.gastosSecundarios.reduce((acc, gasto) => acc + gasto.monto, 0);
    return this.ingresoTotal - (totalGastosPrincipales + totalGastosSecundarios);
  }

  recuperarIngresoTotal() {
    const ingresoTotal = localStorage.getItem('ingresoTotal');
    this.ingresoTotal = ingresoTotal ? parseFloat(ingresoTotal) : 0;
  }

  guardarIngresoTotal() {
    localStorage.setItem('ingresoTotal', this.ingresoTotal.toString());
  }

  actualizarIngresoRestante() {
    const ingresoRestante = this.calcularIngresoRestante();
    console.log('Ingreso restante:', ingresoRestante);
  }

  recuperarGastos() {
    const gastosPrincipales = localStorage.getItem('gastosPrincipales');
    const gastosSecundarios = localStorage.getItem('gastosSecundarios');

    this.gastosPrincipales = gastosPrincipales ? JSON.parse(gastosPrincipales) : [];
    this.gastosSecundarios = gastosSecundarios ? JSON.parse(gastosSecundarios) : [];
  }

  guardarGastos() {
    localStorage.setItem('gastosPrincipales', JSON.stringify(this.gastosPrincipales));
    localStorage.setItem('gastosSecundarios', JSON.stringify(this.gastosSecundarios));
  }
}
