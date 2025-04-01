import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { any } from 'ramda';
import { Observable } from 'rxjs';


const API_URL = 'https://services.test.sw.com.mx/';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient) {}

  authenticate(): Observable<any> {
    return this.http.post(`${API_URL}/v2/security/authenticate`, {
      user: "eduardoavilat2002@gmail.com",
      password: "wmxUyUq9#DaN"
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  generarFactura(xml: string, token: string): Observable<any> {
    return this.http.post(`${API_URL}/cfdi33/issue/json/v4`, 
      { xml },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
  }
  
}
