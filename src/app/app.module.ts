import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';
import { GastosService } from '../../auth-backend/services/gastos.service'; // Asegúrate de que esta ruta sea correcta

@NgModule({
  declarations: [
    AppComponent,
    // EstadisticasComponent se elimina de aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    HttpClientModule,
  ],
  providers: [
    GastosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
