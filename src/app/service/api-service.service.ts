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

  getObjects(filter:Object=null,id:String=null) {
    if (id) {
      return this.http.get<any>(`${this.API_URL}/Objeto/` + id);
    }

    if(!filter){
      return this.http.get<any>(`${this.API_URL}/Objeto`);
    }
    else{
      return this.http.get<any>(`${this.API_URL}/Objeto?filter=` + JSON.stringify(filter));
    }
  }

  createObject(objeto: Objeto): Observable<Objeto>{
    return this.http.post<Objeto>(`${this.API_URL}/objeto`, objeto)
  }
  getUserById(id: String) {
    return this.http.get<any>(`${this.API_URL}/usuario/${id}`)
  }
  getObjects2(id: String) {
    return this.http.get<any>(`${this.API_URL}/Objeto/${id}`);
  }
  getCategories2(id: String) {
    return this.http.get<any>(`${this.API_URL}/categoria/${id}`);
  }

}
