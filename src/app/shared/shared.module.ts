import { NgModule } from '@angular/core'; // Ya no necesitas CUSTOM_ELEMENTS_SCHEMA
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/organisms/header/header.component';
import { SidebarMenuComponent } from './components/organisms/sidebar-menu/sidebar-menu.component';
import { LogogenComponent } from './components/atoms/logogen/logogen.component';
import { ButtonsSiderComponent } from './components/molecules/buttons-sider/buttons-sider.component';
import { NavGeneralComponent } from './components/molecules/nav-general/nav-general.component';
import { ButtonsloginComponent } from './components/molecules/buttonslogin/buttonslogin.component';
import { MovimientosComponent } from './components/organisms/movimientos/movimientos.component';
import { AyudaComponent } from './components/organisms/ayuda/ayuda.component';
import { InformegeneralComponent } from './components/organisms/informegeneral/informegeneral.component';
import { GastosComponent } from './components/organisms/gastos/gastos.component';
import { EstadisticasComponent } from './components/organisms/estadisticas/estadisticas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { LogoperComponent } from './components/atoms/logoper/logoper.component';
import { HeadersinlogComponent } from './components/organisms/headersinlog/headersinlog.component';
import { LoginComponent } from './components/organisms/login/login.component';
import { RegisterComponent } from './components/organisms/register/register.component';
import { NosotrosComponent } from './components/organisms/nosotros/nosotros.component';
import { ServiciosComponent } from './components/organisms/servicios/servicios.component';
import { HomeComponent } from './components/organisms/home/home.component';
import { HomedosComponent } from './components/organisms/homedos/homedos.component';
import { HeaderlogueadoComponent } from './components/organisms/headerlogueado/headerlogueado.component';
import { ServiciosdosComponent } from './components/organisms/serviciosdos/serviciosdos.component';
import { HeaderfalsoComponent } from './components/organisms/headerfalso/headerfalso.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarMenuComponent,
    LogogenComponent,
    ButtonsSiderComponent,
    NavGeneralComponent,
    ButtonsloginComponent,
    MovimientosComponent,
    AyudaComponent,
    InformegeneralComponent,
    GastosComponent,
    EstadisticasComponent,
    LogoperComponent,
    HeadersinlogComponent,
    LoginComponent,
    RegisterComponent,
    NosotrosComponent,
    ServiciosComponent,
    HomeComponent,
    HomedosComponent,
    HeaderlogueadoComponent,
    ServiciosdosComponent,
    HeaderfalsoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
  ],
  exports: [
    HeaderComponent,
    ButtonsSiderComponent,
    SidebarMenuComponent,
    GastosComponent,
    HeadersinlogComponent,
    LoginComponent,
    RegisterComponent,
    GoogleChartsModule
  ]
})
export class SharedModule { }
