import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Router } from '@angular/router'; // Para redirigir al login después del registro

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Formulario de registro enviado');
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);

    // Petición POST para enviar los datos al backend
    this.http.post<{ success: boolean, error?: string }>('http://localhost:3000/register', {
      email: this.email,
      password: this.password
    }).subscribe(
      response => {
        if (response.success) {
          // Si el registro es exitoso, redirigir al login
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.error || 'Error desconocido';
        }
      },
      error => {
        console.error('Error al registrar', error);
        this.errorMessage = 'Error en el registro';
      }
    );
  }
}
