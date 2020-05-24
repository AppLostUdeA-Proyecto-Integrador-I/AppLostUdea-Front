import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ApiServiceService} from '../service/api-service.service';
import { Objeto } from '../modelos/Objeto';
import { FileI } from '../modelos/imagen';

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
  private image: any
  private filePath: any;
  private downloadURL: Observable<string>;
  // generar un ID aleatorio
  randomId = Math.random().toString(36).substring(2);

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

  uploadFile(event:any):void{
    this.image = event.target.files[0];
    this.uploadImage(this.image);
    console.log('Image', this.image)

   }
   public preAddAndUpdatePost(image: FileI): void {
    this.uploadImage(image);
  }

   uploadImage(image: FileI) {
     console.log(image)
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            console.log("imagensita", urlImage)
            document.querySelector('img').src = urlImage; //borrar si no se usa
            //this.savePost(post);
          });
        })
      ).subscribe();
  }




  ngOnInit() {
   }

  onSubmit(formData) {
    console.log('Holi')
    console.log(this.randomId)
    console.log(formData.nombreObjeto)
    this.model.nombreObjeto = formData.nombreObjeto;
    this.model.fechaEncontrado = formData.fechaEncontrado;
    //this.uploadImage(this.image); borrar si no se necesita
    this.model.imagen = this.downloadURL;
    console.log("imagensita2", this.downloadURL);
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
