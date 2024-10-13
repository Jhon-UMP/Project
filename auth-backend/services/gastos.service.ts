import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'http://localhost:3000/gastos'; // URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener todos los gastos
  getGastos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para agregar un nuevo gasto
  agregarGasto(gasto: any): Observable<any> {
    return this.http.post(this.apiUrl, gasto);
  }
}
