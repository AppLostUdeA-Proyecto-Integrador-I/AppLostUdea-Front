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
    fechaEncontrado: '',
    imagen: '',
    lugarEncontrado: '',
    estado: '',
    detalleEntregaId: {
      fechaEntrega: null,
      id: null,
    },
    observaciones: '',
    id: null,
    categoriasId: '',
    lugarDeReclamoId: '',
    usuariosId: '',
  };

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService) { }

  ngOnInit() {
   }

  onSubmit(formData) {
    console.log('Holi')
    console.log(formData.nombreObjeto)
    this.model.nombreObjeto = formData.nombreObjeto;
    this.model.fechaEncontrado = formData.fechaEncontrado;
    this.model.imagen = 'Imagen tomada del front';
    this.model.lugarEncontrado = formData.lugarEncontrado;
    this.model.estado = 'Reportado';
    this.model.observaciones = formData.observaciones;
    this.model.categoriasId = formData.categoriasId;
    this.model.lugarDeReclamoId = formData.lugarDeReclamoId;
    this.model.usuariosId = this.afAuth.auth.currentUser.uid;
    this.api.createObject(this.model).subscribe((response: Objeto) => console.log(response));
    alert('Se ha agregado el objeto : ' + formData.nombreObjeto);
  }

}
