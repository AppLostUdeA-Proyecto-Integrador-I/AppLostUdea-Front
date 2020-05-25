import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';

//aún no se sabe si borrar estas importaciones
import { AuthService } from '../auth.service' //////
import { UserInterface } from 'src/app/modelos/user'; ///////
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-buscarobjeto',
  templateUrl: './buscarobjeto.component.html',
  styleUrls: ['./buscarobjeto.component.css']
})
export class BuscarObjetoComponent implements OnInit {

  listaObjetos=[];

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService, private authService: AuthService) { }
  //public isadministrador1= this.roles.isadministrador;
  public isadministrador: any = null;
  public userUid: string = null;

  public roless=new permisos(this.afAuth,this.authService)
  ngOnInit() {
  console.log("comentario",this.roless.isAdmin())

    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item); 
      }
    }, error => console.error(error));
  }


}
