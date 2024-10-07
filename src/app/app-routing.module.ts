import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosComponent } from './shared/components/organisms/gastos/gastos.component';
import { InformegeneralComponent } from './shared/components/organisms/informegeneral/informegeneral.component';
import { EstadisticasComponent } from './shared/components/organisms/estadisticas/estadisticas.component';
import { MovimientosComponent } from './shared/components/organisms/movimientos/movimientos.component';
import { AyudaComponent } from './shared/components/organisms/ayuda/ayuda.component';
import { LoginComponent } from './shared/components/organisms/login/login.component';
import { RegisterComponent } from './shared/components/organisms/register/register.component';
import { HomeComponent } from './shared/components/organisms/home/home.component';
import { HomedosComponent } from './shared/components/organisms/homedos/homedos.component'; // Importa HomedosComponent
import { ServiciosComponent } from './shared/components/organisms/servicios/servicios.component';
import { ServiciosdosComponent } from './shared/components/organisms/serviciosdos/serviciosdos.component';
import { NosotrosComponent } from './shared/components/organisms/nosotros/nosotros.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent, // Ruta padre que contiene las rutas hijas
    children: [
      { path: 'gastos', component: GastosComponent },
      { path: 'estadisticas', component: EstadisticasComponent },
      { path: 'movimientos', component: MovimientosComponent },
      { path: 'ayuda', component: AyudaComponent },
      { path: '', redirectTo: 'gastos', pathMatch: 'full' } // Redirigir a gastos por defecto
    ]
  },
  {
    path: 'homedos',
    component: HomedosComponent, // Este es el componente con el header y sidebar estáticos
    children: [
      { path: '', redirectTo: 'gastos', pathMatch: 'full' },// Redirigir a gastos por defecto en homedos
      { path: 'gastos', component: GastosComponent },
      { path: 'estadisticas', component: EstadisticasComponent },
      { path: 'movimientos', component: MovimientosComponent },
      { path: 'ayuda', component: AyudaComponent },
      { path: 'servicios', component: ServiciosComponent },
     
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'servicios', component: ServiciosComponent },
  { path: 'nosotros', component: NosotrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
