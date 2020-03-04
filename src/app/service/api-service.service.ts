import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(`${this.API_URL}/categoria`);
  }
}
