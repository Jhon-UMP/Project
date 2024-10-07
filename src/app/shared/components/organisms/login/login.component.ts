import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Router } from '@angular/router'; // Importa Router para redireccionar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';  // Variable para el correo electrónico
  password: string = '';  // Variable para la contraseña
  errorMessage: string = ''; // Mensaje de error general
  emailError: string = ''; // Mensaje de error específico para el correo
  passwordError: string = ''; // Mensaje de error específico para la contraseña

  constructor(private http: HttpClient, private router: Router) {} // Inyecta HttpClient y Router

  // Método que se llama al enviar el formulario
  onSubmit() {
    console.log('Formulario enviado'); // Verifica el envío del formulario
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);

    // Restablecer errores antes de realizar la solicitud
    this.emailError = '';
    this.passwordError = '';
    this.errorMessage = '';

    // Validaciones básicas en el frontend antes de hacer la solicitud
    if (!this.email) {
      this.emailError = 'El correo electrónico es obligatorio.';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Por favor, introduce un correo electrónico válido.';
    }

    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria.';
    }

    // Si hay errores, no proceder con la solicitud HTTP
    if (this.emailError || this.passwordError) {
      return;
    }

    // Realiza la solicitud POST al backend
    this.http.post<{ token?: string, error?: string }>('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    }).subscribe(
      response => {
        // Si la respuesta contiene un token, redirige
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/homedos']); // Cambia '/homedos' por la ruta deseada
        } else {
          // Si hay un error en la respuesta, mostrarlo en los campos correspondientes
          if (response.error) {
            if (response.error.includes('correo')) {
              this.emailError = 'Correo incorrecto.';
            }
            if (response.error.includes('contraseña')) {
              this.passwordError = 'Contraseña incorrecta.';
            }
            this.errorMessage = 'Error en el inicio de sesión. Verifica tus credenciales.';
          }
        }
      },
      error => {
        // En caso de un error en la solicitud, mostrar mensaje de error general
        console.error('Error de autenticación', error);
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }

  // Método para validar el formato del correo electrónico
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
