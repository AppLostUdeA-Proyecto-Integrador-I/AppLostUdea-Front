import { Component, OnInit } from '@angular/core';
import { Objeto } from '../modelos/Objeto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-editarobjeto',
  templateUrl: './editarobjeto.component.html',
  styleUrls: ['./editarobjeto.component.css']
})

export class EditarobjetoComponent implements OnInit {


  optionValue: string;
  options: any[] = [
    { id: 1, name: 'Elije una opción' },
    { id: 2, name: 'Reportado' },
    { id: 3, name: 'Entregado' },
  ];

  public usuario: any = null;
  public categoria: any = null;
  public isObjeto : Objeto
  params : Subscription

  model: Objeto = {
    nombreObjeto: '',
    fechaEncontrado: '',
    imagen: '',
    lugarEncontrado: '',
    estado: '',
    detalleEntregaId: {
      fechaEntrega: '',
      id: '',
    },
    observaciones: '',
    id: '',
    categoriasId: '',
    lugarDeReclamoId: '',
    usuariosId: '',
  };


  constructor(private route: ActivatedRoute,public api: ApiServiceService,) {
    
   }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.api.getObjects2(id).subscribe(
          (response: any) => {
            this.isObjeto = response;
            this.getUser();
            this.getCategoria();
          },
          (error) => console.error(error)
        );// consulta al api
      }
    });
  }

  async getUser() {
    await ( this.api.getUserById(this.isObjeto.usuariosId)).forEach(
      value =>{ this.usuario = value
  }     
  )}

  async getCategoria() {
    await ( this.api.getCategories2(this.isObjeto.categoriasId)).forEach(
      value1 =>{ this.categoria = value1
  }     
  )}

  onSubmit2(formData) {
    this.model.nombreObjeto = this.isObjeto.nombreObjeto;
    this.model.fechaEncontrado= this.isObjeto.fechaEncontrado;
    this.model.imagen = this.isObjeto.imagen;
    this.model.lugarEncontrado = this.isObjeto.lugarEncontrado;
    this.model.estado ='Entregado';
    this.model.detalleEntregaId.id = formData.quienReclamo;
    this.model.detalleEntregaId.fechaEntrega = formData.fechaEntrega;
    this.model.observaciones = this.isObjeto.observaciones;
    this.model.id= this.isObjeto.id;
    this.model.categoriasId = this.isObjeto.categoriasId;
    this.model.lugarDeReclamoId = this.isObjeto.lugarDeReclamoId;
    this.model.usuariosId = this.usuario.id;
    this.api.replaceObject(this.model).subscribe((response: Objeto) => console.log(response));
    alert('Se ha actualizado el objeto : ' + this.isObjeto.nombreObjeto);
  }  
}
