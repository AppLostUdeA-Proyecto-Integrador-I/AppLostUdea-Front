import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiServiceService } from '../service/api-service.service';
import { AuthService } from '../auth.service' 
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-buscarobjeto',
  templateUrl: './buscarobjeto.component.html',
  styleUrls: ['./buscarobjeto.component.css']
})
export class BuscarObjetoComponent implements OnInit {

  listaObjetos = [];

  constructor(public api: ApiServiceService, public authService: AuthService) { }
  public isadministrador: any = null;
  public userUid: string = null;
  public roles = new permisos(this.api)

  ngOnInit() {
    this.authService.isAuth().subscribe(isauth => {
      if (isauth) {
        this.userUid = isauth.uid
        this.getCurrentUser();
      }
    })
    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item);
      }
    }, error => console.error(error));
  }
  async getCurrentUser() {
    this.isadministrador = await this.roles.isAdmin(this.userUid)
  }
}
