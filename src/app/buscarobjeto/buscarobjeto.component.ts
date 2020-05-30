import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiServiceService } from '../service/api-service.service';

//aún no se sabe si borrar estas importaciones
import { AuthService } from '../auth.service' //////
import { UserInterface } from 'src/app/modelos/user'; ///////
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';
import { FirebaseService } from '../service/firebase.service'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-buscarobjeto',
  templateUrl: './buscarobjeto.component.html',
  styleUrls: ['./buscarobjeto.component.css']
})
export class BuscarObjetoComponent implements OnInit {

  listaObjetos = [];

  constructor(public afAuth: AngularFireAuth, public api: ApiServiceService, private authService: AuthService, public AngularFirestore: AngularFirestore) { }
  public isadministrador: any = null;
  public userUid: string = null;

  //public FirebaseService = new FirebaseService(this.AngularFirestore)
  public roless = new permisos(this.afAuth,this.authService,this.api)
  ngOnInit() {
    this.authService.isAuth().subscribe(isauth => {
      console.log(isauth)
      this.userUid = isauth.uid
      this.getCurrentUser();
    })

    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item);
      }
    }, error => console.error(error));
  }
  async getCurrentUser() {
    this.isadministrador = await this.roless.isAdmin(this.userUid)
    
  }


}
