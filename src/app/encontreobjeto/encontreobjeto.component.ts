import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';
import { Objeto } from '../modelos/Objeto';

@Component({
  selector: 'app-encontreobjeto',
  templateUrl: './encontreobjeto.component.html',
  styleUrls: ['./encontreobjeto.component.css']
})
export class EncontreObjetoComponent implements OnInit {

  model: Objeto = {
    nombreObjeto: '',
    fechaEncontrado: new Date(),
    imagen: 'Imagensita',
    lugarEncontrado: '',
    estado: 'Reportado',
    detalleEntregaId: {
      fechaEntrega: null,
      id: null,
    },
    observaciones: '',
    categoriasId: '',
    lugarDeReclamoId: '',
    usuariosId: '',
  };

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService) {

   }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Holi')
    this.api.createObject(this.model).subscribe((response: Objeto) => console.log(response));
  }

}
