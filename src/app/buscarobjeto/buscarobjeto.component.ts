import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';

@Component({
  selector: 'app-buscarobjeto',
  templateUrl: './buscarobjeto.component.html',
  styleUrls: ['./buscarobjeto.component.css']
})
export class BuscarObjetoComponent implements OnInit {

  listaObjetos=[];

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService) { }

  ngOnInit() {
    this.api.getObjects().subscribe((response: any) => {
      for (var item of response) {
        this.listaObjetos.push(item); 
      }
    }, error => console.error(error));
  }

}
