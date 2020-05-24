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
  public isadministrador: any = null;
  public userUid: string = null;

  public roless=new permisos(this.afAuth,this.authService)
  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService, private authService: AuthService) {
    this.roless.isAdmin() 
    this.isadministrador=this.roless.isadministrador
  }
  //public isadministrador1= this.roles.isadministrador;
  
  ngOnInit() {
    console.log("Eduardo",this.isadministrador)
    
    //this.getCurrentUser();
    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item); 
      }
    }, error => console.error(error));
  }
  // getCurrentUser=async function() {
  //   console.log("llegaste hasta")
  //   await this.roless.isAdmin()
  //   console.log("isadministrador1",this.roless.isadministrador)
  //   this.authService.isAuth().subscribe(auth => {
  //     if(auth){
  //       console.log("llegaste hasta")
  //       this.userUid = auth.uid;
  //       console.log("llegas a 33")
  //       this.authService.isUseradministrador(this.userUid).subscribe(userRole =>{
  //         this.isadministrador = Object.assign({}, userRole.rol);
  //         console.log("llegas a 3")
  //         console.log(userRole.rol)
  //         this.isadministrador = this.isadministrador.hasOwnProperty('administrador');
  //       })
  //     }
  //   })
  // }

}
