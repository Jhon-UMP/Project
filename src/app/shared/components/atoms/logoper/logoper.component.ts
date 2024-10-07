import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-logoper',
  templateUrl: './logoper.component.html',
  styleUrls: ['./logoper.component.scss']
})
export class LogoperComponent {
  isMenuOpen = false; // Controla la visibilidad del menú principal
  isConfigMenuOpen = false; // Controla la visibilidad del submenú de configuración
  isChangePasswordFormVisible = false; // Controla la visibilidad del formulario de cambio de contraseña
  newPassword: string = ''; // Almacena la nueva contraseña ingresada
  email: string = 'tu_email@ejemplo.com'; // Simulamos el email del usuario (obtenido de la autenticación)

  constructor(private http: HttpClient) {}

  // Muestra u oculta el menú principal
  toggleMenu() {
    // Si el formulario de cambiar contraseña está visible, no cierres el menú completo
    if (this.isChangePasswordFormVisible) {
      return;
    }
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isConfigMenuOpen = false;
      this.isChangePasswordFormVisible = false;
    }
    console.log('Menú principal abierto:', this.isMenuOpen);
  }


  // Muestra u oculta el submenú de configuración
  toggleConfigMenu(event: Event) {
    event.stopPropagation();
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
    if (!this.isConfigMenuOpen) {
      this.isChangePasswordFormVisible = false;
    }
    console.log('Submenú de configuración abierto:', this.isConfigMenuOpen);
  }

  // Muestra el formulario de cambiar contraseña
  showChangePasswordForm() {
    this.isChangePasswordFormVisible = !this.isChangePasswordFormVisible;
    console.log('Formulario de cambiar contraseña visible:', this.isChangePasswordFormVisible);
  }
  

  // Cambia la contraseña del usuario
  changePassword() {
    if (!this.newPassword) {
      alert('Por favor ingresa una nueva contraseña.');
      return;
    }
    console.log('Nueva contraseña:', this.newPassword);
  
    const url = 'http://localhost:3000/change-password'; 
    const body = { email: this.email, newPassword: this.newPassword };
  
    this.http.post(url, body).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Contraseña cambiada exitosamente');
          this.isChangePasswordFormVisible = false;
          this.newPassword = '';
        }
      },
      (error) => {
        console.error('Error al cambiar la contraseña:', error);
      }
    );
  }
  
}
