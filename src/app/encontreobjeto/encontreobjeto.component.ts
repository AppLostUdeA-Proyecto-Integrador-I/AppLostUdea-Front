import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';
import { Objeto } from '../modelos/Objeto';

//borrar los que no necesitas
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-encontreobjeto',
  templateUrl: './encontreobjeto.component.html',
  styleUrls: ['./encontreobjeto.component.css']
})
export class EncontreObjetoComponent implements OnInit {
  // generar un ID aleatorio
  randomId = Math.random().toString(36).substring(2);

  uploadURL: Observable<string>;

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

  constructor(public afAuth: AngularFireAuth,public api: ApiServiceService, private storage: AngularFireStorage) { }

  //Imagen que el usuario sube a traves del input 

  uploadFile(event){
    // Obtener archivo de entrada
    const file = event.target.files[0];

    // Generate a random ID
    //const randomId = Math.random().toString(36).substring(2);
    console.log(this.randomId);
    const filepath = `images/${this.randomId}`;

    const fileRef = this.storage.ref(filepath);

    // cargar la imagen y guardarla en el sotarage del firebase 
    const task = this.storage.upload(filepath, file);

   }


  ngOnInit() {
   }

  onSubmit(formData) {
    console.log('Holi')
    console.log(this.randomId)
    console.log(formData.nombreObjeto)
    this.model.nombreObjeto = formData.nombreObjeto;
    this.model.fechaEncontrado = formData.fechaEncontrado;
    this.model.imagen = this.randomId;
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
