import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AuthService } from '../auth.service'
import { permisos } from 'src/app/service/admin.service';
import { async } from '@angular/core/testing';
import { Objeto } from '../modelos/Objeto';
import { EditarobjetoComponent } from 'src/app/editarobjeto/editarobjeto.component';

@Component({
  selector: "app-buscarobjeto",
  templateUrl: "./buscarobjeto.component.html",
  styleUrls: ["./buscarobjeto.component.css"],
})
export class BuscarObjetoComponent implements OnInit {
  listaObjetos = [];
  listaCategorias = [];
  filter = { filtros: [], paginacion: {} };
  lastFilter = { filtros: [], paginacion: {} };
  limite = 3;


  public isadministrador: any = null;
  public userUid: string = null;
  public roles = new permisos(this.api)
 

  constructor(public api: ApiServiceService, public authService: AuthService) { }

  ngOnInit() {
    this.filter.paginacion = { limite: this.limite };
    this.authService.isAuth().subscribe(isauth => {
      if (isauth) {
        this.userUid = isauth.uid
        this.getCurrentUser();
      }
    })

    this.api.getCategories().subscribe(
      (response: any) => {
        this.listaCategorias = response;
      },
      (error) => console.error(error)
    );

    this.api.getObjects(this.filter).subscribe(
      (response: any) => {
        this.listaObjetos = response;
      },
      (error) => {
        console.error(error);
        this.listaObjetos = [];
      },
      () => this.filter.paginacion = {}
    );

  }

  async getCurrentUser() {
    this.isadministrador = await this.roles.isAdmin(this.userUid)
  }


  onSubmit(formData) {
    this.filter = { filtros: [], paginacion: {} }
    this.cleanFormData(formData)
    console.log(formData)
    let idObjeto = null;
    this.filter.paginacion = { limite: this.limite };
    //Filtro por categoria
    if (formData.categoriasId) {
      let categoryFilter = { categoriasId: { "==": formData.categoriasId } };
      this.filter.filtros.push(categoryFilter);
    }
    //filtro por estado
    if (formData.estado) {
      let estadoFilter = { estado: { "==": formData.estado } };
      this.filter.filtros.push(estadoFilter);
    }
    //filtro por fecha
    if(formData.fechaInicial && formData.fechaFinal){
      let fechaInicialFilter = { fechaEncontrado: { ">=": formData.fechaInicial } };
      this.filter.filtros.push(fechaInicialFilter);
      let fechaFinalFilter = { fechaEncontrado: { "<=": formData.fechaFinal } };
      this.filter.filtros.push(fechaFinalFilter);
    }
    //filtro por id del objeto
    if (formData.idObjeto) {
      idObjeto = formData.idObjeto
      this.filter = null
    }

    console.log(JSON.stringify(this.filter))
    //llama al provider getObjects
    this.api.getObjects(this.filter,idObjeto).subscribe(
      (response: any) => {
        if(response instanceof Array){
          this.listaObjetos = response;
        }else{
          this.listaObjetos = [response];
        }

      },
      (error) => {
        console.error(error);
        this.listaObjetos = [];
      },
      () => {
        this.lastFilter = this.filter
        if(this.filter){
          this.filter.paginacion = {}
        }
      }
    );
  }

  cleanFormData(formData){
    const tabActual = document.querySelector('[aria-selected="true"]').id;
    if(tabActual === 'nav-categoria-tab'){
      formData.estado = "";
      formData.fechaInicial = "";
      formData.fechaFinal = "";
      formData.idObjeto ="";
    }

    if(tabActual === 'nav-estado-tab'){
      formData.categoriasId = "";
      formData.fechaInicial = "";
      formData.fechaFinal = "";
      formData.idObjeto ="";
    }

    if(tabActual === 'nav-fecha-tab'){
      formData.estado = "";
      formData.categoriasId = "";
      formData.idObjeto ="";
    }

    if(tabActual === 'nav-id-tab'){
      formData.idObjeto = formData.idObjeto.trim()
      formData.categoriasId = "";
      formData.fechaInicial = "";
      formData.fechaFinal = "";
      formData.estado ="";
    }
  }

  //Metodo que retorna una página de objetos
  getNextPage(){
    let ultimoObjeto  = this.listaObjetos[this.listaObjetos.length - 1].id
    this.filter.paginacion = {"ultimoElemento" : ultimoObjeto,  "limite": this.limite}
    this.api.getObjects(this.filter,null).subscribe(
      (response: any) => {
        response.forEach(element => {
          this.listaObjetos.push(element)
        });
        this.filter.paginacion = {}
      },
      (error) => {
        console.error(error);
        this.listaObjetos = [];
      }
    );

  }
}
