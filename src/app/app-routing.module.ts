import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosComponent } from './shared/components/organisms/gastos/gastos.component';
import { InformegeneralComponent } from './shared/components/organisms/informegeneral/informegeneral.component';
import { MovimientosComponent } from './shared/components/organisms/movimientos/movimientos.component';
import { AyudaComponent } from './shared/components/organisms/ayuda/ayuda.component';
import { LoginComponent } from './shared/components/organisms/login/login.component';
import { RegisterComponent } from './shared/components/organisms/register/register.component';
import { HomeComponent } from './shared/components/organisms/home/home.component';
import { HomedosComponent } from './shared/components/organisms/homedos/homedos.component'; // Importa HomedosComponent
import { ServiciosComponent } from './shared/components/organisms/servicios/servicios.component';
import { ServiciosdosComponent } from './shared/components/organisms/serviciosdos/serviciosdos.component';
import { NosotrosComponent } from './shared/components/organisms/nosotros/nosotros.component';
import { GastosSeccionComponent } from './shared/components/organisms/gastos-seccion/gastos-seccion.component';
import { EstadisticasSeccionComponent } from './shared/components/organisms/estadisticas-seccion/estadisticas-seccion.component'; // Asegúrate de importar este componente
import { EstadisticasComponent } from './shared/components/organisms/estadisticas/estadisticas.component';
import { GastosEstadisticasComponent } from './shared/components/organisms/gastos-estadisticas/gastos-estadisticas.component';

const routes: Routes = [
  {
    path: 'homedos',
    component: HomedosComponent, // Componente principal con header y sidebar
    children: [
      { path: '', redirectTo: 'gastos', pathMatch: 'full' }, // Redirigir a gastos por defecto
      { path: 'gastos', component: GastosEstadisticasComponent}, // Componente Gastos
      { path: 'movimientos', component: MovimientosComponent },
      { path: 'estadisticas', component: EstadisticasComponent },
      { path: 'ayuda', component: AyudaComponent },
      { path: 'servicios', component: ServiciosComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'servicios', component: ServiciosComponent },
  { path: 'nosotros', component: NosotrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
