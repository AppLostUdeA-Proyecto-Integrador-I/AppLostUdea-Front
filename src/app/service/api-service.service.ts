import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objeto } from '../modelos/Objeto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(`${this.API_URL}/categoria`);
  }

  createObject(objeto: Objeto): Observable<Objeto>{
    return this.http.post<Objeto>(`${this.API_URL}/objeto`, objeto)
  }

}
