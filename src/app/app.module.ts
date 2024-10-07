import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de que sea HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    // Aquí puedes agregar otros componentes que declares en tu aplicación
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,          // Permite el uso de formularios reactivos
    ReactiveFormsModule,  // Permite el uso de formularios reactivos
    GoogleChartsModule,   // Permite usar gráficos de Google
    HttpClientModule,     // Permite realizar solicitudes HTTP
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para permitir el uso de elementos personalizados
})
export class AppModule { }
