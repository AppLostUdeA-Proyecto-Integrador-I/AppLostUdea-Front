import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';

//aún no se sabe si borrar estas importaciones
import { AuthService } from '../auth.service'
import { UserInterface } from 'src/app/user/user.model'; // optional

@Component({
  selector: 'app-buscarobjeto',
  templateUrl: './buscarobjeto.component.html',
  styleUrls: ['./buscarobjeto.component.css']
})
export class BuscarObjetoComponent implements OnInit {

  listaObjetos=[];

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService, private authService: AuthService) { }
  public isadministrador: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item); 
      }
    }, error => console.error(error));
  }
  getCurrentUser(){
    console.log("llegaste hasta")
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        console.log("llegaste hasta")
        this.userUid = auth.uid;
        console.log("llegas a 33")
        this.authService.isUseradministrador(this.userUid).subscribe(userRole =>{
          this.isadministrador = Object.assign({}, userRole.rol);
          console.log("llegas a 3")
          console.log(userRole.rol)
          this.isadministrador = this.isadministrador.hasOwnProperty('administrador');
        })
      }
    })
  }

}
