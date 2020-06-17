import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Base url
  baseurl = 'https://arcane-eyrie-96583.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }


  getNotifications(userId, filtro=null): Observable<Object> {
    if(filtro){
      return this.http.get<Object>(this.baseurl + '/usuario/' + userId + '/notificaciones?filter=' + JSON.stringify(filtro))
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )

    }else{
      return this.http.get<Object>(this.baseurl + '/usuario/' + userId + '/notificaciones')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }

  }


  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }


}
